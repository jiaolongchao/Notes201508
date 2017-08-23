/**
 * Created by Administrator on 2016/1/14.
 */

//�����ڲ������������ⲿ�޸�
(function(){
    //Ϊ�˷�ֹ�ظ�����
    if(this.x){
        return;
    }
    var x = this.x = {};
    //Ĭ�ϵĲ���������
    var settings = {
        //����·��
        url : '',
        //���͸�������������
        data : {},
        //�Ƿ��첽
        async : true,
        //�û���
        username : undefined,
        password : undefined,
        dataType : 'text'
    }

    x.$http = function(opt){
        //�жϲ����ǲ���һ������
        if(!util.isObject(opt)){
            throw new Error('����������һ������')
        }
        //����һ���µ����ò����б� ��Ϊ��Ϊ�˷�ֹ�޸�Ĭ�ϲ������û��������Ĳ���
        var _opt = {};
        for(var n in settings){
            if(!settings.hasOwnProperty(n)) continue;
            _opt[n] = opt[n] || settings[n];
        }
        //��ȡajsx��һ��ʵ��
        var xhr = util.getXHR();

        //�ж�http�Ƿ�Ϸ�
        if(!/^(get|post|head|delete|put|options)$/ig.test(_opt.type)){
            throw new Error('http�������Ϸ�')
        }
        //����û������DataΪһ��������ô�Ͱ��������ת��ΪURI��ʽ���ַ���
        if(util.isObject(_opt.data)){
            var arr = [];
            for(n in _opt.data){
                if(!_opt.data.hasOwnProperty(n)) continue;
                arr.push(encodeURIComponent(n) + '=' + encodeURIComponent(_opt.data))
            }
            _opt.data = arr.join('&')
        }

        //��ΪGetϵ��Ҫ��dataƴ�ӵ�URL���棬��Ҫ�ж���û�С�����
        if(/^(get|delete|head)$/ig.test(_opt.type)){
            _opt.url += (/\?/.test(_opt.url) ? '&' : '?') + _opt.data;
            _opt.data = null;
        }

        //������
        if(_opt.data === false){
            var random = Math.floor(Math.random()*10000).toString(36)  //���� ���ɰ������ֺ���ĸ�������
           // (~~(Math.random()*0xffffff)).toString(16)
            _opt.url += (/\?/.test(_opt.url) ? "&" : '?') + '_=' + random;
        }


        //�ǿ�һ��http����
        xhr.open(_opt.type,_opt.url,_opt.async,_opt.username,_opt.password);
        //ע�����״̬�ĺ���
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)){
                var txt = xhr.responseText;
                if(_opt.dataType.toUpperCase() === 'JSON'){
                    try{
                        //�����Ӧ������Ч��json�ַ�����ִ��jsonparson�ᱨ��
                        txt = util.JSONparse(txt)
                    }catch(e){
                        //����֮�󣬺���������Ҫ����
                        _opt.error(e);
                        return;
                    }
                }
                _opt.success(txt)
            }
        }
        //ִ�г�ʱ�߼�
        if(util.isNumber(_opt.timeout) && _opt.timeout >0){
            //�������ֵ�Ƕ��Ǵ�ֻ�ж���û��
            if('timeout' in xhr){
                //��׼�����
                xhr.timeout = _opt.timeout;
                //��ʱ��ʱ��ִ�еĺ���
                xhr.ontimeout = function(){
                    _opt.error();
                }
            }else{
                //IE
                setTimeout(function(){
                    //����ʱ�䳬ʱ��
                    if(xhr.readyState !==4){
                        xhr.abort();
                    }
                },_opt.timeout)
            }
        }
        //����ͷgetϵ�Ѿ������DataΪnull
        //����http����
        xhr.send(_opt.data);
    }
    //���ñհ���ʵ��һ���ж϶������͵��߼�
    var isType = function(type){
        return function(obj){
            return Object.prototype.toString.call(obj) == '[object ]' + type + ']';
        }
    }

    var util = {
        //���ö��Ժ���ʵ�ֻ�ȡ��ǰ���������ʵ��Ǹ�ajax����
        getXHR : (function(){
            var list = [function(){
                return new XMLHttpRequest;
            },function(){
                return new ActiveXObject('Microsoft.XMLHTTP');
            },function(){
                return new ActiveXObject('Msxml2.XMLHTTP');
            },function (){
                return new ActiveXObject('Msxml3.XMLHTTP');
            }],xhr = null;
            while(xhr = list.shift()){
                try{ //
                    xhr();
                    break;
                }catch(e){
                    continue;
                }
            }
            if(xhr !== null){
                return xhr;
            }
            throw new ReferenceError("�������֧�ִ˹���")
        })(),
        //���ö��Ժ���ʵ��ѭ��������
        each : (function(){
            if([].forEach()){
                return function(list,callback,context){
                    [].forEach.call(list,callback,context)

                }
            }
            return function(list,callback,context){
                for(var i= 0,l=list.length;i<l;i++){
                    callback.call(context,list[i],i,list)
                }
            }
        })(),
        //��utils����̬�������
        init : function(){
            this.each(["String","Object","Number","Array","Function"],function(item){
                util["is" + item] = isType(item)
            })
        },
        JSONparse : (function(){
            if(window.JSON){
                return function(str){
                    return JSON.parse(str)
                }
            }
            //����ie6 7
            return function(str){
               // return eval('('+ str +')');
               return (new Function('return ' + str))();
            }
        })()
    }
})