//1、获取我们当前需求中所需要的所有的元素
var oTab = document.getElementById("tab");
var tHead = oTab.tHead;
var tBody = oTab.tBodies[0];
var oRows = tBody.rows;
var oThs = tHead.rows[0].cells;

//2、数据绑定
function bindData() {
    var frg = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
        var cur = data[i];
        //数据分析->对于不正常的数据赋值默认值,对于一些内容进行特殊的处理
        cur.name = cur.name || "--";
        cur.age = cur.age || 25;
        cur.score = cur.score || 60;
        cur.sex = cur.sex === 0 ? "男" : "女";

        //每一次循环创建一个TR
        var oTr = document.createElement("tr");
        for (var key in cur) {
            //每一个TR中都创建四个TD
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

//3、实现奇偶行变色
function changeBg() {
    for (var i = 0; i < oRows.length; i++) {
        oRows[i].className = i % 2 === 1 ? "even" : null;
    }
}
changeBg();

//4、实现表格排序
function sortList(n) {
    //n:当前点击那一列的索引

    //A、把tbody下的所有行的类数组转换为数组
    var rowsAry = utils.listToArray(oRows);

    //B、给rowsAry进行排序
    rowsAry.sort(function (a, b) {
        var curIn = a.cells[n].innerHTML;
        var nexIn = b.cells[n].innerHTML;
        var curInNum = parseFloat(curIn);
        var nexInNum = parseFloat(nexIn);
        if (isNaN(curInNum)) {
            return curIn.localeCompare(nexIn);
        }
        return curInNum - nexInNum;
    });

    //E、实现升降序的切换
    //如果是多列都实现切换,我们发现第一次点击分数,我们分数升序排列,我点击年龄,然后在重新的点击分数,发现分数不是按照升序而是按照降序->因为之前存储在每一列的上的flag标识并没有清空
    //在点击的时候,我们把除了当前列以外的其它的列的flag都设置为null,这样就完成了初始赋值的操作
    for (var k = 0; k < oThs.length; k++) {
        if (k !== n) {
            oThs[k].flag = null;
        }
    }
    if (this.flag === "asc") {
        rowsAry.reverse();
        this.flag = "desc";
    } else {
        this.flag = "asc";
    }

    //C、按照最新的顺序把每一行重新的添加到页面中
    var frg = document.createDocumentFragment();
    for (var i = 0; i < rowsAry.length; i++) {
        frg.appendChild(rowsAry[i]);
    }
    tBody.appendChild(frg);
    frg = null;

    //D、现有的顺序已经发生改变,我们重新的计算隔行变色
    changeBg();
}

//5、给对应的列绑定点是事件,点击的实现排序
for (var i = 0; i < oThs.length; i++) {
    var oTh = oThs[i];
    if (oTh.className === "cursor") {
        oTh.index = i;
        oTh.onclick = function () {
            sortList.call(this, this.index);
        };
    }
}