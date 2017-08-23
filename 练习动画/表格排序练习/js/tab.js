//获取需要的元素
var oTab = document.getElementById('tab');
var oHead = oTab.tHead;
var oBody = oTab.tBodies[0];
var oRows = oBody.rows;
var oThs = oHead.rows[0].cells;

//获取数据
function bindData(){
    var frg = document.createDocumentFragment();
    for(var i = 0;i<data.length; i++){
        var cur = data[i];
        cur.name = cur.name || '--';
        cur.sex = cur.sex === 0 ? "男" : "女";
        var otr = document.createElement('tr');
        for(var key in cur){
            var otd = document.createElement('td');
            otd.innerHTML = cur[key];
            otr.appendChild(otd);
        }
        frg.appendChild(otr);
    }
    oBody.appendChild(frg);
    frg = null;
}
bindData();

//rows排序
function sortList(n){
    //将类数组转化为数组 排序
    var curary = utils.listtoArray(oRows);
    curary.sort(function (a, b) {
        var curInd = a.cells[n].innerHTML;
        var nexInd = b.cells[n].innerHTML;
        var curing = parseFloat(curInd);
        var nexing = parseFloat(nexInd);
        if(isNaN(curing)){
            return curInd.localeCompare(nexInd)
        }else{
            return curInd - nexInd;
        }
    })
    //增加升序降序开关
    if(this.flag == 'asc'){
        curary.reverse();
        this.flag = 'desc';
    }else{
        this.flag = 'asc';
    }

    var frg = document.createDocumentFragment();
    for(var i = 0; i< curary.length;i++){
        frg.appendChild(curary[i])
    }
    oBody.appendChild(frg);
    frg = null;



    //重新执行一次隔行变色
    changeBg();
}

//隔行变色
function changeBg(){
    for(var i = 0; i< oRows.length;i++){
        oRows[i].className = i%2 == 1? 'even' : 'null';
    }
}
changeBg()

//绑定点击事件
for(var i = 0; i< oThs.length;i++){
    var cur = oThs[i];
    if(cur.className == 'cursor'){
        cur.index = i;
        cur.onclick = function(){
            sortList.call(this,this.index);
        }
    }
}