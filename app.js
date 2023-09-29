addEventListener("resize", (event) => {});

var mainBlock=document.getElementById("spinnyDiv");
var gifBlock=document.getElementById("contactGif");
const src = document.getElementById("source");
let clientX;
let clientY;

const SMALL_SIZE = 769;
const defaultSpinniness = -22; // the closer to 0 the more spinny it is
const smallSpinniness = -10; // the closer to 0 the more spinny it is


let gState = {
    isTouchScreen: false,
    currSpinniness: defaultSpinniness,
    width: window.innerWidth
};

function getRotateStr(xPos) {
    let zeroCentered = xPos - (gState.width / 2.0);
    let isLeft = 1;
    if (zeroCentered < 0) {
        isLeft = -1;
    }
    return "rotate3d(" + 60 * isLeft +  ", 120, " + -6 +  ", "+ ( ( zeroCentered ) / gState.currSpinniness) +"deg)" // regular
    // return "rotate3d(" + 60 * isLeft +  ", 120, " + -6 * isLeft +  ", "+ ( ( isLeft * zeroCentered ) / gState.currSpinniness) +"deg)" // also fun
}

function setSpinniness() {
    if (gState.width <= 769) {
        gState.currSpinniness = smallSpinniness;
    } else {
        gState.currSpinniness = defaultSpinniness;
    }    
}

onresize = () => {
    gState.width = window.innerWidth;
    setSpinniness();
};

document.documentElement.onmousemove=function(e){
    if (!gState.isTouchScreen) {
        mainBlock.style.webkitTransform= mainBlock.style.transform=getRotateStr(e.pageX);
        gifBlock.style.webkitTransform= mainBlock.style.transform=getRotateStr(e.pageX);
    }
};

window.addEventListener("touchmove", e => {
    e.preventDefault();
    e.stopImmediatePropagation();
    mainBlock.style.webkitTransform=getRotateStr(e.changedTouches[0].clientX);
    gifBlock.style.webkitTransform=getRotateStr(e.changedTouches[0].clientX);
  }, { passive: false });

document.documentElement.ondragstart=function(e){
    console.log("ondragstart move");
};

document.documentElement.ondrag=function(e){
    console.log("ondrag move");
};

function setDepths() {
    let i = 5;
    $(".contentLink").each(function(index, element) {
        i += 1;
        $(this).css("transform", "translateZ(" + 30*i + "px)"); 
        $(this).css("-webkit-transform", "translateZ(" + 30*i + "px)"); 
    });
}



function init() {
    // setDepths(); // uncomment this line (removing // at the start)
    gState.isTouchScreen = ("ontouchstart" in document.documentElement);
    setSpinniness();
}

init();