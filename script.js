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
    // Mobile navigation added: fullscreen panels use percentage positions in CSS.
    if (mobileLayout.matches) {
        updateMobileSide();
        return;
    }
    // End mobile navigation.
    document.getElementById("scrollPanel").style.left = navOpen ? "0" : "-300px";
    document.getElementById("infoPanel").style.left = navOpen ? "-300px" : "0";
}

function toggleSide() {
    sideOpen = !sideOpen;
    // Mobile navigation added: overlay the page instead of pushing it sideways.
    if (mobileLayout.matches) {
        updateMobileSide();
        return;
    }
    // End mobile navigation.
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
    
    isAtTop = true;
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

    // Navigation theme update: keep the page list and mobile Menu button in sync.
    document.getElementById("scrollPanel").classList.replace("primary" + (pageIndex+1), "primary" + (newIndex+1));
    document.getElementById("hideBtn").classList.replace("primary" + (pageIndex+1), "primary" + (newIndex+1));
    // End navigation theme update.

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

    // keepScrolling.opacity = isAtTop ? "1" : "0";
    // keepScrolling.opacity = isAtTop && pageIndex != 0 ? "1" : "0";
    // stillScrolling.opacity = isAtBottom && pageIndex != pages.length-1 ? "1" : "0";
    // stillScrolling.opacity = isAtBottom && pageIndex != 0 && pageIndex != pages.length-1 ? "1" : "0";
    // upScrolling.opacity = isAtTop && pageIndex != 0 ? "1" : "0";

    // Clickable scroll update: hidden prompts cannot intercept taps or keyboard focus.
    const canScroll = !(mobileLayout.matches && sideOpen);
    const prompts = ["keepScrolling", "stillScrolling", "upScrolling"];
    const visible = [isAtTop && !isAtBottom, isAtBottom && pageIndex < pages.length-1, isAtTop && pageIndex > 0];
    for (let i = 0; i < prompts.length; i++) {
        const button = document.getElementById(prompts[i]);
        const show = canScroll && visible[i];
        button.style.opacity = show ? "1" : "0";
        button.style.visibility = show ? "visible" : "hidden";
        button.disabled = !show;
    }
    // End clickable scroll update.
}

/* Clickable scroll update: touch and keyboard backup for wheel navigation. */
function scrollFromPrompt(direction) {
    if (pageChanging || (mobileLayout.matches && sideOpen)) {
        return;
    }
    if (direction == 0) {
        currentPanel.scrollBy({ top: currentPanel.clientHeight, behavior: "smooth" });
    } else {
        togglePage(pageIndex + direction);
    }
}
/* End clickable scroll update. */

let scrollEnd = true;
async function onWheel(event) {
    // Clickable scroll update: prompts now work with touch, so wheel detection is unnecessary.
    // if (event.deltaY != 0) {
    //     document.getElementById("back").classList.add("wheelNavigation");
    // }
    if (mobileLayout.matches && sideOpen) {
        return;
    }
    // End mobile navigation.
    const delta = event.deltaY;

    if (scrollEnd && !pageChanging && delta < 0 && isAtTop) {
        togglePage(pageIndex - 1);
    } else if (scrollEnd && !pageChanging && delta > 0 && isAtBottom) {
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

// Previous mobile startup (kept for reference).
// Give the resume the full screen on smaller devices.
// if (window.matchMedia("(max-width: 700px)").matches) {
//     toggleSide();
// }

/* Mobile navigation added: fullscreen welcome panel and tap-to-enter behavior. */
// Narrow views and touch-first phones/tablets, including landscape orientation.
const mobileLayout = window.matchMedia("(max-width: 700px), (hover: none) and (pointer: coarse)");
let desktopSideOpen = sideOpen;
const sidePanel = document.getElementById("sidePanel");
const hideBtn = document.getElementById("hideBtn");

function updateMobileSide() {
    const mobile = mobileLayout.matches;
    const back = document.getElementById("back");
    back.classList.toggle("mobileSideClosed", mobile && !sideOpen);
    back.classList.toggle("mobileNavOpen", mobile && navOpen);

    // Navigation theme update: apply the current page color only to the mobile Menu button.
    for (let i = 0; i < pages.length; i++) {
        hideBtn.classList.toggle("primary" + (i+1), mobile && i == pageIndex);
    }
    // End navigation theme update.

    if (mobile && !sideOpen) {
        hideBtn.focus({ preventScroll: true });
    }
    document.getElementById("infoPanel").inert = mobile && (!sideOpen || navOpen);
    document.getElementById("scrollPanel").inert = mobile && (!sideOpen || !navOpen);
    for (let i = 0; i < divs.length; i++) {
        divs[i].inert = mobile && sideOpen;
    }

    document.querySelectorAll("#menu a").forEach(link => {
        if (mobile) {
            link.setAttribute("tabindex", "0");
            link.setAttribute("role", "button");
        } else {
            link.removeAttribute("tabindex");
            link.removeAttribute("role");
        }
    });

    // Clickable scroll update: disable the prompts while the mobile sidebar is open.
    checkPosition();
}

sidePanel.addEventListener("click", function(event) {
    if (!mobileLayout.matches || !sideOpen) {
        return;
    }
    // Keep the top menu control and social links independent from entering a page.
    if (event.target.closest(".closeBtn, a[href], button")) {
        return;
    }
    toggleSide();
});

document.querySelectorAll(".mobileEnter").forEach(button => {
    button.addEventListener("click", function() {
        if (mobileLayout.matches && sideOpen) {
            toggleSide();
        }
    });
});

document.getElementById("menu").addEventListener("keydown", function(event) {
    if (mobileLayout.matches && event.target.closest("a") && (event.key == "Enter" || event.key == " ")) {
        event.preventDefault();
        event.target.click();
    }
});

mobileLayout.addEventListener("change", function() {
    if (mobileLayout.matches) {
        desktopSideOpen = sideOpen;
        sideOpen = true;
    } else {
        sideOpen = desktopSideOpen;
    }
    toggleNav(false);
    updateMobileSide();
});

updateMobileSide();
/* End mobile navigation additions. */

checkPosition();
