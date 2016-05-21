

var main=document.getElementById("main");
var oUl=document.getElementById("list");
var oLis=oUl.getElementsByTagName("li");
//console.log(oUl);
//console.log(oLis);
var winW=document.documentElement.clientWidth;
var winH=document.documentElement.clientHeight;
var desW=1080;
var desH=1920;
//console.log(winW);
if (desH/desW>=winH/winW){
    main.style.webkitTransform="scale("+winW/desW+")";
}else{
    main.style.webkitTransform="scale("+winH/desH+")";
}

for (var i=0;i<oLis.length;i++){
    var curLi=oLis[i];
    curLi.curIndex=i;



    curLi.addEventListener("touchstart",start,false);
    curLi.addEventListener("touchmove",move,false);
    curLi.addEventListener("touchend",end,false);
}

function start(e){
    var touch= e.changedTouches[0];
    //console.log(touch);
    this.startY=touch.pageY;
}

function move(e){
    this.flag=true;

    var siblings=utils.siblings(curLi);
    //console.log(siblings);

    //console.log(this);
    for (var k=0;k<siblings.length;k++){
        siblings[k].style.display="none";
    }
    this.style.display="block";

    var touch= e.changedTouches[0];
    //console.log(touch);
    this.nowY= touch.pageY;
    this.changedY=this.nowY-this.startY;
    //console.log(this.changedY);

    var curIndex=this.curIndex;
    //var sibIndex=0;
    var step=1/4;
    if (this.changedY>0){//dowm
        this.sibIndex=curIndex===0?(oLis.length-1):(curIndex-1);
        //console.log(this.curIndex);
        var distance=this.changedY-winH*0.75;
        //console.log(distance);
    }else{//up
        this.sibIndex=curIndex===(oLis.length-1)?0:(curIndex+1);
        var distance=this.changedY+winH*0.75;
        //console.log(distance);
    }

    var sib=oLis[this.sibIndex];
    //console.log(this.sibIndex);
    //console.log(sib);
    sib.style.display="block";
    sib.className="zIndex";
    //utils.addClass(sib,"zIndex");
    //console.log(sib.className);
    sib.style.webkitTransform="translateY("+distance+"px)";
    this.style.webkitTransform="translateY("+this.changedY*step+"px) scale("+(1-Math.abs(this.changedY)*step/winH)+")";

}

function end(e){
    var sib=oLis[this.sibIndex];
    if (this.flag){
        this.style.display="none";
        utils.removeClass(sib,"zIndex");
        this.style.webkitTransform="translate(0,0)";
        this.style.webkitTransition="0.3s";
        sib.style.webkitTransform="translate(0,0)";
        sib.style.webkitTransition="0.3s";
        sib.addEventListener("webkitTransitionEnd",function(){
            this.style.webkitTransition = "";
        });
        console.log("ok");

    }
    this.flag=false;

}


