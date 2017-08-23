(function () {
    /**
     * jsonp
     * @param url {string} 跨域接口
     * @param data {Object} 发送的数据
     * @param jsonpcallback {string} 对方服务器提供的querystring param
     * @param callback {Function} 回调函数
     */
    var j = this.jsonp = function (url, data, jsonpcallback, callback) {
        var random = getRandom();
        var cbName = 'jsonp.' + random;
        // 根据cbName给jsonp生成静态方法
        // 因为我们要把cbName当成方法名，传给跨域服务器
        j[random] = function (data) {
            try{
                callback(data);
            }finally{
                script.parentNode.removeChild(script);
                delete j[random];
            }

        };

        data = encodeURIString(data);
        // 拼接data
        if (data) {
            if (hasSeach(url)) {
                url += '&' + data;
            } else {
                url += '?' + data;
            }
        }

        // 拼接jsonpcallback
        if (hasSeach(url)) {
            url += '&' + jsonpcallback + '=' + cbName;
        } else {
            url += '?' + jsonpcallback + '=' + cbName;
        }

        var script = document.createElement('script');
        script.src = url;
        document.body.appendChild(script);
    };
    /**
     * jsonp.aj9v9rs('hello cross origin')
     */


    var getRandom = function () {
        return 'a' + Math.abs(Math.random() * 0xffffffff | 0).toString(36)
    };

    var encodeURIString = function (data) {
        if (typeof data == 'string') {
            return data
        }
        var part = [];
        for (var n in data) {
            part.push(encodeURIComponent(n) + '=' + encodeURIComponent(data[n]));
        }
        return part.join('&');
    };

    var hasSeach = function (url) {
        return /\?/.test(url)
    }
})();