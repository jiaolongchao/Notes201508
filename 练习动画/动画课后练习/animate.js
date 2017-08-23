/**
 * Created by Administrator on 2015/12/26.
 */
function getCss(ele,attr){
    if(window.getComputedStyle){
        return parseFloat(getComputedStyle(ele,null)[attr])
    }else{
        if(attr == 'oppacity'){
            var str = ele.currentStyle.filter;
            var reg = /alpha\(opacity=(d+)\)/
            if(reg.test(str)){
                return RegExp.$1/100;
            }else{
                return 1;
            }
        }
        return parseFloat(ele.currentStyle[attr]);
    }
}
function setCss(ele,attr,value){
    if(attr == "opacity"){
        ele.style.opacity = value;
        ele.style.filter = "alpha(opacity="+ value*100  +")"
    }else{
        ele.style[attr] = value + "px";
    }
}
function animate(ele,oTarget,durction,callback){
    var oBegin = {};
    var oChange = {};
    for(var attr in oTarget){
        var begin = getCss(ele,attr);
        var change = oTarget[attr] - begin;
        var count = 0;
        if(change){ //判断目标值与起点值是否一样
            oBegin[attr] = begin;
            oChange[attr] = change;
            count ++;
        }
    }
    if(count === 0){return}

    var times = 0;
    var interval = 15;
    window.clearInterval(this.timers)
    function step(){
        times+= interval;
        if(times < durction){
            for(var attr in oBegin){
                var change = oChange[attr];
                var begin = oBegin[attr];
                var val = times/durction * change + begin;
                setCss(ele,attr,val)
            }
        }else{
            for(var attr in oTarget){
                setCss(ele,attr,oTarget[attr])
            }
            window.clearInterval(this.timers)
            if(typeof callback == 'function'){
                callback.call(ele)
            }
        }

    }
    this.timer = window.setInterval(step,interval)

}