/**
 * Created by Administrator on 2016/1/22.
 */

var getXHR = function () {
    if (window.XMLHttpRequest) {
        return function(){
            return new XMLHttpRequest();
        }
    }
    return function(){
        return new ActiveXObject('Microsoft.XMLHttp');
    }
}();

var utils = {
    toJSON: function (str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")")
    },
    ajax: function (url, callback) {
        url += url.indexOf("?") > -1 ? "&_=" + Math.random() : "?_=" + Math.random()
        var xhr = getXHR();
        xhr.open("get", url);
        var _this = this;

        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && /^2\d{2}$/.test(this.status)) {
                var val = this.responseText;
                val = _this.toJSON(val)
                typeof callback === "function" ? callback(val) : null
            }
        }
        xhr.send();
    }

}


