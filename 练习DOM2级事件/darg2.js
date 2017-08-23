
/**
 * Created by Administrator on 2016/1/9.
 */
function down(e){
    this.x = this.offsetLeft;
    this.y = this.offsetTop;
    this.mx = e.pageX;
    this.my = e.pageY;
    if(this.setCapture){
        this.setCapture();
        on(this,"mousemove",move);
        on(this,"mouseup",up);
    }else{
        this.MOVE = processThis(this,move);
        this.UP = processThis(this,up);
        on(document,"mousemove",this.MOVE)
        on(document,"mouseup",this.UP)
    }
    e.preventDefault();
    selfRun.call(this,"selfdragstart",e);
}
function move(e){
    this.style.left = this.x + (e.pageX - this.mx) + "px";
    this.style.top = this.y + (e.pageY - this.my) + "px";
    selfRun.call(this,"selfdrag",e);
}
function up(e){
    if(this.releaseCapture){
        this.releaseCapture();
        off(this,"mousemove",move);
        off(this,"mouseup",up);
    }else{
        off(document,"mousemove",this.MOVE);
        off(document,"mouseup",this.UP);
    }
    selfRun.call(this,"selfdragend",e)
   /* drop.call(this,e)
    fly.call(this,e)*/
}

