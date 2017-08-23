function down(e) {//给它一个事件标识符："selfDargStart";其实就是事件类型
	this.x = this.offsetLeft;
	this.y = this.offsetTop;
	this.mx = e.pageX;
	this.my = e.pageY;
	if(this.setCapture) {
		this.setCapture();
		on(this,"mousemove",move);
		on(this,"mouseup",up);
	}else {
		this.MOVE = move.bind(this);
		this.UP = up.bind(this);
		on(document,"mousemove",this.MOVE);
		on(document,"mouseup",this.UP);
	}
	
	e.preventDefault();
	//通知:就是去指定的数组里按顺序执行相关的方法
	selfRun.call(this,"selfDragStart",e);
}
	
function move(e){//给它一个事件标识符叫"selfDragging"
	this.style.left=this.x+(e.pageX-this.mx)+"px";
	this.style.top=this.y+(e.pageY-this.my)+"px";	
	selfRun.call(this,"selfDragging",e);
}

function up(e){//给它一个事件标识符叫："selfDragEnd"/
	if(this.releaseCapture){
		this.releaseCapture();
		off(this,"mousemove",move);
		off(this,"mousedown",down)
	}else{
	
		off(document,"mousemove",this.MOVE);
		off(document,"mouseup",this.UP);
		}
		selfRun.call(this,"selfDragEnd",e);
		
}

function clearEffect(){
	window.clearTimeout(this.dropTimer);
	window.clearTimeout(this.flyTimer);	
}

function getSpeed(e){
	if(!this.prevPosi){
		this.prevPosi=e.pageX;
	}else{
		this.speed=e.pageX-this.prevPosi;
		this.prevPosi=e.pageX;
	}
}

//计算速度的算法：单位时间内运动的距离越长，则飞出去的速度越快
//关键是“单位时间”从那儿来？一个固定长度的时间段
	function fly(){
		var maxRight=document.documentElement.clientWidth-this.offsetWidth;
		if(this.offsetLeft+this.speed>=maxRight){
			this.style.left=maxRight+"px";
			this.speed*=-1;
		}else if(this.offsetLeft+this.speed<=0){
			this.style.left=0;
			this.speed*=-1;
		}else{
			this.style.left=this.offsetLeft+this.speed+"px";
		}
		this.speed*=.97
		
		if(Math.abs(this.speed)>=0.5){
			this.flyTimer=window.setTimeout(processThis(this,fly),15);
		}
		
	}


function drop(){
	if(!this.dropSpeed){
		this.dropSpeed=9;
		this.flag=0
	}else{
		this.dropSpeed+=9;
	}
	this.dropSpeed*=.97;
	var maxBottom=document.documentElement.clientHeight-this.offsetHeight;
	if(this.offsetTop+this.dropSpeed>=maxBottom){
		this.style.top=maxBottom+"px";
		this.dropSpeed*=-1;
		this.flag++;
	}else{
		this.style.top=this.offsetTop+this.dropSpeed+"px";
		this.flag=0;
	}
	if(this.flag<2){
		this.dropTimer=window.setTimeout(processThis(this,drop),15);
	}
	
}
