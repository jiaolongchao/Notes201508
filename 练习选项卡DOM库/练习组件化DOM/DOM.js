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

DOM.siblings = function (ele){ //���ele���е�Ԫ���ֵܽڵ�
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

DOM.prevSiblings = function (ele){ //�Ҹ����
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

DOM.nextSiblings = function (ele){ //�ҵܵ���
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

DOM.prev = function (ele){ //�����ڵ�Ψһ�ĸ��
    /*var prev = ele.previousSibling;
    if(prev && prev.nodeType != 1){
        prev = prev.previousSibling;
    }
    return prev;*/
    var a = prevSiblings(ele);
    return a[a.length -1]


}

DOM.next =function (ele){ //�����ڵ�Ψһ�ĵܵ�
   var next = ele.nextSibling;
    if(next && next.nodeType != 1){
        next = next.nextSibling;
    }
    return next;

}

DOM.coloset = function (ele){ //�����ڵĵܵܺ͸��

}

DOM.children = function(ele){
    var children = ele.children;//children ��ie���治�����ı��ڵ㣬ֻ����Ԫ�غ�ע��
    //null,undefined ������ֵ����  �����function �� undefined���ͣ����ǰ�nullҲ�鵽������Ľ���
    //��ο�ѧ�Ͻ����ж�һ��DOMԪ���Ƿ�֧��ĳ�������أ���õİ취��typeof ele.attribute == 'object'
    //������Ҫ��if(ele.attribute)�ķ���
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