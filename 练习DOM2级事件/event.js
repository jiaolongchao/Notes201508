/**
 * Created by Administrator on 2016/1/2.
 */
function bind(ele,type,fn){
    if(ele.addEventListener){
        ele.addEventListener(type,fn,false)
    }else{
        var fnTemp = function(){fn.call(ele)}
        if(!ele["aEvent" + type]){
            ele["aEvent" + type] = [];
        }
        var a = ele["aEvent" + type];
        for(var i =0;i< a.length;i++){
            if(a[i].photo == fn) return;//避免数组里有重复的事件绑定
        }
        ele.attachEvent("on"+type,fnTemp);
        ele["aEvent" + type].push(fnTemp);
        fnTemp.photo = fn; //就是在这个经过包装的方法上加一个自定义属性photo, 让它指向真正绑定的fn方法
    }
}
function unbind(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false);
    }else{
        //在这个数组里，没法识别出那个访求是fn改装之后的
        var a = ele["aEvent" + type]
        if(a){
            for(var i = 0; i<a.length;i++){
                if(a[i].photo == fn){
                    ele.detachEvent("on"+type,a[i]);
                    return;
                }
            }
        }
    }
}

function on(ele,type,fn){
    if(!ele["onEvent" + type]){
        ele["onEvent" + type] = [];
    }
    var a = ele["onEvent" + type];
    a.push(fn);
    bind(ele,type,run) //使on和真正事件联系在一起
}

function run(e){ //中间环节，用来联系事件和被驱动的方法
    e = e || window.event;
    if(!e.target){
        e.target = e.srcElement; //如果不支持我们就给他假冒一个
        e.stopPropagation = function(){e.cancelBubble = true}
        e.preventDefault = function(){e.returnValue = false}
        e.pageX = (document.documentElement.scrollLeft || document.body.scrollLeft ) + e.clientX;
        e.pageY = (document.documentElement.scrollTop || document.body.scrollTop ) + e.clientY;
    }
    var type = e.type; //当事件触发的时候，事件对象e的type属性就表示当前的事件类型
    var a = this["onEvent" + type];
    for(var i=0; i< a.length;i++){
        if(typeof a[i] == "function"){
            a[i].call(this,e);
        }else{
            a.splice(i,1);
            i--;
        }
    }
}

function off(ele,type,fn){
    var a = ele["onEvent" + type]
    if(a){
        for(var i=0;i< a.length;i++){
            if(a[i] == fn){
                //ele.attachEvent("on" + type,fn)
                a[i] = null;
                break;
            }
        }
    }
}

function processThis(obj,fn){
    return function(e){fn.call(obj,e)}
}