/**
 * Created by Administrator on 2015/12/21.
 */
var DOM = {}
DOM.getIndex = function(ele){
    var childrens = ele.parentNode.childNodes;
    var n = 0;
    for(var i=0;i<childrens.length;i++){
        var children = childrens[i];
        if(ele == children) break;
        if(children.nodeType === 1){
            n++;
        }
    }
    return n;
}


DOM.children = function(ele){ //��ȡ���е���Ԫ��
    var childrens = ele.children;
    if(typeof ele.nextElementSibling != 'Object'){
        var ary = [];
        for(var i=0;i<childrens.length;i++){
            var children = childrens[i];
            ary.push(children)
        }
        return ary;
    }
    return childrens;
}
DOM.previousSibling = function(ele){ //��ȡ�����Ԫ��
    var childrens = ele.parentNode.childNodes;
    var ary = []
    for(i=0;i<childrens.length;i++){
        var child = childrens[i];
        if(ele == child) break;
        if(child.nodeType === 1){
            ary.push(child)
        }
    }
    return ary;
}
DOM.nextSibling = function(ele){ //��ȡ�ܵ���Ԫ��
    var childrens = ele.parentNode.childNodes;
    var ary = []
    for(i=childrens.length-1;i>=0;i--){
        var child = childrens[i];
        if(ele == child) break;
        if(child.nodeType === 1){
            ary.unshift(child)
        }
    }
    return ary;
}
DOM.prev = function(ele){//��ȡ��һ�����Ԫ��
    var p = ele.previousSibling;
    while(p){
        if(p.nodeType === 1){
            return p;
        }
        p = p.previousSibling;
    }
    return null;
}
DOM.next = function(ele){//��ȡ��һ���ܵ�Ԫ��
    var p = ele.nextSibling;
    while(p){
        if(p.nodeType === 1){
            return p;
        }
        p = p.nextSibling;;
    }
    return null;
}


DOM.getbyClass = function(str){//��ȡclass����
    str = str.replace(/^ +| +$/)
    var aClass = str.split(/ +/);
    var eles = document.getElementsByTagName('*');
    for(var i =0 ;i < aClass.length; i++){
        var reg = RegExp("(^| )"+aClass[i] + "( |$)");
        var ary = [];
        for(var j=0;j<eles.length;j++){
            var ele = eles[j];
            if(reg.test(ele.className)){
                ary.push(ele)
            }
        }
        eles = ary;
    }
    return eles;
}

DOM.addClass = function(ele,strClass){
    var reg = RegExp("(^| )" + strClass + "( |$)")
    if(!reg.test(ele.className)){
        ele.className += ' '+ strClass;
    }
}
DOM.removeClass = function(ele,strClass){//ɾ��һ��class
    var reg = RegExp("(^| )" + strClass + "( |$)")
    ele.className = ele.className.replace(reg," ");
}

//=============================================================================
/*DOM.getEleChildren = function(obj,node){ //��ȡָ��Ԫ�������е�ָ��Ԫ�ؽڵ�
    var a = [];
    var oChild = obj.childNodes;
    if(node && node.tagName == 1){
        for(var i=0;i<oChild.length;i++){
            if(oChild[i].nodeType === 1 && oChild[i].nodeName == node.toUpperCase()){
                a.push(oChild[i])
            }
        }

    }else{//����ڶ���Ԫ��û�д���������ȫ����Ԫ��
        for(var i=0;i<oChild.length;i++){
            if(oChild[i].nodeType === 1){
                a.push(oChild[i])
            }
        }
    }
    return a;
}*/

DOM.getNextEle= function(ele){  //��ȡָ��Ԫ�ص���һ���ֵܽڵ�
    var ele = ele.nextSibling;

    if(ele.nodeType == 1){
        return ele;
    }
    if(ele.nextSibling){
        return arguments.callee(ele)
    }
    return null;
}

