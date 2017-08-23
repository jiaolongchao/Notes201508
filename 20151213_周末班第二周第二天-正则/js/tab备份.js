//1、获取我们当前需求中所需要的所有的元素
//知识点:
//表格table在JS中存在一些自己独有的获取里面元素的属性
//tBodies:获取一个表格中所有的tbody
//tHead:获取一个表格中唯一的一个thead
//tBody.rows:获取tbody下所有的tr
//tHead.rows[0].cells:获取thead下的第一行中的所有的列
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
        //不知道具体是哪一列实现的排序,所以我们需要把汉字和数字的单独处理
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
    //默认都是按照升序排列的
    //第一次点击  当前是乱序 ->升序(asc)
    //第二次点击  当前是升序 ->降序(desc)
    //第三次点击  当前是降序 ->升序
    //在当前点击的这一列上增加一个标识flag来记录当前排序的状态
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
//oThs[2].onclick = function () {
//    //this->oThs[2]
//    //sortList();//sortList中的this->window
//    sortList.call(this);//这里的this是匿名函数中的this,代表的是oThs[2],我们执行sortList,让sortList中的this和匿名函数中的this保持一致->sortList中的this此时也变成了oThs[2]
//};

for (var i = 0; i < oThs.length; i++) {
    var oTh = oThs[i];
    if (oTh.className === "cursor") {
        oTh.index = i;
        oTh.onclick = function () {
            //this->当前点击的那一列 ->给元素的click绑定一个方法,当点击的时候方法执行,方法中的this是当前点击的那一个元素
            var a = this;//->a存储的是当前点击的那一列
            var n = this.index;//->n存储的是当前点击的那一列的索引
            sortList.call(a, n);//->执行sortList方法让方法中的this变为a,并且给方法传递一个形参值n

            //sortList.call(this,this.index);
        };
    }
}