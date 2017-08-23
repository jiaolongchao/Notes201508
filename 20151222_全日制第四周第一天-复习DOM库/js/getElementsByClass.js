utils.getElementsByClass = function (strClass, context) {
    context = context || document;
    if ("getElementsByClassName" in document) {
        return context.getElementsByClassName(strClass);
    }

    var reg, ary = [];
    //1、获取指定上下文下的所有的元素标签
    var tagList = context.getElementsByTagName("*");
    //2、把传递进来的strClass多个样式类名拆分成一个数组,里面包含每一个样式类名
    var classAry = strClass.replace(/(^ +| +$)/g, "").split(/ +/);
    //3、循环所有的标签把具备条件的保存在容器ary中
    for (var i = 0; i < tagList.length; i++) {
        var curTag = tagList[i];
        //我们假设当前的curTag是我们想要的:classAry中所有的样式我们的当前元素curTag都有
        curTag.flag = true;//->给当前元素增加一个自定义属性flag,假设传递进来的样式,当前标签都有
        //接下来我们循环classAry,一个个的验证curTag是否包含了每一个样式类名
        for (var k = 0; k < classAry.length; k++) {
            reg = new RegExp("(^| +)" + classAry[k] + "( +|$)");
            if (!reg.test(curTag.className)) {
                curTag.flag = false;
                break;
            }
        }
        //如果当前抱歉的flag为true说明确实都有,我们把当前的标签放在容器中
        curTag.flag ? ary.push(curTag) : null;
    }
    return ary;
};