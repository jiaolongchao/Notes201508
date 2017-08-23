var utils = {};

//getCss:获取当前元素所有经过浏览器计算的样式
utils.getCss = function (curEle, attr) {
    var val, reg;
    if ("getComputedStyle" in window) {
        val = window.getComputedStyle(curEle, null)[attr];
    } else {
        if (attr === "opacity") {
            var temp = curEle.currentStyle["filter"];
            reg = /^alpha\(opacity=((?:\d|(?:[1-9]\d+))(?:\.\d+)?)\)$/;
            temp = reg.exec(temp);
            val = temp ? temp[1] / 100 : 1;
        } else {
            val = curEle.currentStyle[attr];
        }
    }
    reg = /^-?(\d|([1-9]\d+))(\.\d+)?(px|pt|em|rem|vh|vw)$/;
    return reg.test(val) ? parseFloat(val) : val;
};

//offset:获取当前元素距离BODY的偏移量
utils.offset = function (curEle) {
    var l = curEle.offsetLeft, t = curEle.offsetTop;
    var p = curEle.offsetParent;
    while (p) {
        if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
            l += p.clientLeft;
            t += p.clientTop;
        }
        l += p.offsetLeft;
        t += p.offsetTop;
        p = p.offsetParent;
    }
    return {left: l, top: t};
};

//----------------------------------------------

//prev:获取当前元素的上一个哥哥元素节点
utils.prev = function (curEle) {
    if (curEle.previousElementSibling) {
        return curEle.previousElementSibling;
    }
    var p = curEle.previousSibling;
    while (p && p.nodeType !== 1) {
        p = p.previousSibling;
    }
    return p;
};

//prevAll:获取当前元素的所有的哥哥元素节点
utils.prevAll = function (curEle) {
    var ary = [];
    var pre = this.prev(curEle);
    while (pre) {
        ary.unshift(pre);
        pre = this.prev(pre);
    }
    return ary;
};


//next:获取当前元素的下一个弟弟元素节点
utils.next = function (curEle) {
    if (curEle.nextElementSibling) {
        return curEle.nextElementSibling;
    }
    var nex = curEle.nextSibling;
    while (nex && nex.nodeType !== 1) {
        nex = nex.nextSibling;
    }
    return nex;
};

//nextAll:获取当前元素的所有的弟弟元素节点
utils.nextAll = function (curEle) {
    var ary = [];
    var nex = this.next(curEle);
    while (nex) {
        ary.push(nex);
        nex = this.next(nex);
    }
    return ary;
};


//sibling:获取当前元素的相邻两个兄弟元素节点
utils.sibling = function (curEle) {
    var p = this.prev(curEle);
    var n = this.next(curEle);
    var a = [];
    p ? a.push(p) : null;
    n ? a.push(n) : null;
    return a;
};

//siblings:获取当前元素的所有兄弟元素节点
utils.siblings = function (curEle) {
    return this.prevAll(curEle).concat(this.nextAll(curEle));
};


//siblings:获取当前元素的索引
utils.getIndex = function (curEle) {
    return this.prevAll(curEle).length;
};

//--------------------------------------------------

//getElementsByClass:通过元素的类名来获取元素节点集合
utils.getElementsByClass = function (strClass, context) {
    context = context || document;
    if ("getElementsByClassName" in document) {
        return context.getElementsByClassName(strClass);
    }
    var reg, ary = [],
        tagList = context.getElementsByTagName("*"),
        classAry = strClass.replace(/(^ +| +$)/g, "").split(/ +/);
    for (var i = 0; i < tagList.length; i++) {
        var curTag = tagList[i];
        curTag.flag = true;
        for (var k = 0; k < classAry.length; k++) {
            reg = new RegExp("(^| +)" + classAry[k] + "( +|$)");
            if (!reg.test(curTag.className)) {
                curTag.flag = false;
                break;
            }
        }
        curTag.flag ? ary[ary.length] = curTag : null;
    }
    return ary;
};

//children:获取当前元素下指定标签名的元素子节点集合
utils.children = function (curEle, tagName) {
    var nodeList = curEle.childNodes, ary = [];
    for (var i = 0; i < nodeList.length; i++) {
        var curNode = nodeList[i];
        if (curNode.nodeType === 1) {
            if (typeof tagName === "string") {
                var curNodeLow = curNode.nodeName.toLowerCase();
                var tagNameLow = tagName.toLowerCase();
                curNodeLow === tagNameLow ? ary[ary.length] = curNode : null;
                continue;
            }
            ary[ary.length] = curNode;
        }
    }
    return ary;
};