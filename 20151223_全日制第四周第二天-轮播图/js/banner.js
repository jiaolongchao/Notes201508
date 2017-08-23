var dataAry = ["img/banner1.jpg", "img/banner2.jpg", "img/banner3.jpg", "img/banner4.jpg"];

var outer = document.getElementById("outer");
var inner = document.getElementById("inner");
var tip = document.getElementById("tip");
var imgList = inner.getElementsByTagName("div");
var tipList = tip.getElementsByTagName("li");

var step = 0;//->记录当前显示的是哪一张图片
var autoTimer = null;//->存储当前自动轮播定时器的值


//1、数据绑定
function bindData() {
    //绑定图片的数据
    var str = "";
    for (var i = 0; i < dataAry.length; i++) {
        str += "<div trueImg='" + dataAry[i] + "'></div>";
    }
    str += "<div trueImg='" + dataAry[0] + "'></div>";
    inner.innerHTML = str;

    //绑定焦点的数据
    str = "";
    for (i = 0; i < dataAry.length; i++) {
        var cName = i === 0 ? "select" : null;
        str += "<li class='" + cName + "'></li>";
    }
    tip.innerHTML = str;

    //把默认的宽度都要进行修改
    inner.style.width = (dataAry.length + 1) * 1000 + "px";
    tip.style.width = dataAry.length * 25 + "px";
}
bindData();

//2、图片延迟加载
function delayImg() {
    for (var i = 0; i < imgList.length; i++) {
        ~function (i) {
            var curImg = imgList[i];
            var oImg = new Image;
            oImg.src = curImg.getAttribute("trueImg");
            oImg.onload = function () {
                curImg.appendChild(oImg);
                animate(oImg, {opacity: 1}, 500, 1);
            };
        }(i);
    }
}
window.setTimeout(delayImg, 500);

//3、实现自动轮播
function autoMove() {
    step++;
    if (step > 4) {
        inner.style.left = 0 + "px";
        step = 1;
    }
    animate(inner, {left: -step * 1000}, 500);
    changeTip();
}
autoTimer = window.setInterval(autoMove, 3000);

//4、实现我们的tip跟着选中改变
function changeTip() {
    var tempStep = step >= tipList.length ? 0 : step;
    for (var i = 0; i < tipList.length; i++) {
        tipList[i].className = i === tempStep ? "select" : null;
    }
}

//5、实现点击tip切换图片
for (var i = 0; i < tipList.length; i++) {
    tipList[i].index = i;
    tipList[i].onclick = function () {
        window.clearInterval(autoTimer);//->首先把自动的清除掉
        animate(inner, {left: -this.index * 1000}, 500);//->让其运动到指定的位置
        step = this.index;//->让step和当前点击的这个一li保持同步
        autoTimer = window.setInterval(autoMove, 3000);//->切换完成后在恢复我们的自动轮播
        changeTip();//->tip跟着选中改变
    };
}