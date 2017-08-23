/**
 * Created by Administrator on 2016/1/17.
 */
window.ajax = (function () {
    var getXHR = (function () {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest()
        }
        return new ActiveXObject('Microsoft.XMLHTTP')
    })();

    var each = (function () {
        if ([].forEach) {
            return function (list, callback, context) {
                [].forEach.call(list, callback, context)
            }
        }
        return function (list, callback, context) {
            for (var i = 0, l = list.length; i < l; i++) {
                var item = list[i];
                callback.call(context, item, i, list)
            }
        }
    })()

    var encodeURIString = function(data){
        if(typeof data === 'string'){
            return data;
        }
        var part = [];
        for(var n in data){
            part.push(encodeURIComponent(n) + '=' + encodeURIComponent(data[n]))
        }
        return part.join('&')
    }
    var hasSearch = function(str){
        return /\?/.test(str)
    };

    var getRandom = function(){
        return (Math.random() * 10000) | 0
    }

    var JSONparse = (function(){
        if(window.JSON){
            return function(data){
                return JSON.parse(data)
            }
        }
        return function(data){
            return (new Function('return' + data))
        }
    })()


})()
