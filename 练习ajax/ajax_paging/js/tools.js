var getXHR = (function () {
    if ("XMLHttpRequest" in window) {
        return function () {
            return new XMLHttpRequest();
        }
    }
    if (new ActiveXObject("Microsoft.XMLHTTP")) {
        return function () {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    if (new ActiveXObject("Msxml2.XMLHTTP")) {
        return function () {
            return new ActiveXObject("Msxml2.XMLHTTP");
        }
    }
    if (new ActiveXObject("Msxml3.XMLHTTP")) {
        return function () {
            return new ActiveXObject("Msxml3.XMLHTTP");
        }
    }
})();

var tools = {
    toJSON: function (str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    },
    ajax: function (url, fn) {
        var _this = this;
        url += /\?/.test(url) ? "&_=" + Math.random() : "?_=" + Math.random();
        var xhr = getXHR();
        xhr.open("get", url);
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && /^2\d\d$/.test(this.status.toString())) {
                var val = this.responseText;
                val = _this.toJSON(val);
                typeof fn === "function" ? fn(val) : null;
            }
        };
        xhr.send();
    }
};