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
            if(a[i].photo == fn) return;//�������������ظ����¼���
        }
        ele.attachEvent("on"+type,fnTemp);
        ele["aEvent" + type].push(fnTemp);
        fnTemp.photo = fn; //���������������װ�ķ����ϼ�һ���Զ�������photo, ����ָ�������󶨵�fn����
    }
}
function unbind(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false);
    }else{
        //����������û��ʶ����Ǹ�������fn��װ֮���
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
    bind(ele,type,run) //ʹon�������¼���ϵ��һ��
}

function run(e){ //�м价�ڣ�������ϵ�¼��ͱ������ķ���
    e = e || window.event;
    if(!e.target){
        e.target = e.srcElement; //�����֧�����Ǿ͸�����ðһ��
        e.stopPropagation = function(){e.cancelBubble = true}
        e.preventDefault = function(){e.returnValue = false}
        e.pageX = (document.documentElement.scrollLeft || document.body.scrollLeft ) + e.clientX;
        e.pageY = (document.documentElement.scrollTop || document.body.scrollTop ) + e.clientY;
    }
    var type = e.type; //���¼�������ʱ���¼�����e��type���Ծͱ�ʾ��ǰ���¼�����
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