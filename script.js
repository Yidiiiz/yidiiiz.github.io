var navOpen = false;
var sideOpen = true;

const pages = ["Home", "Roblox", "Unity", "Modeling", "Skills"];
var pageIndex = 0;

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
        document.getElementById("mainPanel").style.left = "300px";
        
        document.getElementById("hideBtn").style.left = "-24px";
        
        setTimeout(() => {
            document.getElementById("hideImg").src = "assets/website/Hide.png";
            document.getElementById("hideBtn").style.left = "324px";
        }, 200);
    } else {
        document.getElementById("sidePanel").style.left = "-300px";
        document.getElementById("mainPanel").style.left = "0";

        document.getElementById("hideBtn").style.left = "-24px";
        
        setTimeout(() => {
            document.getElementById("hideImg").src = "assets/website/Show.png";
            document.getElementById("hideBtn").style.left = "24px";
        }, 400);
    }
}

function togglePage(page) {
    
}



// function scrolled() {
//     console.log('AAAAAAAAA');

//     const { innerHeight, scrollY } = window;
//     const { scrollHeight } = document.body;

//     if (innerHeight + scrollY >= scrollHeight) {
//         // User has reached the bottom of the page
//         console.log('Reached the end of the page!');
//         // Place your code here to execute when the user hits the bottom
//     }

    
// }

// document.getElementById("mainPanel")?.addEventListener('scroll', scrolled);






// const divElement = document.getElementById("mainPanel");

// let lastScrollTop = 0;
// let isAtEnd = false;
// divElement.onscroll = (e)=>{
//     console.log("AAAAAA");
//     if (divElement.scrollTop < lastScrollTop){
//         // upscroll 
//         return;
//     } 
//     lastScrollTop = divElement.scrollTop <= 0 ? 0 : divElement.scrollTop;
//     if (divElement.scrollTop + divElement.offsetHeight >= divElement.scrollHeight + 1 ){
//         console.log("End");
//     }
// }

// window.addEventListener("wheel", function(event) {
//     const delta = event.deltaY;
  
//     if (delta > 0) {
//       // Scrolled down
//       console.log("Scrolled down");
//     } else if (delta < 0) {
//       // Scrolled up
//       console.log("Scrolled up");
//     }
//   });

// window.addEventListener('scroll', () => {
//     console.log("BBBBB");

//     const { innerHeight, scrollY } = divElement;
//     const { scrollHeight } = divElement.body;

//     if (innerHeight + scrollY >= scrollHeight) {
//         if (!endOfScroll) {
//             console.log('Reached the end of the page for the first time!');
//             endOfScroll = true;
//         } else {
//             console.log('Still scrolling at the bottom');
//         }
//     } else {
//         endOfScroll = false; // Reset the flag if the user scrolls back up
//     }
// });