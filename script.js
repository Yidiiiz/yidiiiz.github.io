var navOpen = false;
var sideOpen = true;

const pages = ["Home", "Roblox", "Unity", "Modeling", "Skills"];
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
        currentPanel.style.left = "300px";
        
        document.getElementById("hideBtn").style.left = "-24px";
        
        setTimeout(() => {
            document.getElementById("hideImg").src = "assets/website/Hide.png";
            document.getElementById("hideBtn").style.left = "324px";
        }, 200);
    } else {
        document.getElementById("sidePanel").style.left = "-300px";
        currentPanel.style.left = "0";

        document.getElementById("hideBtn").style.left = "-24px";
        
        setTimeout(() => {
            document.getElementById("hideImg").src = "assets/website/Show.png";
            document.getElementById("hideBtn").style.left = "24px";
        }, 400);
    }
}

function togglePage(newIndex) {
    if (newIndex < 0 || newIndex > pages.length) {
        return;
    }

    if (newIndex > pageIndex) {
        divs[pageIndex].style.top = "-100%";
        divs[newIndex].style.top = "0";
        let isAtTop = true;
        let isAtBottom = false;
    } else if (newIndex < pageIndex) {
        divs[pageIndex].style.top = "0";
        divs[newIndex].style.top = "100%";
        let isAtTop = false;
        let isAtBottom = true;
    } else {
        return;
    }
    

    pageIndex = newIndex;
    currentPanel = divs[newIndex];
    
    currentPanel.onscroll = (e)=>{
        console.log(currentPanel.scrollTop);
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

    setTimeout(() => {
        pageChanging = false;
    }, 500);
}



currentPanel.onscroll = (e)=>{
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
    }

    if (!pageChanging && delta > 0 && isAtBottom) {
        pageChanging = true;
        togglePage(pageIndex + 1);
    }
});