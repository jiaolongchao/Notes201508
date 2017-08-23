function bind(ele,type,handler){
	if(!ele['a'+type+'bind']){
		ele['a'+type+'bind']=[];
	}

	var a=ele['a'+type+'bind'];
	for(var i=0; i<a.length; i++){
		if(a[i].original==handler){
			return;
		}
	}
	var fnTemp=function(){
		handler.call(ele);
	}
	a.push(fnTemp);
	fnTemp.original=handler;
	ele.attachEvent('on'+type,fnTemp);
	//alert('a'+type+'bind'+'\n'+ele['a'+type+'bind']
}

function unbind(ele,type,handler){
	if(ele.removeEventListener){
		ele.removeEventListener(type,handler,false);
	}else if(ele.detachEvent){
		var a=ele['a'+type+'bind'];
		if(!a){
			return;
		}
		for(var i=0; i<a.length; i++){
			if(a[i].original==handler){
				ele.detachEvent('on'+type,a[i]);
				a.splice(i,1);
				break;
			}
		}
	}
}

function on(ele,type,handler){
	if(typeof ele['on'+type]=='undefined'){
		if(!ele['a'+type+'on']){
			ele['a'+type+'on']=[];
		}
		var a=ele['a'+type+'on'];
		for(var i=0; i<a.length; i++){
			if(a[i]==handler){
				return;
			}
		}
		a.push(handler);
	}else if(ele.addEventListener){
		ele.addEventListener(type,handler,false);
	}else if(ele.attachEvent){
		if(!ele['a'+type+'on']){
			ele['a'+type+'on']=[];
		}

		var a=ele['a'+type+'on'];
		for(var i=0; i<a.length; i++){
			if(a[i]==handler){
				return;
			}
		}
		a.push(handler);
		bind(ele,type,run);
	}
}

function run(e){
	e=e||window.event;
	if(!e.target){
		e.target=e.srcElement;
	}
	if(typeof e.pageX=='undefined'){
		e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
		e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
	}
	if(typeof e.stopPropagation=='undefined'){
		e.stopPropagation=function(){
			e.cancelBubble=true;
		}
	}
	if(typeof e.preventDefault=='undefined'){
		e.preventDefault=function(){
			e.returnValue=false;
		}
	}

	var a=this['a'+e.type+'on'];

	if(!a){
		return;
	}
	
	for(var i=0; i<a.length; i++){
		a[i].call(this,e);
	}
}

function fire(type,e){
	//alert(this['a'+type+on]);
	if(!this['a'+type+'on']){
		return;
	}
	var a=this['a'+type+'on'];
	for(var i=0; i<a.length; i++){
		a[i].call(this,e);
	}
}

function off(ele,type,handler){
	if(ele.removeEventListener){
		ele.removeEventListener(type,handler,false);
		return;
	}

	var a=ele['a'+type+'on'];
	if(!a){
		return;
	}
	for(var i=0; i<a.length; i++){
		if(a[i]==handler){
			a.splice(i,1);
			break;
		}
	}
}

//准备拖拽
function down(e){
	this.x=this.offsetLeft;
	this.y=this.offsetTop;
	this.mouseX=e.pageX;
	this.mouseY=e.pageY;

	if(this.setCapture){
		this.setCapture();
		on(this,'mousemove',move);
		on(this,'mouseup',up)
	}else{
		var that=this;
		this.MOVE=function(e){
			move.call(that,e);
		}
		this.UP=function(e){
			up.call(that,e);
		}
		on(document,'mousemove',this.MOVE);
		on(document,'mouseup',this.UP);
	}
	e.preventDefault();
	
	fire.call(this,"dragStart",e);
}

//正在拖拽
function move(e){
	this.style.left=this.x+e.pageX-this.mouseX+'px';
	this.style.top=this.y+e.pageY-this.mouseY+'px';
	
	fire.call(this,"dragging",e);
}

//结束拖拽，鼠标抬起
function up(e){
	if(this.releaseCapture){
		this.releaseCapture();
		off(this,'mousemove',move);
		off(this,'mouseup',up);
	}else{
		off(document,'mousemove',this.MOVE);
		off(document,'mouseup',this.UP);
	}

	fire.call(this,"dragEnd",e);
}