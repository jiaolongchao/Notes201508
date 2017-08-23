/**
 * Created by Administrator on 2016/1/9.
 */
function clearEffect(){
    clearTimeout(this.droptimer);
    clearTimeout(this.flyTimer);
}
function getSpeed(e){
    if(!this.prevPosi){
        this.prevPosi = e.pageX;
    }else{
        this.flySpeed = e.pageX - this.prevPosi;
        this.prevPosi = e.pageX;
    }
}
function drop(){
    if(!this.dropSpeed){
        this.dropSpeed =7;
        this.flag = 0;
    }else{
        this.dropSpeed += 7;
    }
    var posi = this.offsetTop + this.dropSpeed;
    var maxBottom = document.documentElement.clientHeight - this.offsetHeight;
    if(posi > maxBottom){
        this.style.top = maxBottom + "px";
        this.speed*=-1;
        this.flag ++;
    }else{
        this.style.top = this.offsetTop + this.speed + "px";

    }
    if(this.flag < 2){
        this.dropTimer = window.setTimeout(drop.call(this),20)
    }
}
function fly(){
    this.flySpeed *= .97;
    var posi = this.offsetLeft + this.flySpeed;
    var maxRight = document.documentElement.clientWidth - this.offsetWidth;
    if(posi <=0){
        this.style.left = 0;
        this.flySpeed *= -1;
    }else if(posi >= maxRight){
        this.style.left = maxRight + "px";
        this.flySpeed *= -1;
    }else{
        this.style.left = posi + "px";
    }

    if(Math.abs(this.flySpeed) >= 0.5){
        this.flyTimer = window.setTimeout(processThis(this,fly),20);

    }
}