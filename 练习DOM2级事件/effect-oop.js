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
        this.flySpeed = e.pageX - this.prevPosi;  //鼠标当次的位置 - 鼠标上次的位置 鼠标的速度
        this.prevPosi = e.pageX;
    }
}


function drop(){ //自由落体
    if(!this.dropSpeed){
        this.dropSpeed = 7;
        this.flag = 0;
    }else{
        this.dropSpeed +=7;
    }
    var posi = this.ele.offsetTop + this.dropSpeed;
    this.dropSpeed *= 0.97;
    var maxBottom = document.documentElement.clientHeight - this.ele.offsetHeight;
    if(posi > maxBottom){
        this.ele.style.top = maxBottom + "px";
        this.dropSpeed *= -1; //调头
        this.flag++;
    }else{
        this.ele.style.top = posi + "px";
        this.flag = 0;
    }
    if(this.flag < 2){
        this.dropTimer = window.setTimeout(processThis(this,drop),20)
    }
}

function fly(){
    this.flySpeed *= .97;
    var posi = this.ele.offsetLeft + this.flySpeed; //正常情况下合子应该到的位置
    var maxRight = document.documentElement.clientWidth - this.ele.offsetWidth;

    if(posi <=0){
        this.ele.style.left = 0;
        this.flySpeed *= -1;
    }else if(posi >= maxRight){
        this.ele.style.left = maxRight + "px";
        this.flySpeed *= -1;
    }else{
        this.ele.style.left = posi + "px";
    }
    if(Math.abs(this.flySpeed) >= 0.5){
        this.flyTimer = window.setTimeout(processThis(this,fly),20);
    }
}

function processThis(obj,fn){
    return function(e){fn.call(obj,e)}
}