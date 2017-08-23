function on(ele,type,fn){//如果事件类型是以self为前缀的，则说明这是自定义事件，则单独定义数组来处理
	if(/^self/.test(type)){
		if(!ele["self"+type]){
			ele["self"+type]=[];	
		}
		var a=ele["self"+type];
		for(var i=0;i<a.length;i++){
			if(a[i]==fn)return;
		}
		a.push(fn);
		return;//处理完了自定义方法则结束。不需要再去当系统事件再执行了。
	
	
	}
	
	if(ele.addEventListener){
		ele.addEventListener(type,fn,false);
		return;	
	}
	if(!ele["onEvent"+type]){
		ele["onEvent"+type]=[];
		ele.attachEvent("on"+type,function(){run.call(ele)})
		//ele.attachEvent("on"+type,processThis(ele,run));
	}
	var a=ele["onEvent"+type]
	for(var i=0;i<a.length;i++){
		if(a[i]==fn)return;	
		}
		a.push(fn);
		
}

function run(){
	var e=window.event;
	var type=e.type;
	if(!e.target){
		e.target=e.srcElement
		e.stopPropagation = function(){ e.cancelBubble = true;}
		e.preventDefault = function(){ e.returnValue = false;}
		e.pageX = e.clientX +(document.documentElement.scrollLeft||document.body.scrollLeft);
		e.pageY = e.clientY +(document.documentElement.scrollTop||document.body.scrollTop);
		}

	var a=this["onEvent"+type];
	for(var i=0;i<a.length;i++){
	if(typeof a[i]=="function"){
		a[i].call(this,e);//把事件对象e传给数组里的方法
		}else{
			a.splice(i,1)
			i--;
			}
	}
			
}

function off(ele,type,fn){
	if(ele.removeEventListener){
		ele.removeEventListener(type,fn,false);	
	}
	var a=ele["onEvent"+type];
	if(a){
		for(var i=0;i<a.length;i++){
			if(a[i]==fn){
				a[i]=null;
				//a.splice(i,1);
				break;
				
			}
				
		}
	}
	
}

/*
	[fn1,fn2,fn3,fn4,fn5]
	i=0;
	[fn4,fn5];
	i++;
	i==1
*/
function processThis(obj,fn){
				return function(e){fn.call(obj,e)}	
}

//所谓的通知，就是当A（拖拽模块）执行的时候，去和事件标识符对应的数组里遍历执行相关方法的过程
function selfRun(selfType,event){//selfType是指自定义的事件，event是系统事件
	var a=this["self"+selfType];//这个数组是原来设计好的。
	if(a){
		for(var i=0;i<a.length;i++){
			a[i].call(this,event);//遍历执行。并且使数组里的方法在运行的时候，里面的this要指向当前的这个元素（this），还要能让这个方法得到系统的事件对象event;
		}
	}
	
}



