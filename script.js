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

var pageIndex = 0;

let currentPanel = document.getElementById("homePanel");

let isAtTop = true;
let isAtBottom = false;
let pageChanging = false;
let scrollEnd = true;

const rblxGames = [
    "squish", 
    "fluid"
];

const rblxImgs = [
    2, 
    1
];

let rblxIndex = 0;
let rblxImgIndex = 0;

function scrollImgRblx(isRight) {
    if ((!isRight && rblxImgIndex == 0) || (isRight && rblxImgIndex == rblxImgs[rblxIndex] - 1)) {
        return;
    }

    rblxImgIndex += isRight ? 1 : -1;
    rblxImgIndex = rblxImgIndex < 0 ? 0 : rblxImgIndex > rblxImgs[rblxIndex] ? rblxImgs[rblxIndex] : rblxImgIndex;

    document.getElementById("nextImgRoblox").style.transition = "none";

    document.getElementById("nextImgRoblox").src = "assets/pages/roblox/" + rblxGames[rblxIndex] + "/" + rblxImgIndex + ".png";
    document.getElementById("nextImgRoblox").style.left = isRight ? "150%" : "-50%";

    document.getElementById("nextImgRoblox").offsetWidth;
    document.getElementById("nextImgRoblox").style.transition = "";

    document.getElementById("nextImgRoblox").style.left = "50%";
    document.getElementById("currImgRoblox").style.left = isRight ? "-50%" : "150%";

    if (rblxImgIndex == 0) {
        document.getElementById("scrollLeft").style.opacity = 0;
    } else {
        document.getElementById("scrollLeft").style.opacity = .3;
    }

    if (rblxImgIndex == rblxImgs[rblxIndex] - 1) {
        document.getElementById("scrollRight").style.opacity = 0;
    } else {
        document.getElementById("scrollRight").style.opacity = .3;
    }

    setTimeout(() => {
        document.getElementById("currImgRoblox").style.transition = "none";

        document.getElementById("currImgRoblox").src = "assets/pages/roblox/" + rblxGames[rblxIndex] + "/" + rblxImgIndex + ".png";
        document.getElementById("currImgRoblox").style.left = "50%";

        document.getElementById("currImgRoblox").offsetWidth;
        document.getElementById("currImgRoblox").style.transition = "";
    }, 500);
}

function toggleNav(isTrue) {
    navOpen = isTrue != null ? isTrue : !navOpen;

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

        for (let i = 0; i < divs.length; i++) {
            divs[i].style.left = "300px";
        }
        
        document.getElementById("hideBtn").style.left = "-24px";
        document.getElementById("keepScrolling").style.left = "324px";
        document.getElementById("stillScrolling").style.left = "324px";
        
        setTimeout(() => {
            document.getElementById("hideImg").src = "assets/website/icons/Left.png";
            document.getElementById("hideBtn").style.left = "324px";
        }, 200);
    } else {
        document.getElementById("sidePanel").style.left = "-300px";

        for (let i = 0; i < divs.length; i++) {
            divs[i].style.left = "0";
        }

        document.getElementById("hideBtn").style.left = "-24px";
        document.getElementById("keepScrolling").style.left = "24px";
        document.getElementById("stillScrolling").style.left = "24px";
        
        setTimeout(() => {
            document.getElementById("hideImg").src = "assets/website/icons/Right.png";
            document.getElementById("hideBtn").style.left = "24px";
        }, 400);
    }
}

function togglePage(newIndex) {
    if (newIndex < 0 || newIndex > pages.length - 1 || newIndex == pageIndex) {
        pageChanging = false;
        return;
    }

    divs[pageIndex].style.transition = "none";
    divs[newIndex].style.transition = "none";
    divs[newIndex].scrollTop = 0;
    divs[newIndex].style.top = newIndex > pageIndex ? "100%" : "-100%";

    void divs[pageIndex].offsetWidth;
    void divs[newIndex].offsetWidth;
    divs[pageIndex].style.transition = "";
    divs[newIndex].style.transition = "";

    divs[pageIndex].style.top = newIndex > pageIndex ? "-100%" : "100%";
    divs[newIndex].style.top = "0%";

    isAtTop = true;
    isAtBottom = false;
    
    document.getElementById(pages[pageIndex]).classList.remove("active");
    document.getElementById(pages[newIndex]).classList.add("active");

    divs[pageIndex].removeEventListener("wheel", scrolled);
    divs[pageIndex].removeEventListener('scrollend', scrollEnded);

    divs[newIndex].addEventListener("wheel", scrolled);
    divs[newIndex].addEventListener('scrollend', scrollEnded);

    document.getElementById("back").classList.replace("secondary" + (pageIndex+1), "secondary" + (newIndex+1));

    document.getElementById("infoPanel").classList.replace("primary" + (pageIndex+1), "primary" + (newIndex+1));

    pageIndex = newIndex;
    currentPanel = divs[newIndex];

    // toggleNav(false);

    checkPosition();

    scrollEnd = true;
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

    document.getElementById("keepScrolling").style.opacity = isAtTop ? "1" : "0";
    document.getElementById("stillScrolling").style.opacity = isAtBottom && pageIndex != pages.length-1 ? "1" : "0";
    document.getElementById("upScrolling").style.opacity = isAtTop && pageIndex != 0 ? "1" : "0";
}


function scrolled(event) {
    checkPosition();

    const delta = event.deltaY;
    if (!pageChanging && scrollEnd && delta < 0 && isAtTop) {
        pageChanging = true;
        togglePage(pageIndex - 1);
        scrollEnd = false;
    } else if (!pageChanging && scrollEnd && delta > 0 && isAtBottom) {
        pageChanging = true;
        togglePage(pageIndex + 1);
        scrollEnd = true;
    } else {
        scrollEnd = false;
    }
}

function scrollEnded() {
    checkPosition();
    scrollEnd = true;
}

currentPanel.addEventListener("wheel", scrolled);
currentPanel.addEventListener('scrollend', scrollEnded);