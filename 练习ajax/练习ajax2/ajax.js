/**
 * Created by Administrator on 2016/1/16.
 */
(function(){
    //���ǵ�һ��
    var getXHR = function(){
        if(window.XMLHttpRequest){
            return new XMLHttpRequest();
        }
        return new ActiveXObject("Microsoft.XMLHTTP")
    }
    var  encodeURIString = function(data){
        if(typeof data === 'string'){
            return data;
        }
        var part = []
        for(var n in data){
          part.push(encodeURIComponent(n) + '=' + encodeURIComponent(data[n]))
        }
        return part.join('&');
    }
    var hasSearch = function(str){
        return /\?/.test(str)
    }
    var getRandom = function(){
        return Math.ceil(Math.random()*10000)
    }

    /**
     * ��ajax��װ�����������
     * @param url {string} �����·��
     * @param method{string} http����
     * @param async {boolen}
     * @param callback
     */

    //var ajax = function(url,data,method,async,callback){
    var ajax = function(settings){
        var xhr = getXHR();
        //�Ѳ���������url��ʽ
        settings.data = encodeURIString(settings.data)
        //�ж��ǲ���getϵ
        if(/(get|delete|head)/ig.test(settings.data)){
            if(hasSearch(settings.url)){
                settings.url += '&' + settings.data;
            }else{
                settings.url += '?' + settings.data;
            }
            settings.data = null;
        }
        //�ж��Ƿ��߻���
        if(settings.cache === false){
            if(hasSearch(settings.url)){
                settings.url += "&" + getRandom();
            }else{
                settings.url += "?" + getRandom();
            }
        }
        xhr.open(settings.method,settings.url,settings.async);
        xhr.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
                settings.callback(this.responseText)
            }
        }
        xhr.send(settings.data);
    }
    window.ajax = ajax;
})()

/*
{url:'',
data:}*/
