/**
 * Created by Administrator on 2016/1/13.
 */

window.onload = function(){
    var getXHR = (function(){
        var list = [function(){
            return new XMLHttpRequest
        },function(){
            return new ActiveXObject('Msxml2.XMLHTTP')
        },function (){
            return new ActiveXObject('Msxml3.XMLHTTP')
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
    })()

    var xhr = getXHR();

    /*var xhr = (function(){
     var flag = window.XMLHttpRequest;
     if(flag){
     return function(){
     return new XMLHttpRequest();
     }
     }
     return function(){
     return new ActiveXObject("Microsfot.XMLHTTP");
     }
     })();
     var x = xhr();*/
    xhr.open('head','data.json',true,'jiaolongchao','1234');

    xhr.onreadystatechange = function(){
        if(xhr.readyState===4 && /^2\d{2}$/.test(xhr.status)){
            console.table(xhr.responseText)
        }
    }
    xhr.send();
}
