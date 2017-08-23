/**
 * Created by Administrator on 2016/1/19.
 */

var list = document.getElementById("list");
var page = document.getElementById("page");
var pageList = document.getElementById("pageList")
//一，首先通过Ajax把我们的数据获得到
var total = 0;//总条数
var totalPage = 0;//总页
var pageNum = 10, curPage = 1;
list.style.height = pageNum *30 + "px";
utils.ajax("data.txt", function (data) {
    total = data.length;
    totalPage = Math.ceil(total / pageNum);
    bindPage();
    bindData(curPage, data);

    //利用事件委托实现我们的分页切换
    page.onclick = function (e) {
        e = e || window.event;
        var tar = e.target || e.srcElement;
        if (tar.tagName.toLocaleLowerCase() == "li") {
            //说明我点击的分页在页码
            var page = Number(tar.innerHTML);
            curPage = page;
            changeBg();
        } else if (tar.id === "first") {
            curPage = 1;
        } else if (tar.id === "last") {
            curPage = totalPage;
        } else if (tar.id === "prev") {
            if (curPage === 1)return;
            curPage--;
        } else if (tar.id === "next") {
            if (curPage === totalPage)return;
            curPage++;
        } else if (tar.id === "search") {
            return
        }
        bindData(curPage, data);
    }
    //六 给我们文本框绑定keyup事件，如果按下的是enter。。。
    var search = document.getElementById("search");
    search.onkeyup = function (e) {
        e = e || window.eventt;
        if (e.keyCode === 13) {
            var val = this.value.replace(/(^ +)|( +$)/g, "");
            if (val) {
                if (/^(\d|([1-9]\d+))$/.test(val)) {
                    if (val >= 1 && val <= totalPage) {
                        this.value = totalPage;
                        val = totalPage;
                    } else {
                        this.value = totalPage;
                    }
                    curPage = val;
                    bindData(val, data)
                } else {
                    this.value = '';
                    this.focus();
                }
            }
            changeBg();
        }
    }
})
//动态绑定我们分页的页码
function bindPage() {
    var str = '';
    for (var i = 1; i <= totalPage; i++) {
        var c = i === curPage ? "select" : null;
        str += "<li class='" + c + "'>" + i + "</li>"
    }
    pageList.innerHTML = str;



}
//三实现我们订内容的绑定
//如果我当前绑定的第一页的内容，那索引就是0-9
//0-9
//10-19
//20-29  开始索引和结束索引的规律
//起始值(n-1)*pageName ~ n*pageNum - 1;
function bindData(page, data) {
    var sIndex = (page - 1) * pageNum, enIndex = page * pageNum - 1;
    var str = "";
    for (var i = sIndex; i < enIndex; i++) {
        var cur = data[i];
        if (cur) {
            var c = i % 2 === 1 ? "even" : null;
            str += "<li class='" + c + "' num='" + cur["num"] + "'>";

            for (var key in cur) {
                var val = key === "sex" ? (cur[key] === 1 ? "男" : "女") : cur[key];
                str += "<span>" + val + "</span>"
            }
            str += "</li>";
        }

    }
    list.innerHTML = str;


    var oLis = list.getElementsByTagName("li");
    for(var k=0;k< oLis.length;k++){
        oLis[k].onclick = function(){
            /**
             * window.location.href = xxx跳转到指定的页面在本窗口打开
             * var url = window.location.href; 获取本页面的url地址
             * window.open('地址')  跳转到指定的页面，在新窗口中打开
             * @type {string}
             */
            window.location.href = "detail.html?num="+ this.getAttribute("num");
        }
    }
}

//实现分页选中样式切换
function changeBg() {
    var oLis = pageList.getElementsByTagName("li")
    for (var i = 0; i < oLis.length; i++) {
        oLis[i].className = i === (curPage - 1) ? "select" : null;
    }
}



/*
var str2 = '2222333445566777222';
var reg = /\d+/
var str3 = str2.replace(reg,"$1")*/
