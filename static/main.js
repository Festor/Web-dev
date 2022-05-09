





















// navtogglesr suggest show/hide
function togglerShow() {
    let buttonValue = document.getElementById("navbarNav").classList.contains("show");
    let link = document.getElementsByClassName("nav-link");
    if (!buttonValue) {
        document.getElementById("navbarNav").classList.add("show")
        // link[0].classList.add("border-bottom");
        // link[1].classList.add("border-bottom");
        // link[2].classList.add("border-bottom");
        // link[3].classList.add("border-bottom");
    }
    else {
        document.getElementById("navbarNav").classList.remove("show");
        // link[0].classList.remove("border-bottom");
        // link[1].classList.remove("border-bottom");
        // link[2].classList.remove("border-bottom");
        // link[3].classList.remove("border-bottom");
    }
}




// navbar suggest hide
function navHide(){
    document.getElementById("navbarNav").classList.remove("show");
}


// onload
window.onload = function () {
    // navbar-show
    document.querySelector('.navbar-toggler').onclick = togglerShow;
    document.querySelector('.navbar-nav').onclick = navHide;
 
    // 

}