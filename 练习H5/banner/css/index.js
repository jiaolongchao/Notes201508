/**
 * Created by Administrator on 2016/1/31.
 */
;(function(){
   var dataAry = ["img/banner1.jpg","img/banner2.jpg","img/banner3.jpg"];
    var count = dataAry.length, step = 1;
    var inner = document.getElementById("inner"),imgList = inner.getElementsByTagName("img");
    var tip = document.getElementById("tip"),tipList = tip.getElementsByTagName("span");
    var winW = document.querySelector(".banner").clientWidth;

    //1.实现数据绑定
    ~function(){
        var str = strTip = "";
        str += "<img src='' trueImg = '"+ dataAry[count-1] +"' />";
        for(var i=0;i<count;i++){
            str += "<img src='' trueImg = '"+ dataAry[i] +"' />";
            strTip +="<span></span>"
        }
        str += "<img src='' trueImg = '"+ dataAry[0] +"' />";
        inner.innerHTML = str;
        tip.innerHTML = strTip;

        //需要给inner及里面的图片动态的绑定一些基本的样式
        inner.style.width = winW * (count + 2) + "px";
        inner.style.left = -winW + "px";
        [].forEach.call(imgList,function(curImg,index){
            curImg.style.width = winW + "px";
        })

        selectTip()

    }();

    //实现图片的延迟加载
    window.setTimeout(lazyImg,500);
    function lazyImg(){
        [].forEach.call(imgList,function(curImg,index){
            var oImg = new Image;
            oImg.src = curImg.getAttribute("trueImg");
            oImg.onload = function(){
                curImg.src = this.src;
                //curImg.style.opacity = 1;
                curImg.className = "opacityMove";
            }
        })
    }

    //实现焦点选中
    function selectTip(){
        var temp = step;
        temp > count ? temp = 1 : null;
        temp < 1 ? temp = count : null;
        [].forEach.call(tipList,function(curTip,index){
            curTip.className = (temp - 1) === index ? "select" : null;
        })
    }


    //实现自动轮播
    var autoTimer = null,autoInterval = 2000;
    autoTimer = window.setInterval(autoMove,autoInterval);
    function autoMove(){
        inner.style.webkitTransitionDuration = "0.5s";
        step++;
        inner.style.left = -winW + "px";
        selectTip();
        if(step > count){
            window.setTimeout(function(){
                inner.style.webkitTransitionDuration = "0s";
                inner.style.left = -winW + "px";
                step = 1;
            },500)
        }


    }
    /*
    按照js传统的轮播图实现的方式，我们发现一个问题，我们让运动的时间设置为0s后，又立马设置为0.5s ,浏器还没有反应过来，所以我们会出现到最后一张了，从后到前的运动到第二张
    function autoMove(){
        step++;
       if( step > count + 1){
           inner.style.webkitTransitionDuration = "0s";
           inner.style.left = -winW + "px";
           step = 2;
       }
        inner.style.webkitTransitionDuration = "0.5s";
        inner.style.left = -step * winW + "px";
    }*/

})()