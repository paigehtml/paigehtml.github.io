addEventListener("resize", (event) => {});


var mainBlock=document.getElementById("spinnyDiv");
var gifBlock=document.getElementById("contactGif");
const src = document.getElementById("source");
let clientX;
let clientY;

const SMALL_SIZE = 769;
const defaultSpinniness = -22; // the closer to 0 the more spinny it is
const smallSpinniness = -9; // the closer to 0 the more spinny it is

let gState = {
    currSpinniness: defaultSpinniness
};


function getRotateStr(xPos) {
    return "rotate3d(60, 180, -6, "+ ( ( xPos ) / gState.currSpinniness) +"deg)" // regular
    // return "rotate3d(30, -180, -6, "+ (xPos/-20) +"deg)"; // popping out at you
    // return "rotate3d(30, 180, -6, "+ ( xPos-50 / -20) +"deg)" // insane spinning
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
    mainBlock.style.webkitTransform= mainBlock.style.transform=getRotateStr(e.pageX);
    gifBlock.style.webkitTransform= mainBlock.style.transform=getRotateStr(e.pageX);
};

window.addEventListener("touchmove", e => {
    currElementTag = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY).tagName;
    if (currElementTag !== "A") {
        e.preventDefault();
        e.stopImmediatePropagation();
    }
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
    setSpinniness();
}

init();