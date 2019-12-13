function pageLoad() {
    window.setInterval(tick, 1000);
}

function tick() {
    let prevPageElement = document.getElementById("prev-page");
    if (prevPageElement !== null) {        
        prevPageElement.removeEventListener("click", goToPrevPage);
        prevPageElement.addEventListener("click", goToPrevPage);
        if (getPageNumberFromURL() == 1) {
            prevPageElement.disabled = true;
        }
    }

    let nextPageElement = document.getElementById("next-page");
    if (nextPageElement !== null) {
        nextPageElement.removeEventListener("click", goToNextPage);
        nextPageElement.addEventListener("click", goToNextPage);
        if (document.getElementsByClassName("project-links").length < 4) {
            nextPageElement.disabled = true;
        } 
    }
}

function goToPrevPage() {
    if (window.location.pathname == "/projects") {
        window.location.href = `./projects/${getPageNumberFromURL()-1}`;
    }
    else {
        window.location.href = `./${getPageNumberFromURL()-1}`;
    }
}

function goToNextPage() {
    if (window.location.pathname == "/projects") {
        window.location.href = `./projects/${getPageNumberFromURL()+1}`;
    }
    else {
        window.location.href = `./${getPageNumberFromURL()+1}`;
    }
}

function getPageNumberFromURL() {
    let url = window.location.href;
    let urlDir = url.split("/");
    if (isNaN(parseInt(urlDir[urlDir.length-1]))) {
        return 1;
    } else {
        return parseInt(urlDir[urlDir.length-1]);
    }
}

window.addEventListener("load", pageLoad);