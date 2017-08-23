/**
 * Created by Administrator on 2015/12/20.
 */
var DOM={};
DOM.sibling=function (ele){
    var node=ele.parentNode.childNodes;
    var a=[];
    for(var i=0;i<nodes.length;i++){
        var node=nodes[i];
        if(node==ele)break;
        if(node.nodeType==1){
            a.push(node);
    }
    }
return a;
};
//function nextSibling(ele){
//    var nodes=ele.parentNode.childNodes;
//    var a=[];
//    for(var i=nodes.length-1;i>=0;i--){
//        var node=nodes[i];
//        if(node==ele)break;
//        if(node.nodeType==1){
//            a.unshift(node);
//
//        }
//    }
//    return a;
//}



//function changeTab(){
//    //var ajax={};
//    //var animate={};
//    //this;
//    var n=DOM.getIndex(this);
//    var siblings=DOM.siblings(this);
//    this.className="tab selectedTab";
////    所有加加选中样式  循环去掉选中样式 去掉选中样式
//for(var i=0;i<siblings.length;i++){
//    siblings[i].className="tab";
////    removeClass 的操作 把selectedTab给去掉了
//}}
