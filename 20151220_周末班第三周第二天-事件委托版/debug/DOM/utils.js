/**
 * Created by PANPAN on 2015/12/20.
 */
function getIndex(ele){
    var index=0;
    var p=ele.previousSibling;
    while(p){
        if(p.nodeType===1){
            index++;
        }
        p.previousSibling;
    }
    return index;
}
function siblings(ele){
    var nodes=ele.parentNode.childNodes;
    var a=[];
    for(var i=0;i<nodes.length;i++){
        var node=nodes[i];
        if(node!=ele && node.nodeType==1){
            a.push(node);
        }
    }
}
function siblings(ele){
    var a=[];
    var p=ele.previousSibling;
    while(p){
        if(p.nodeType==1){
            a.unshift(p);
        }
    }
    var n=ele.nextSibling;
    while(n){
        if(n.nodeType===1){
            a.unshift(n);
        }
        n=n.nextSibling;
    }
    return a;
}
//�����еĸ��Ԫ��
function prevSiblings(ele){
    var nodes=ele.parentNode.childNodes;
    var a=[];
    for(var i=0;i<nodes.length;i++){
        var node=nodes[i];
        if(node==this)break;//�Ҹ����������Լ���ֹͣ
        if(node!=ele && node.nodeType==1){
            a.push(node);
        }
    }
}
//�����еĵܵ�Ԫ��
function nextSiblings(ele){
    var nodes=ele.parentNode.childNodes;
    var a=[];
    for(var i=nodes.length-1;i<nodes.length;i--){
        var node=nodes[i];
        if(node==this)break;
        if(node.nodeType==1){
            a.unshift(node);
        }
    }
}
//�����ڵ�Ψһ�ĸ��
function prev(ele){
    var node=ele.previousSibling;
    while(node){
        if(node.nodeType==1){
            return node;
        }
        node=node.previousSibling;
    }
    return null;//�����д��䣬����Ҳ������ͻ᷵��undefined
}
//�����ڵ�Ψһ�ĵܵ�
function next(ele){
    var node=ele.nextSibling;
    while(node){
        if(node.nodeType==1){
            return node;
        }
        node=node.nextSibling;
    }
    return null;
}
//�����ڵĵܵܺ͸��
function closest(ele){
    var ary=[];
    var node1=ele.previousSibling;
    while(node1){
        if(node1.nodeType==1){
            ary.push(node1);
        }
        node1=node1.previousSibling;
    }
    var node2=ele.nextSibling;
    while(node2){
        if(node2.nodeType==1){
            ary.push(node2);
        }
        node2=node2.nextSibling;
    }
    return ary;
}