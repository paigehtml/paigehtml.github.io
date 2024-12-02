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
    setVisiteds();
}

init();