var zhufengEffect = {
    //当前时间*变化量/持续时间+初始值
    zfLinear: function(t,b,c,d){ return c*t/d + b; },
    Quad: {//二次方的缓动（t^2）；
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t + b;
        },
        easeOut: function(t,b,c,d){
            return -c *(t/=d)*(t-2) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        }
    },
    Cubic: {//三次方的缓动（t^3）
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return c*((t=t/d-1)*t*t + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        }
    },
    Quart: {//四次方的缓动（t^4）；
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        }
    },
    Quint: {//5次方的缓动（t^5）；
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        }
    },
    Sine: {//正弦曲线的缓动（sin(t)）
        easeIn: function(t,b,c,d){
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOut: function(t,b,c,d){
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOut: function(t,b,c,d){
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        }
    },
    Expo: {//指数曲线的缓动（2^t）；
        easeIn: function(t,b,c,d){
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOut: function(t,b,c,d){
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {//圆形曲线的缓动（sqrt(1-t^2)）；
        easeIn: function(t,b,c,d){
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        },
        easeOut: function(t,b,c,d){
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        }
    },
    Elastic: {//指数衰减的正弦曲线缓动；
        easeIn: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        easeOut: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
        },
        easeInOut: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        }
    },
    Back: {//超过范围的三次方缓动（(s+1)*t^3 - s*t^2）；
        easeIn: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        easeOut: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeInOut: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        }
    },
    zfBounce: {//指数衰减的反弹缓动。
        easeIn: function(t,b,c,d){
            return c - zhufengEffect.zfBounce.easeOut(d-t, 0, c, d) + b;
        },
        easeOut: function(t,b,c,d){
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        easeInOut: function(t,b,c,d){
            if (t < d/2) return zhufengEffect.zfBounce.easeIn(t*2, 0, c, d) * .5 + b;
            else return zhufengEffect.zfBounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
        }
    }
};


function getCss(ele,attr){
	if(window.getComputedStyle){
		//return parseFloat("a"+getComputedStyle(ele,null)[attr]);
		return parseFloat(getComputedStyle(ele,null)[attr]);
	}else{//专门处理IE的方案
		if(attr=="opacity"){
			//filter:alpha(opacity=10)
			var reg=/alpha\(opacity=(\d+)\)/
			var str=ele.currentStyle.filter;
			if(reg.test(str)){
				RegExp.$1//这就是匹配的正则中的第一个分组的值	
				return RegExp.$1/100;
			}else{
				//如果滤镜样式没有写，或滤镜样式写了但没有opacity的值，则上边的判断为false,则应该把默认值1返回
				return 1;	
			}
			
		}
		return parseFloat(ele.currentStyle[attr]);
	}
}
function setCss(ele,attr,value){
	if(attr=="opacity"){
		ele.style.opacity=value;
		ele.style.filter="alpha(opacity="+value*100+")";
	}else{
		ele.style[attr]=value+"px";
	}
}

//对effect做两种安排：直接用数字来表示常用的动画效果
//0，减速expo，1：匀速linear；2：弹性elatic,3:返回back,4:反弹bounce
//第二种传一个数组，数组的第一个是动画类型，第二项是缓动效果
//['zfBounce','easeInOut']

//effect可以不传，effect这个位置也可以传一个函数，如果是一个函数，则将其做为回调函数来处理


function animate(ele,/* attr,target */oTarget,duration,effect,callback){
	
	//方法名相同，但是方法会根据不同的参数实现不同的功能，这样的编程在其它编程语言里面叫：方法重载。
	//JS不支持重载，但是可以用判断参数类型来实现方法重载
	//方法重载是面向对象的“多态”的一种。面向对象的编程有三大原则：封装、继承、多态（一个方法，多种形态）
	var fnEffect=zhufengEffect.Expo.easeOut;//让这个效果做为默认效果
	
	if(typeof effect == "number"){
		switch(effect){
			case 0:
				break;
			case 1:
				fnEffect=zhufengEffect.zfLinear;
				break;
			case 2:
				fnEffect=zhufengEffect.Elastic.easeOut;
				break;
			case 3:
				fnEffect=zhufengEffect.Back.easeOut;
				break;
			case 4:
				fnEffect=zhufengEffect.zfBounce.easeOut;	
		}
	}else if(effect instanceof Array){
		//fnEffect=zhufengEffect[][]
		if(effect.length==1){
			fnEffect=zhufengEffect.zfLinear;
		}else if(effect.length==2){
			fnEffect=zhufengEffect[effect[0]][effect[1]]
			//zhufengEffect["zfBounce"]["easeOut"];
		}
		
	}else if(typeof effect=="function"){
		callback=effect;
		
	}
	
	
	var oBegin={};//用来各方向开始值
	var oChange={};//用来保存各方向的距离值
	var counter=0;//只是一个标识，或叫一个记数器
	var f=true;
	for(var attr in oTarget){//把各维度的begin和change分解出来
		var target=oTarget[attr];
		begin=getCss(ele,attr);//应该有五个begin
		change=target-begin;//应该有五个change
		
		//分别把每个属性（维度）上的值分别保存在各自对应的对象上
		if(change){//确保change不是0，再保存。就是说：只保存有效的运动维度
			oBegin[attr]=begin;
			oChange[attr]=change;//
			counter++;//如果有有效值，则让记数器累加一次
			f=false;//这样用和counter的技巧一样
		}
	}
	
	if(counter===0)return;//如果没有有效运动距离，则退出此方法。（不必再浪费性能了）
	
	
	var times=0;
	var interval=15;
	window.clearInterval(ele.timer);//清除动画积累的
	
	function step(){
		times+=interval;
		if(times<duration){
			for(var attr in oChange){//把各方向都移动一次
				var begin=oBegin[attr];//对应58行和63，
				var change=oChange[attr];
				var value=fnEffect(times,begin,change,duration);
				setCss(ele,attr,value);			
			}
		}else{
			for(var attr in oTarget){
				var target=oTarget[attr];
				setCss(ele,attr,target);//最后的校正
				
			}
			window.clearInterval(ele.timer);
			ele.timer=null;
			if(typeof callback=="function"){
				callback.call(ele);	
			}	
		}
	}
	ele.timer=window.setInterval(step,interval);
}