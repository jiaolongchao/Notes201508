function prevSiblings(ele){//找所有的哥哥们
    var nodes=ele.parentNode.childNodes;
    var ary=[];
    for(var i=0;i<nodes.length;i++){
        var node=nodes[i];
        if(node===ele)break;
        else if(node.nodeType===1){
            ary[ary.length]=node;
        }
        return ary;
    }
}
function nextSiblings(ele){//找所有的弟弟们
    var nodes=ele.parentNode.childNodes;
    var ary=[];
    for(var i=nodes.leng-1;i>=0;i--){
        var node=nodes[i];
        if(node==ele)break;
        else if(node.nodeType===1){
            ary.unshift(node);
        }
        return ary;
    }
}
function prev(ele){//找相邻的唯一的哥哥
    var ary=prevSiblings(ele);
    return ary.length-1;
}
function next(ele){//找相邻的唯一的弟弟
    var ary=nextSiblings(ele);
    return ary[0];
}
var DOM={};
DOM.siblings=function (ele){
    var nodes=ele.parentNode.childNodes;
    var ary=[];
    for(var i=0;i<nodes.length;i++){
        var node=nodes[i];
        if(node!==ele&&node.nodeType===1){
            ary.push(node);
        }
    }
    return ary;
};
DOM.getIndex=function (ele){//获得ele的索引值
    var index=0;
    var p=ele.previousSibling;
    while(p){
        if(p.nodeType===1){
            index++;
        }
        p= p.previousSibling;
    }
    return index;
};
