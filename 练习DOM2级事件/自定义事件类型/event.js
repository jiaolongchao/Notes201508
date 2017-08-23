
/**
 * Created by Administrator on 2016/1/9.
 */
function on(ele,type,fn){
    if(/^self/.test(type)){
        if(!ele["self"+type]){
            ele["self"+type] = [];
        }
        for(var i=0;i<ele["self" + type].length;i++){
            if(ele["self" + type]== fn){
                return;
            }
        }
        ele["self"+type].push(fn)
        return;
    }

    if(ele.addEventListener){
        ele.addEventListener(type,fn,false)
        return;
    }
    if(!ele["onEvent"+type]){
        ele["onEvent"+type] = [];
        ele.attachEvent("on"+type,function(){run.call(ele)})
    }
    var a = ele["onEvent"+type];
    for(var i=0;i< a.length;i++){
        if(a[i] == fn)return
    }
    a.push(fn)
}
function run(e){
    e = window.event;
    if(!e.target){
        e.target = e.srcElement;
        e.pageX = (document.documentElement.scrollLeft || document.body.scrollLeft ) + e.clientX;
        e.pageY = (document.documentElement.scrollTop || document.body.scrollTop ) + e.clientY;
        e.stopPropagation = function(){e.cancelBubble = true}
        e.preventDefault = function(){e.returnValue = false}
    }
    var type = e.type;
    var a = this["onEvent"+type];
    for(var i=0;i< a.length;i++){
        if(typeof a[i] == "function"){
            a[i].call(this,e)
        }else{
            a.splice(i,1);
            break;
        }
    }
}
function off(ele,type,fn){
    if(/^self/.test(type)){
        var a = ele["self" + type];
        if(a){
            for(var i=0;i< a.length;i++){
                if(a[i] == fn){
                    a[i] = null;
                    break;
                }
            }
        }
        return;
    }
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false)
        return;
    }
    var a = ele["onEvent"+type];
    for(var i=0;i< a.length;i++){
        if(a[i] == fn){
            a[i] = null;
            break;
        }
    }
}
