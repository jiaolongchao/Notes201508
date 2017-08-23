"use strict";

//当页面加载完成后我们在进行图片的延迟加载
window.onload = function () {
    $(".inner img").each(function () {
        var _this = this;
        var trueImg = $(this).attr("trueImg");

        var oImg = new Image;
        oImg.src = trueImg;
        oImg.onload = function () {
            $(_this).prop("src", trueImg).fadeIn(500);
        };
    });
};

(function () {
    var step = 1;//->当前显示的那一张图片的索引
    var autoTimer = null;//->存储我们自动轮播定时器的返回值

    //给inner的宽度设置初始值
    var $inner = $(".inner");
    var $count = $inner.children("div").length;
    $inner.css({
        width: $count * 1000,
        left: -1000
    });

    //实现自动轮播
    //把第一张放末尾一份,每隔3000ms执行一次运动,让$inner的left一直变小...当我们已经到达最后一张(和第一张长得一样),过了3000ms后,在往后走就没有了,此时我们让left立马回到第一张的位置,并且让step=2,这样的话接下来就会运动到第二张的位置了
    function autoMove() {
        step++;
        if (step >= $count) {
            $inner.css("left", -1000);
            step = 2;
        }
        $inner.stop().animate({left: -step * 1000}, 500, "linear");
        changeTip();
    }

    autoTimer = window.setInterval(autoMove, 3000);

    //实现焦点对齐
    var $innerTip = $(".innerTip");
    var $innerTipList = $innerTip.children("li");

    function changeTip() {
        var tempStep = step;
        if (tempStep <= 0) {
            tempStep = $innerTipList.length - 1;
        } else if (tempStep >= ($count - 1)) {
            tempStep = 0;
        } else {
            tempStep--;
        }
        $innerTipList.each(function (index, curLi) {
            curLi.className = index === tempStep ? "select" : null;
        });
    }

    //点击焦点实现切换
    $innerTipList.click(function () {
        window.clearInterval(autoTimer);

        var index = $(this).index();
        step = index + 1;
        $inner.stop().animate({left: -step * 1000}, 500, "linear");
        changeTip();

        autoTimer = window.setInterval(autoMove, 3000);
    });

    //点击左右按钮实现切换
    var $link = $(".outer>a");
    $link.click(function () {
        window.clearInterval(autoTimer);

        if ($(this).hasClass("innerLeft")) {
            //->向左的按钮
            step--;
            if (step < 0) {
                $inner.css("left", -($count - 2) * 1000);
                step = $count - 3;
            }
            $inner.stop().animate({left: -step * 1000}, 500, "linear");
            changeTip();
        } else {
            //->向右的按钮 ->和自动的效果是一样的
            autoMove();
        }

        autoTimer = window.setInterval(autoMove, 3000);
    });
})();