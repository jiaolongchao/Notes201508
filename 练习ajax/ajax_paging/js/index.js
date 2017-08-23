var conList = document.getElementById("conList");
var page = document.getElementById("page");
var hp = document.getElementById("hp");
var prev = document.getElementById("prev");
var next = document.getElementById("next");
var pageList = document.getElementById("pageList");
var ep = document.getElementById("ep");
var search = document.getElementById("search");
var btn = document.getElementById("btn");

var total = 0, totalPage = 0, eachPN = 10, curPage = 1;
var bindData = function (page, data) {
    var startPage = (curPage - 1) * eachPN, endPage = curPage * eachPN - 1;
    var str = "";
    for (var i = startPage; i <= endPage; i++) {
        var cur = data[i];
        if (!cur) continue;
        var c = i % 2 === 1 ? "even" : null;
        str += "<li class='" + c + "' num=" + cur["num"] + ">";
        for (var key in cur) {
            if (!cur.hasOwnProperty(key)) continue;
            var val = key === "sex" ? (cur[key] === 1 ? "男" : "女") : cur[key];
            str += "<span>" + val + "</span>"
        }
        str += "</li>";
    }
    conList.innerHTML = str;

    var oLis = conList.getElementsByTagName("li");
    for (var k = 0; k < oLis.length; k++) {
        oLis[k].onclick = function () {
            window.location.href = "detail.html?num=" + this.getAttribute("num");
        }
    }
};

var bindPage = function () {
    var str = "";
    for (var i = 1; i <= totalPage; i++) {
        var c = curPage === i ? "select" : null;
        str += "<li class='" + c + "'>" + i + "</li>"
    }
    pageList.innerHTML = str;
};

var changeBG = function () {
    var oLis = pageList.getElementsByTagName("li");
    for (var i = 0; i < oLis.length; i++) {
        var li = oLis[i];
        li.className = (curPage - 1) === i ? "select" : null;
    }
};

tools.ajax("data.txt", function (data) {
        total = data.length;
        totalPage = Math.ceil(total / eachPN);
        bindData(curPage, data);
        bindPage();

        page.onclick = function (e) {
            e = e || window.event;
            var tar = e.target || e.srcElement;
            if (tar.id == "hp") {
                curPage = 1;
            }
            if (tar.id == "prev") {
                if (curPage === 1) {
                    return;
                }
                curPage--;
            }
            if (tar.id == "next") {
                if (curPage == totalPage) {
                    return;
                }
                curPage++;
            }
            if (tar.id == "ep") {
                curPage = totalPage;
            }
            if (tar.tagName.toLowerCase() == "li") {
                curPage = Number(tar.innerHTML);
            }
            bindData(curPage, data);
            changeBG();
        };

        btn.onclick = search.onkeyup = function (e) {
            e = e || window.event;
            var tar = e.target || e.srcElement;
            if ((e.keyCode == 13) || (tar.id == "btn")) {
                var val = search.value;
                if (!Number(val) && curPage != 1) {
                    var res = confirm("您输入的页码不正确，请问是否跳转到 首页");
                    if (res) {
                        curPage = 1;
                    }
                } else if (val > totalPage) {
                    res = confirm("您输入的页码已经超过最大值，请问是否跳转到 尾页");
                    if (res) {
                        curPage = totalPage;
                    }
                }

                search.value = "";
                search.focus();
            }
        }

    }
);