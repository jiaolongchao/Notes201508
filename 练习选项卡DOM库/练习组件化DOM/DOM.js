/**
 * Created by Administrator on 2015/12/20.
 */
var DOM = {};
DOM.getIndex = function(ele){
    var index = 0;
    var p = ele.previousSibling;
    while(p){
        if(p.nodeType === 1){
            index ++;
        }
        p = p.previousSibling;
    }
    return index;
}

DOM.siblings = function (ele){ //获得ele所有的元素兄弟节点
    var nodes = ele.parentNode.childNodes;
    var a = [];
    for(var i=0;i<nodes.length;i++){
        var node = nodes[i];
        if(node != ele && node.nodeType == 1){
            a.push(node);
        }
    }
    return a;
}

DOM.siblings2 = function (ele){
    var a = [];
    var p = ele.previousSibling;
    while(p){
        if(p.nodeType == 1){
            a.unshift(p);
        }
        p = p.previousSibling;
    }
    var n = ele.nextSibling;
    while(n){
        if(n.nodeType === 1){
            a.push(n)
        }
        n = n.nextSibling;
    }
    return a;
}

DOM.prevSiblings = function (ele){ //找哥哥们
    var nodes = ele.parentNode.childNodes;
    var a = [];
    for(var i=0;i<nodes.length;i++){
        var node = nodes[i];
        if(node == ele) break;
        if(node.nodeType == 1){
            a.push(node);
        }
    }
    return a;
}

DOM.nextSiblings = function (ele){ //找弟弟们
    var nodes = ele.parentNode.childNodes;
    var a = [];
    for(var i=nodes.length -1 ;i>=0;i--){
        var node = nodes[i];
        if(node == ele) break;
        if(node.nodeType === 1){
            a.unshift(node);
        }
    }
    return a;
}

DOM.prev = function (ele){ //找相邻的唯一的哥哥
    /*var prev = ele.previousSibling;
    if(prev && prev.nodeType != 1){
        prev = prev.previousSibling;
    }
    return prev;*/
    var a = prevSiblings(ele);
    return a[a.length -1]


}

DOM.next =function (ele){ //找相邻的唯一的弟弟
   var next = ele.nextSibling;
    if(next && next.nodeType != 1){
        next = next.nextSibling;
    }
    return next;

}

DOM.coloset = function (ele){ //找想邻的弟弟和哥哥

}

DOM.children = function(ele){
    var children = ele.children;//children 在ie里面不包括文本节点，只包括元素和注释
    //null,undefined 有三种值类型  对象和function 和 undefined类型，但是把null也归到类型里的讲了
    //如何科学严谨的判断一个DOM元素是否支持某个属性呢，最好的办法是typeof ele.attribute == 'object'
    //尽量不要用if(ele.attribute)的方法
    if(typeof ele.nextElementSibling == 'undefined'){  // ie678
        var a = [];
        for(var i=0;i<children.length;i++){
            var child = children[i];
            if(child.nodeType === 1){
                a.push(child)
            }
        }
        return a;
    }
    return children;
}

DOM.getElesByClass = function(strClass){

}
DOM.addClass = function(strClass){

}
DOM.removeClass = function(strClass){

}