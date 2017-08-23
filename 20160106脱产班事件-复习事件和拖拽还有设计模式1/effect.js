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

function fly(){
	this.speed*=.97;
	var maxRight=document.documentElement.clientWidth-this.offsetWidth;//盒子最大的右边界
	var val=this.offsetLeft+this.speed;//正常情况下盒子应该到的位置
	if(val<=0){
		val=0;
		this.speed*=-1;	
	}else if(val>=maxRight){
		val=maxRight;
		this.speed*=-1;
	}
	this.style.left=val+"px";
	if(Math.abs(this.speed)>=0.5){
		this.flyTimer=window.setTimeout(processThis(this,fly),15);
	}
}

function drop(){
	if(!this.dropSpeed){
		this.dropSpeed=7;
		this.flag=0;
	}else{
		this.dropSpeed+=7;
	}
	this.dropSpeed*=.97;
	var val=this.offsetTop+this.dropSpeed;
	var maxBottom=document.documentElement.clientHeight-this.offsetHeight;
	if(val>=maxBottom){
		this.style.top=maxBottom+"px";
		this.dropSpeed*=-1;
		this.flag++;
	}else{
		this.style.top=val+"px";
		this.flag=0;
	}
	if(this.flag<2){
		this.dropTimer=window.setTimeout(processThis(this,drop),15);
	}
	
}