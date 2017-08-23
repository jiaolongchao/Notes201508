function on(ele,type,fn){
	if(/^self/.test(type)){
		if(!ele["selfEvent"+type]){
			ele["selfEvent"+type]=[];
		}
		var a=ele["selfEvent"+type];
		for(var i=0;i<a.length;i++){
			if(a[i]==fn)return;	
		}
		a.push(fn);
		return;
		
	}
	
	
	if(ele.addEventListener){
		ele.addEventListener(type,fn,false);
		//return ;	
	}else if(ele.attachEvent){
		if(!ele["onevent"+type]){
			ele["onevent"+type]=[];
			ele.attachEvent("on"+type,function(){run.call(ele)});
			//this指向被绑定的元素
			//按顺序执行
			//不能重复绑定
		}
		var a=ele["onevent"+type];
		for(var i=0;i<a.length;i++){
			if(a[i]==fn)return;	
		}
		a.push(fn);
	}
	
}

function run(){
	var e=window.event;
	var type=e.type;
	var a=this["onevent"+type];
	if(a){
		if(!e.target){
			e.target=e.srcElement;
			e.stopPropagation=function(){e.cancelBubble=true;}
			e.preventDefault=function(){e.returnValue=false;}
			e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
			e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
			
		}
		
		for(var i=0;i<a.length;i++){
			if(typeof a[i]=="function"){
				a[i].call(this,e);
			}else{
				a.splice(i,1);
				i--;
			}	
		}
	}
}

function off(ele,type,fn){
	if(ele.removeEventListener){
		ele.removeEventListener(type,fn,false);
		return;	
	}
	var a=ele["onevent"+type];
	if(a){
		for(var i=0;i<a.length;i++){
			if(a[i]==fn){
				a[i]=null;
				return;	
			}
				
		}
		
	}
	
}

function processThis(obj,fn){
	return function (e){fn.call(obj,e)}
}



function selfRun(selfType,e){///selfType是我们自己定义的事件类型，e是系统的事件对象
	var a=this["selfEvent"+selfType];
	
	for(var i=0;i<a.length;i++){
		
		a[i].call(this,e);	
	}
	
}





