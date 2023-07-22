addEventListener("resize", (event) => {});


var mainBlock=document.getElementById("spinnyDiv");
var gifBlock=document.getElementById("contactGif");
const src = document.getElementById("source");
let clientX;
let clientY;

const SMALL_SIZE = 769;
const defaultSpinniness = -22; // the closer to 0 the more spinny it is
const smallSpinniness = -13; // the closer to 0 the more spinny it is

let g_state = {
    isTouchScreen: false
}

let gState = {
    currSpinniness: defaultSpinniness
};

function getRotateStr(xPos) {
    return "rotate3d(60, 180, -6, "+ ( ( xPos ) / gState.currSpinniness) +"deg)" // regular
}

function setSpinniness() {
    if (window.innerWidth <= 769) {
        gState.currSpinniness = smallSpinniness;
    } else {
        gState.currSpinniness = defaultSpinniness;
    }    
}

onresize = () => {
    setSpinniness();
};

document.documentElement.onmousemove=function(e){
    if (!g_state.isTouchScreen) {
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
    g_state.isTouchScreen = ("ontouchstart" in document.documentElement);
    setSpinniness();
}

init();