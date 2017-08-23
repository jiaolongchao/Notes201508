var DOM={}
DOM.getIndex=function (ele) {

    var index = 0;
    var p = ele.previousSibling;
    while (p){
        if(p.nodeType===1){
            index++;
        }
        p= p.previousSibling;

    }
    return index;
}


DOM.siblings=function (ele){//获得所有克弟的节点
    var nodes=ele.parentNode.childNodes;
        var a=[];
    for(var i=0;i<nodes.length;i++){
        var node=nodes[i];
        if(node!=ele&&node.nodeType==1){
            a.push(node);
        }
    }
    return a;

}


DOM.previousSibling=function (){//获得所有节点
    var nodes=ele.parentNode.childNodes;
    var a=[];
    for (var i=0;i<nodes.length;i++){
        var node=nodes[i];
        if(node=ele)break;
        if(node.nodeType==1){
            a.push(node);
        }

    }
        return a;
}

DOM.nextSiblings=function  (ele){//找弟弟
    var nodes=ele.parentNode.childNodes;
    var a=[];
    for (var i=nodes.length-1;i>=0;i--){
        var node=nodes[i];
        if(node=ele);break;
        if(node.nodeType=1){
            a.unshift(node);
        }

    }
    return a;
}


DOM.nextsiblings=function  (ele){//找唯一相邻的哥
    //var a=previousSibling(ele;
    //return a[a.length-1];
    


}

//function  nextsiblings(ele){//找相邻唯 一弟弟
//    var nodes=ele.parentNode.childNodes;
//    var a=[];
//    for (var i=nodes.length-1;i>=0;i--){
//
//    }
//}