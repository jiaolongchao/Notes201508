/**
 * Created by Administrator on 2016/1/23.
 */
var getXHR = function(){
    if(window.XMLHttpRequest){
        return function(){
            return new XMLHttpRequest()
        }
    }
    return function(){
        return new ActiveXObject("Micosoft.XMLHTTP")
    }
}()
var utils = {
    getJSON : function(str){
        "JSON" in window ? JSON.parse(str) : eval("("+ str +")");
    },
    ajax : function(url,callback){
        url = url.indexOf("?") > -1 ? "&_" + Math.random() : "?_" + Math.random();
        var xhr = getXHR()
        xhr.open("get",url);
        xhr.onreadystatechange = function(){
           var val = xhr.responseText;


        }
    }
}