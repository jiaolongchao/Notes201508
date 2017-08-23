"use strict";//->使用严格模式

var utils = {};

//模拟jQuery中的css方法实现对一个元素样式的设置/批量设置/获取
utils.css = (function () {
    var flag = "getComputedStyle" in window;

    //getCss:获取指定元素指定样式属性的值
    var getCss = function (curEle, attr) {
        var val = null, reg = null;
        if (flag) {
            val = window.getComputedStyle(curEle, null)[attr];
        } else {
            if (attr === "opacity") {
                val = curEle.currentStyle["filter"];
                reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }
        }
        reg = /^-?\d+(\.\d+)?(px|pt|em|rem)?$/;
        return reg.test(val) ? parseFloat(val) : val;
    };

    //setCss:给指定的元素指定的样式属性设置指定的值
    var setCss = function (curEle, attr, value) {
        var reg = /^(width|height|top|left|right|bottom|((margin|padding)(left|right|top|bottom)?))$/i;
        if (attr === "float") {
            curEle["style"]["cssFloat"] = value;
            curEle["style"]["styleFloat"] = value;
            return;
        }
        if (attr === "opacity") {
            value = Number(value);
            isNaN(value) ? value = 1 : null;
            value > 1 ? value = 1 : null;
            value < 0 ? value = 0 : null;

            curEle["style"]["opacity"] = value;
            curEle["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
            return;
        }
        if (reg.test(attr)) {
            curEle["style"][attr] = isNaN(value) ? value : value + "px";
            return;
        }
        curEle["style"][attr] = value;
    };

    //setGroupCss:批量给指定的元素指定的样式属性设置指定的值
    var setGroupCss = function (curEle, options) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                setCss(curEle, key, options[key]);
            }
        }
    };

    return function () {
        //init parameter
        var curEle = arguments[0], attr, value, options;

        //两个参数的话有两种情况:获取、批量设置
        if (arguments.length === 2) {
            if (typeof arguments[1] === "object") {
                //批量设置
                options = arguments[1];
                setGroupCss(curEle, options);
                return;
            }
            //获取
            attr = arguments[1];
            return getCss(curEle, attr);
        }

        //三个参数的话肯定是给元素设置样式
        if (arguments.length === 3) {
            attr = arguments[1];
            value = arguments[2];
            setCss(curEle, attr, value);
        }
    }
})();