var navOpen = false;
var sideOpen = true;

const pages = ["Home", "Unity", "Roblox", "Modeling"];
const divs = [document.getElementById("homePanel"), document.getElementById("robloxPanel")];
var pageIndex = 0;

let currentPanel = document.getElementById("homePanel");

let isAtTop = true;
let isAtBottom = false;
let pageChanging = false;

function toggleNav() {
    navOpen = !navOpen;

    if (navOpen){
        document.getElementById("scrollPanel").style.left = "0%";
        document.getElementById("infoPanel").style.left = "-300px";
    } else {
        document.getElementById("infoPanel").style.left = "0%";
        document.getElementById("scrollPanel").style.left = "-300px";
    }
}

function toggleSide() {
    sideOpen = !sideOpen;

    if (sideOpen) {
        document.getElementById("sidePanel").style.left = "0";
        // currentPanel.style.left = "300px";
        for (let i = 0; i < divs.length; i++) {
            divs[i].style.left = "300px";
        }
        
        document.getElementById("hideBtn").style.left = "-24px";
        
        setTimeout(() => {
            document.getElementById("hideImg").src = "assets/website/Hide.png";
            document.getElementById("hideBtn").style.left = "324px";
        }, 200);
    } else {
        document.getElementById("sidePanel").style.left = "-300px";
        // currentPanel.style.left = "0";
        for (let i = 0; i < divs.length; i++) {
            divs[i].style.left = "0";
        }

        document.getElementById("hideBtn").style.left = "-24px";
        
        setTimeout(() => {
            document.getElementById("hideImg").src = "assets/website/Show.png";
            document.getElementById("hideBtn").style.left = "24px";
        }, 400);
    }
}

function togglePage(newIndex) {
    if (newIndex < 0 || newIndex > pages.length) {
        pageChanging = false;
        return;
    }
    console.log(newIndex);


    if (newIndex > pageIndex) {
        divs[pageIndex].style.top = "-100%";
        divs[newIndex].style.top = "0";

        isAtTop = true;
        isAtBottom = false;

        // currentPanel.scrollTop = currentPanel.scrollHeight + 100;
        // divs[newIndex].scrollTop = 0;
    } else if (newIndex < pageIndex) {
        divs[pageIndex].style.top = "100%";
        divs[newIndex].style.top = "0%";

        isAtTop = false;
        isAtBottom = true;

        // currentPanel.scrollTop = 0;
        // divs[newIndex].scrollTop = currentPanel.scrollHeight + 100;
    } else {
        pageChanging = false;
        return;
    }
    currentPanel.scrollTop = 0;
    divs[newIndex].scrollTop = 0;
    
    pageIndex = newIndex;
    currentPanel.removeEventListener('click', checkPosition);

    currentPanel = divs[newIndex];
    currentPanel.addEventListener('scroll', checkPosition);
    checkPosition();

    pageChanging = false;
}



function checkPosition() {
    if (currentPanel.scrollTop < 1){
        isAtTop = true;
    } else {
        isAtTop = false;
    }

    if (currentPanel.scrollTop + currentPanel.offsetHeight > currentPanel.scrollHeight - 1){
        isAtBottom = true;
    } else {
        isAtBottom = false;
    }
}

window.addEventListener("wheel", function(event) {
    const delta = event.deltaY;
  
    if (!pageChanging && delta < 0 && isAtTop) {
        pageChanging = true;
        togglePage(pageIndex - 1);
    } else if (!pageChanging && delta > 0 && isAtBottom) {
        pageChanging = true;
        togglePage(pageIndex + 1);
    }
});

// document.getElementById('gravitateFrame').scrollTo("100px");

currentPanel.addEventListener('scroll', checkPosition);