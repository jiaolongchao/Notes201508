/**
 * Created by Administrator on 2015/12/25.
 */
var DOM = {};
DOM.getIndex = function(ele){
    var p = ele.previousSibling;
    var n = 0;
    while(p){
        if(ele == p){return}
        if(p && p.nodeType == 1){
            n++;
        }
        p = p.previousSibling;
    }
    return n;
}
DOM.getClass = function(str){
    str = str.replace(/^ +| +$/g,"");
    var aClass = str.split(/ +/);
    var eles = document.body.getElementsByTagName('*');
    for(var i = 0;i<aClass.length;i++){
        var reg = new RegExp("(^ |)" + aClass[i] + "( |$)");
        var ary = [];
        for(var j=0;j<eles.length;j++){
            var ele = eles.item(j);
            if(reg.test(ele.className)){
                ary.push(ele)
            }
        }
        eles = ary;
    }
    return eles;
}

DOM.addClass = function(ele,aclass){
    var reg = new RegExp("(^ |)" + aclass + "( +|$)");
    if(!reg.test(ele.className)){
        ele.className += " " + aclass;
    }
}
DOM.removeClass = function(ele,aclass){
    var  reg = RegExp("(^| )"+aclass+"( |$)","g");
    ele.className=ele.className.replace(reg," ");//后边不是空，是空格
}

DOM.opreviousSibling = function(ele){ //获取上一个哥哥元素
    var p = ele.previousSibling;
    while(p){
        if(p & p.nodeType === 1){
            return p;
        }
        p = p.previousSibling;
    }
    return null;
}
DOM.onextSibling = function(ele){
    var p = ele.nextSibling;
    while(p){
        if(p && p.nodeType === 1){
            return p;
        }
        p = p.nextSibling;
    }
    return null;
}

DOM.osiblings = function(ele){
    var a=[];
    var p=ele.previousSibling;
    while(p){
        if(p.nodeType==1){
            a.push(p);
        }
        p=p.previousSibling;
    }
    a.reverse();
    var n=ele.nextSibling;
    while(n){
        if(n.nodeType===1){
            a.push(n);
        }
        n=n.nextSibling;
    }
    return a;
}
DOM.prev = function(ele){
    var childs = ele.parentNode.children;
    var ary = [];
    for(var i =0;i<childs.length;i++){
        var child = childs[i]
        if(ele == child){ return}
        if(ele.nodeType === 1){
            ary.push(child)
        }
    }
    return ary;
}
DOM.next = function(ele){
    var childs = ele.parentNode.children;
    var ary = [];
    for(var i = childs.length-1; i>=0;i--){
        var child = childs[i]
        if(ele == child){ return}
        if(ele.nodeType === 1){
            ary.unshift(child)
        }
    }
    return ary;
}


DOM.children=function(ele){//获得ele的所有的元素子节点
    var children=ele.children;

    if(typeof ele.nextElementSibling !="object"){
        var a=[];
        for(var i=0;i<children.length;i++){
            if(children[i].nodeType===1){
                a.push(children[i]);
            }
        }
    }
    return children;
}