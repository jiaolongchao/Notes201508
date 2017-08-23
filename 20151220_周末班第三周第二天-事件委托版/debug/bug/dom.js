function getIndex(ele){
    var index=0;
    var p=ele.previousSibling ;
    while (p){
        if (p.nodeType ===1){
            index ++;
        }
        p= p.previousSibling ;
    }
    return index;

}
