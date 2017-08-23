/**
 * Created by Administrator on 2016/1/22.
 */
//一、首先通过Ajax把我们的数据获取到
var pageList = document.getElementById("pageList");
var list = document.getElementById("list");
var page = document.getElementById("page");
var search = document.getElementById("search");
var total = 0, totalPage = 0, pageNum = 10;
curPage = 1;

utils.ajax("data.txt", function (data) {
    total = data.length;
    totalPage = Math.ceil(total / pageNum);
    bindData(curPage, data);
    bindPage();

    //利用事件委托给页码加点击事件
    page.onclick = function(e){
        e = e || window.event;
        var tar = e.target || e.srcElement;
        if(tar.tagName.toUpperCase() == "LI"){
            var page = Number(tar.innerHTML);
            curPage = page;
        }else if(tar.id === "first"){
            curPage = 1;
        }else if(tar.id === "last"){
            curPage = totalPage;
        }else if(tar.id == "prev"){
            if(curPage === 1){
                return;
            }
            curPage--;
        }else if(tar.id == "next"){
            if(curPage == totalPage){
                return;
            }
            curPage++;
        }else if (tar.id === "search") {
            return;
        }

        bindData(curPage,data);
        bindPage();
    };

    //搜索框的点击事件
    search.onkeyup = function(e){
        e = e || window.event;
        if(e.keyCode === 13){
            var val = this.value.replace(/(^ +| +$)/g, "");
            if (/^(\d|([1-9]\d+))$/.test(val)){
                if(val < 1 && val > totalPage){
                    this.value = totalPage;
                    val = totalPage;
                }else{
                    this.value = "";
                    this.focus();
                }
            }
        }
    }

})

//绑定分页数据
function bindData(page, data) {
    var sIndex = (page - 1) * pageNum, eIndex = page * pageNum - 1;
    var str = '';
    for (var i = sIndex; i < eIndex; i++) {
        var cur = data[i];
        if (cur) {
            var c = i % 2 === 1 ? "even" : null;
            str += "<li class='" + c + "' num='" + cur["num"] + "'>";
            for (var key in cur) {
                var val = key == "sex" ? (cur[key] === 1 ? "男" : "女") : cur[key];
                str +="<span>"+ val +"</span>"
            }
            str+="</li>"
        }
    }
    list.innerHTML = str;

    //给每一个li添加点击事件
    var olis = list.getElementsByTagName("li");
    for(var i=0;i<olis.length;i++){
        olis[i].onclick = function(){
            window.location.href = "detail.html?num=" + this.getAttribute("num");
        }
    }

}

//动态绑定分页页码
function bindPage() {
    var str = "";
    for (var i = 1; i <= totalPage; i++) {
        var c = i === curPage ? "select" : null;
        str += "<li class='" + c + "'>" + i + "</li>";
    }
    pageList.innerHTML = str;
}
//实现分页中的样式切换
function changeBg() {
    var oLis = pageList.getElementsByTagName("li");
    for (var i = 0; i < oLis.length; i++) {
        oLis[i].className = i === (curPage - 1) ? "select" : null;
    }
}