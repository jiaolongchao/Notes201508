window.ajax = (function () {
    var getXHR = function () {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
        return new ActiveXObject('Microsoft.XMLHTTP');
    };
    var encodeURIString = function (data) {
        if (typeof data === 'string') {
            return data;
        }
        var part = [];
        for (var n in data) {
            part.push(encodeURIComponent(n) + '=' + encodeURIComponent(data[n]));
        }
        // www.baidu.com?c=3
        // c=3
        return part.join('&');
    };
    var hasSearch = function (str) {
        return /\?/.test(str);
    };

    var getRandom = function () {
        return Math.ceil(Math.random() * 10000)
    };
    /**
     * 把ajax封装到这个方法里
     * @param url {string} 请求的路径
     * @param method {string} http方法
     * @param async {boolean} 是否为异步
     * @param callback {Function} 回调函数
     */
    //var ajax = function (url,data, method, async, callback) {
    var ajax = function (settings) {
        var xhr = getXHR();
        settings.data = encodeURIString(settings.data);
        if (/(get|delete|head)/ig.test(settings.method)) {
            // 如果为true 就表示为get系
            if (hasSearch(settings.url)) {
                settings.url += '&' + settings.data;
            } else {
                settings.url += '?' + settings.data;
            }
            settings.data = null;
        }
        if (settings.cache === false) {
            if (hasSearch(settings.url)) {
                settings.url += '&' + getRandom();
            } else {
                settings.url += '?' + getRandom();
            }
        }
        xhr.open(settings.method, settings.url, settings.async);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                settings.callback(this.responseText)
            }
        };
        xhr.send(settings.data);
    };
    return ajax;
})();