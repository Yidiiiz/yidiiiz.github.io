var navOpen = false;
var sideOpen = true;

function toggleNav() {
    navOpen = !navOpen;
    if (navOpen){
        document.getElementById("infoPanel").style.left = "0%";
        document.getElementById("scrollPanel").style.left = "-300px";
    } else {
        document.getElementById("scrollPanel").style.left = "0%";
        document.getElementById("infoPanel").style.left = "-300px";
    }
}

function toggleSide() {
    sideOpen = !sideOpen;

    if (sideOpen) {
        document.getElementById("sidePanel").style.left = "0";
        document.getElementById("mainPanel").style.left = "300px";
        
        document.getElementById("hideBtn").style.left = "-30px";
        
        setTimeout(() => {
            document.getElementById("hideImg").src = "assets/website/Hide.png";
            document.getElementById("hideBtn").style.left = "24px";
        }, 600);
    } else {
        document.getElementById("sidePanel").style.left = "-300px";
        document.getElementById("mainPanel").style.left = "0";

        document.getElementById("hideBtn").style.left = "-24px";
        
        setTimeout(() => {
            document.getElementById("hideImg").src = "assets/website/Show.png";
            document.getElementById("hideBtn").style.left = "24px";
        }, 600);
    }
}