//知识点:->关于表格table中自带的一写获取的属性
//tBodies:获取当前表格下所有的tbody,获取的是一个元素集合
//rows:获取所有的行(TR)
//cells:获取每一行中所有的列(TD/TH)
var oTab = document.getElementById("tab");
var tBody = oTab.tBodies[0];
var tHead = oTab.tHead;
var oThs = tHead.rows[0].cells;
var oRows = tBody.rows;

//1、数据绑定->把json.js中的data里面的内容绑定到tBody中
function bindData() {
    var frg = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
        var cur = data[i];
        //初始化我们的数据->对于没有的数据我们赋值默认值
        cur.name = cur.name || "--";
        cur.age = cur.age || "25";
        cur.score = cur.score || "0";
        cur.sex = cur.sex == 0 ? "男" : "女";

        //每一次循环数组都创建一个tr
        var oTr = document.createElement("tr");
        //每一次创建一个tr，都往里面添加4个td
        for (var key in cur) {
            var oTd = document.createElement("td");
            oTd.innerHTML = cur[key];
            oTr.appendChild(oTd);
        }
        frg.appendChild(oTr);
    }
    tBody.appendChild(frg);
    frg = null;
}
bindData();

//2、隔行变色
function changeBg() {
    for (var i = 0; i < oRows.length; i++) {
        oRows[i].className = i % 2 === 1 ? "even" : null;
    }
}
changeBg();

//3、实现表格排序
function sortList(index) {
    //a、将类数组转换为数组
    var ary = utils.listToArray(oRows);

    //b、给数组进行排序(默认都是从小到大)
    ary.sort(function (a, b) {
        //获取到当前行和下一行第三列的内容,按照内容的大小进行排序
        var curIn = a.cells[index].innerHTML;
        var nexIn = b.cells[index].innerHTML;
        //对于数字我们直接的相减,对于非数字,我们用localeCompare
            var curInNum = parseFloat(curIn);
            var nexInNum = parseFloat(nexIn);
            if (isNaN(curInNum)) {
            return curIn.localeCompare(nexIn);
        }
        return curInNum - nexInNum;
    });

    //e、实现升降序切换
    //添加一个标识flag,记录当前列的排列顺序
    //第一次点击 前-乱序 ->升序(asc)
    //第二次点击 前-升序 ->降序(desc)
    //第三次点击 前-降序 ->升序
    if (this.flag === "asc") {
        ary.reverse();
        this.flag = "desc";
    } else {
        this.flag = "asc";
    }

    //c、按照最新排列的顺序把我们的tr重新的添加到页面中
    var frg = document.createDocumentFragment();
    for (var i = 0; i < ary.length; i++) {
        frg.appendChild(ary[i]);
    }
    tBody.appendChild(frg);
    frg = null;

    //d、由于现在的顺序已经发生改变,我们需要重新的计算一次隔行变色
    changeBg();
}

//4、给指定的列绑定单击事件,点击的时候实现我们的排序
//oThs[2].onclick = function () {
//    //this->oThs[2]
//    //sortList();//sortList中的this->window
//    sortList.call(this);//sortList中的this->oThs[2]
//};
for (var i = 0; i < oThs.length; i++) {
    var oTh = oThs[i];
    if (oTh.className === "cursor") {
        oTh.index = i;
        oTh.onclick = function () {
            sortList.call(this, this.index);
        }
    }
}