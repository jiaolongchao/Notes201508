/**
 * Created by Administrator on 2016/1/19.
 */
var creatXHR = (function() {
    if("XMLHttpRequest" in window){
        return function(){
            return new XMLHttpRequest();
        }
    }
    if(new ActiveXObject("Microsoft.XMLHTTP")){
        return function(){
            return new ActiveXObject("Microsoft.XMLHTTP")
        }
    }
})()
var utils = {
    toJSON : function(str){
        return "JSON" in window ? JSON.parse(str) : eval("(" + str +")")
    },
    ajax : function(url,callback){
        var _this = this;
        url+= url.indexOf("?") > -1 ?"&_="+ Math.random():"?_="+ Math.random()
        /*if(url.indexOf("?") > -1){
            url+="&_="+ Math.random();
        }else{
            url+="?_="+ Math.random();
        }*/
        var xhr = creatXHR();
        xhr.open("get",url)
        xhr.onreadystatechange = function(){
            if(this.readyState === 4 && /^2\d{2}$/.test(this.status)){
                var val = this.responseText;
                val = _this.toJSON(val)
                typeof  callback === "function"?callback(val):null
            }
        }
        xhr.send();
    }
}