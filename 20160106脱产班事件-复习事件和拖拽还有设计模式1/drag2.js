function down(e){//准备拖拽
	//e=window.event;
	this.x=this.offsetLeft;
	this.y=this.offsetTop;
	this.mx=e.pageX;
	this.my=e.pageY;
	
	if(this.setCapture){
		this.setCapture();
		on(this,"mousemove",move);
		on(this,"mouseup",up);
	}else{
		 /*this.MOVE=processThis(this,move);
		 this.UP=processThis(this,up);*/
		 this.MOVE=move.bind(this);
		 this.UP=up.bind(this);
		on(document,"mousemove",this.MOVE);
		on(document,"mouseup",this.UP);
	}
	e.preventDefault();
	//"selfDragStart"
	selfRun.call(this,"selfDragStart",e)//这叫“发布”，或叫“通知”，只有这个方法执行了，原来“约”【就是由on方法保存在数组里】了这个行为的那些方法才可以被执行
	//"selfEventselfDragStart"-->clearEffect
	
}


function move(e){//进行拖拽
	this.style.left=this.x+(e.pageX-this.mx)+"px";
	this.style.top=this.y+(e.pageY-this.my)+"px";
	//"selfDragging"用这个字符串来标识这个行，这个字符串其实叫事件类型
	selfRun.call(this,"selfDragging",e);
}

function up(e){//结束拖拽
	if(this.releaseCapture){
		this.releaseCapture();
		off(this,"mousemove",move);
		off(this,"mouseup",up);
	}else{
		off(document,"mousemove",this.MOVE);
		off(document,"mouseup",this.UP);
		
	}
	//"selfDragEnd"
	selfRun.call(this,"selfDragEnd",e);
	
	
}