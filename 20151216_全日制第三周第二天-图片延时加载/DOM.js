/**
 * Created by Administrator on 2015/12/19.
 */
function offset(ele){
    var l = ele.offsetLeft;
    var t = ele.offsetTop;
    var p = ele.offsetParent;
    while(1){
        if(!p || p == document.body) break;
        if(window.navigator.userAgent.indexOf('MSIE 8')>-1){
            l += p.offsetLeft;
            t += p.offsetTop;
        }else{
            l+= p.offsetLeft+ p.clientLeft;
            t+= p.offsetTop+ p.clientTop;
        }
        p = p.offsetParent;
    }
    return {left:l,top:t}
}