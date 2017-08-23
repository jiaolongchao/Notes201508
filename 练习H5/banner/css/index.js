/**
 * Created by Administrator on 2016/1/31.
 */
;(function(){
   var dataAry = ["img/banner1.jpg","img/banner2.jpg","img/banner3.jpg"];
    var count = dataAry.length, step = 1;
    var inner = document.getElementById("inner"),imgList = inner.getElementsByTagName("img");
    var tip = document.getElementById("tip"),tipList = tip.getElementsByTagName("span");
    var winW = document.querySelector(".banner").clientWidth;

    //1.ʵ�����ݰ�
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

        //��Ҫ��inner�������ͼƬ��̬�İ�һЩ��������ʽ
        inner.style.width = winW * (count + 2) + "px";
        inner.style.left = -winW + "px";
        [].forEach.call(imgList,function(curImg,index){
            curImg.style.width = winW + "px";
        })

        selectTip()

    }();

    //ʵ��ͼƬ���ӳټ���
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

    //ʵ�ֽ���ѡ��
    function selectTip(){
        var temp = step;
        temp > count ? temp = 1 : null;
        temp < 1 ? temp = count : null;
        [].forEach.call(tipList,function(curTip,index){
            curTip.className = (temp - 1) === index ? "select" : null;
        })
    }


    //ʵ���Զ��ֲ�
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
    ����js��ͳ���ֲ�ͼʵ�ֵķ�ʽ�����Ƿ���һ�����⣬�������˶���ʱ������Ϊ0s������������Ϊ0.5s ,�����û�з�Ӧ�������������ǻ���ֵ����һ���ˣ��Ӻ�ǰ���˶����ڶ���
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