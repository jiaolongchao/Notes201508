/**
 * Created by Administrator on 2016/1/14.
 */

//保护内部变量，不受外部修改
(function(){
    //为了防止重复加载
    if(this.x){
        return;
    }
    var x = this.x = {};
    //默认的参数配置项
    var settings = {
        //请求路径
        url : '',
        //发送给服务器的数据
        data : {},
        //是否异步
        async : true,
        //用户名
        username : undefined,
        password : undefined,
        dataType : 'text'
    }

    x.$http = function(opt){
        //判断参数是不是一个对象
        if(!util.isObject(opt)){
            throw new Error('参数必须是一个对象')
        }
        //生成一个新的配置参数列表 因为了为了防止修改默认参数和用户传进来的参数
        var _opt = {};
        for(var n in settings){
            if(!settings.hasOwnProperty(n)) continue;
            _opt[n] = opt[n] || settings[n];
        }
        //获取ajsx的一个实例
        var xhr = util.getXHR();

        //判断http是否合法
        if(!/^(get|post|head|delete|put|options)$/ig.test(_opt.type)){
            throw new Error('http方法不合法')
        }
        //如果用户输入的Data为一个对象，那么就把这个对象转换为URI格式的字符串
        if(util.isObject(_opt.data)){
            var arr = [];
            for(n in _opt.data){
                if(!_opt.data.hasOwnProperty(n)) continue;
                arr.push(encodeURIComponent(n) + '=' + encodeURIComponent(_opt.data))
            }
            _opt.data = arr.join('&')
        }

        //因为Get系需要把data拼接到URL后面，需要判断有没有“？”
        if(/^(get|delete|head)$/ig.test(_opt.type)){
            _opt.url += (/\?/.test(_opt.url) ? '&' : '?') + _opt.data;
            _opt.data = null;
        }

        //处理缓存
        if(_opt.data === false){
            var random = Math.floor(Math.random()*10000).toString(36)  //进制 生成包含数字和字母的随机数
           // (~~(Math.random()*0xffffff)).toString(16)
            _opt.url += (/\?/.test(_opt.url) ? "&" : '?') + '_=' + random;
        }


        //那卡一个http连接
        xhr.open(_opt.type,_opt.url,_opt.async,_opt.username,_opt.password);
        //注册监听状态的函数
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)){
                var txt = xhr.responseText;
                if(_opt.dataType.toUpperCase() === 'JSON'){
                    try{
                        //如果响应不是有效的json字符串，执行jsonparson会报错
                        txt = util.JSONparse(txt)
                    }catch(e){
                        //报错之后，后续都不需要走了
                        _opt.error(e);
                        return;
                    }
                }
                _opt.success(txt)
            }
        }
        //执行超时逻辑
        if(util.isNumber(_opt.timeout) && _opt.timeout >0){
            //不管这个值是对是错，只判断有没有
            if('timeout' in xhr){
                //标准浏览器
                xhr.timeout = _opt.timeout;
                //超时的时候执行的函数
                xhr.ontimeout = function(){
                    _opt.error();
                }
            }else{
                //IE
                setTimeout(function(){
                    //假如时间超时了
                    if(xhr.readyState !==4){
                        xhr.abort();
                    }
                },_opt.timeout)
            }
        }
        //在上头get系已经处理的Data为null
        //发送http请求
        xhr.send(_opt.data);
    }
    //利用闭包来实现一个判断对象类型的逻辑
    var isType = function(type){
        return function(obj){
            return Object.prototype.toString.call(obj) == '[object ]' + type + ']';
        }
    }

    var util = {
        //利用惰性函数实现获取当前浏览器最合适的那个ajax对象
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
            throw new ReferenceError("浏览器不支持此功能")
        })(),
        //利用惰性函数实现循环的内容
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
        //给utils对象动态添加属性
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
            //兼容ie6 7
            return function(str){
               // return eval('('+ str +')');
               return (new Function('return ' + str))();
            }
        })()
    }
})