var navOpen = false;
var sideOpen = true;

const pages = [
    "Home", 
    "Gravitate", 
    "Roblox", 
    "Modeling",
    "Photography"
];

const divs = [
    document.getElementById("homePanel"), 
    document.getElementById("gravitatePanel"), 
    document.getElementById("robloxPanel"), 
    document.getElementById("modelingPanel"),
    document.getElementById("photographyPanel")
];
const keepScrolling = document.getElementById("keepScrolling").style;
const stillScrolling = document.getElementById("stillScrolling").style;
const upScrolling = document.getElementById("upScrolling").style;

let pageIndex = 0;
let currentPanel = document.getElementById("homePanel");

let isAtTop = true;
let isAtBottom = false;
let pageChanging = false;

let rblxIndex = 0;
let rblxImgIndex = 0;


const rblxGames = [
    "squish", 
    "fluid"
];

const rblxImgs = [
    2, 
    1
];


const nextImgRoblox = document.getElementById("nextImgRoblox");
const currImgRoblox = document.getElementById("currImgRoblox");
const scrollLeft = document.getElementById("scrollLeft");
const scrollRight = document.getElementById("scrollRight");

function toggleTransition(div, toggle) {
    if (toggle) {
        void div.offsetWidth;
        div.style.transition = "";
    } else {
        div.style.transition = "none";
    }
}

function scrollImgRblx(isRight) {
    if ((!isRight && rblxImgIndex == 0) || (isRight && rblxImgIndex == rblxImgs[rblxIndex] - 1)) {
        return;
    }

    rblxImgIndex += isRight ? 1 : -1;
    rblxImgIndex = rblxImgIndex < 0 ? 0 : rblxImgIndex > rblxImgs[rblxIndex] ? rblxImgs[rblxIndex] : rblxImgIndex;

    toggleTransition(nextImgRoblox, false);
    nextImgRoblox.src = "assets/pages/roblox/" + rblxGames[rblxIndex] + "/" + rblxImgIndex + ".png";
    nextImgRoblox.style.left = isRight ? "150%" : "50%";
    toggleTransition(nextImgRoblox, true);

    nextImgRoblox.style.left = isRight ? "50%" : "150%";

    scrollLeft.style.opacity = rblxImgIndex == 0 ? 0 : .3;
    scrollRight.style.opacity = rblxImgIndex == rblxImgs[rblxIndex] - 1 ? 0 : .3;

    setTimeout(() => {
        toggleTransition(currImgRoblox, false);
        currImgRoblox.src = "assets/pages/roblox/" + rblxGames[rblxIndex] + "/" + rblxImgIndex + ".png";
        currImgRoblox.style.left = "50%";
        toggleTransition(currImgRoblox, true);
    }, 500);
}

function toggleNav(isTrue) {
    navOpen = isTrue != null ? isTrue : !navOpen;
    document.getElementById("scrollPanel").style.left = navOpen ? "0" : "-300px";
    document.getElementById("infoPanel").style.left = navOpen ? "-300px" : "0";
}

function toggleSide() {
    sideOpen = !sideOpen;
    const inPos = sideOpen ? "324px" : "24px";
    const src = "assets/website/icons/" + (sideOpen ? "Left" : "Right") + ".png";
    const delay = sideOpen ? 200 : 400;

    document.getElementById("sidePanel").style.left = sideOpen ? "0" : "-300px";
    const divPos = sideOpen ? "300px" : "0";
    for (let i = 0; i < divs.length; i++) {
        divs[i].style.left = divPos;
    }

    document.getElementById("hideBtn").style.left = "-24px";

    document.getElementById("keepScrolling").style.left = inPos;
    document.getElementById("stillScrolling").style.left = inPos;
    
    setTimeout(() => {
        document.getElementById("hideImg").src = src;
        document.getElementById("hideBtn").style.left = inPos;
    }, delay);
}


async function togglePage(newIndex) {
    if (newIndex < 0 || newIndex > pages.length - 1 || newIndex == pageIndex) {
        return;
    }

    pageChanging = true;
    
    const newDiv = divs[newIndex];
    const oldDiv = currentPanel;

    oldDiv.removeEventListener("scroll", onScroll, { passive: true });
    newDiv.addEventListener("scroll", onScroll, { passive: true });

    toggleTransition(newDiv, false);
    newDiv.scrollTop = 0;
    newDiv.style.top = newIndex > pageIndex ? "100%" : "-100%";
    toggleTransition(newDiv, true);

    oldDiv.style.top = newIndex > pageIndex ? "-100%" : "100%";
    newDiv.style.top = "0%";

    isAtTop = true;
    isAtBottom = false;
    
    document.getElementById(pages[pageIndex]).classList.remove("active");
    document.getElementById(pages[newIndex]).classList.add("active");

    document.getElementById("back").classList.replace("secondary" + (pageIndex+1), "secondary" + (newIndex+1));
    document.getElementById("infoPanel").classList.replace("primary" + (pageIndex+1), "primary" + (newIndex+1));

    pageIndex = newIndex;
    currentPanel = newDiv;
    
    checkPosition();
    // toggleNav(false);

    setTimeout(() => {
        toggleTransition(oldDiv, false);
        oldDiv.scrollTop = 0;
        toggleTransition(oldDiv, true);

        pageChanging = false;
    }, 500);
    
}




function checkPosition() {
    isAtTop = currentPanel.scrollTop < 1;
    isAtBottom = currentPanel.scrollTop + currentPanel.offsetHeight >= currentPanel.scrollHeight - 1;

    keepScrolling.opacity = isAtTop ? "1" : "0";
    stillScrolling.opacity = isAtBottom && pageIndex != pages.length-1 ? "1" : "0";
    upScrolling.opacity = isAtTop && pageIndex != 0 ? "1" : "0";
}

let scrollEnd = true;
async function onWheel(event) {
    const delta = event.deltaY;

    if (scrollEnd && !pageChanging && delta < 0 && isAtTop) {
        isAtTop = true;
        togglePage(pageIndex - 1);
    } else if (scrollEnd && !pageChanging && delta > 0 && isAtBottom) {
        isAtTop = true;
        togglePage(pageIndex + 1);
    }
}

let scrollTimeout;
async function onScroll() {
    clearTimeout(scrollTimeout);
    scrollEnd = false;
    checkPosition();

    scrollTimeout = setTimeout(function() {
        scrollEnd = true;
    }, 300);
}


document.getElementById("container").addEventListener('wheel', onWheel, { passive: true });
currentPanel.addEventListener("scroll", onScroll, { passive: true });
