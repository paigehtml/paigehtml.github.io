addEventListener("resize", (event) => {});

// Get the root element
const root = document.documentElement; 

// Get computed styles for the root element
const rootStyles = getComputedStyle(root); 

const c_COLOR_PAIRS = [
    {"color": rootStyles.getPropertyValue('--rotating_color_0'), "hoverColor": "#38c722"},
    {"color": rootStyles.getPropertyValue('--rotating_color_1'), "hoverColor": "#38c722"},
    {"color": rootStyles.getPropertyValue('--rotating_color_2'), "hoverColor": "#38c722"},
    {"color": rootStyles.getPropertyValue('--rotating_color_3'), "hoverColor": "#38c722"},
    {"color": rootStyles.getPropertyValue('--rotating_color_4'), "hoverColor": "#38c722"},
];

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


function setDepths() {
    let i = 5;
    $(".contentLink").each(function(index, element) {
        i += 1;
        $(this).css("transform", "translateZ(" + 30*i + "px)"); 
        $(this).css("-webkit-transform", "translateZ(" + 30*i + "px)"); 
    });
}


function setColors() {
    $(".paragraphLink").each(function(index, element) {
        color_index = index % c_COLOR_PAIRS.length
        const colorPair = c_COLOR_PAIRS[color_index];
        $(this)
        .css("color", colorPair.color) // Set the default color
        .hover(
          function () {
            // Mouse enter
            $(this).css("color", colorPair.hoverColor);
          },
          function () {
            // Mouse leave
            $(this).css("color", colorPair.color);
          }
        );        
      });  
}

function setVisiteds() {
    $(".allPageLink").each(function(index, element) {
        color_index = index % c_COLOR_PAIRS.length
        const colorPair = c_COLOR_PAIRS[color_index];
        $(this).addClass("randVisited" + color_index);
        $(this)
        .click(
          function () {
            // Mouse enter
            $(this).css("color", colorPair.color);
          }
        );           
      });
}

function init() {
    // setDepths(); // uncomment this line (removing // at the start)
    gState.isTouchScreen = ("ontouchstart" in document.documentElement);
    setSpinniness();
    setColors();
    setVisiteds();
}

init();