function pageLoad() {
    window.setInterval(serverScriptTick, 1000);
    
}

function serverScriptTick() {
    let startMCButton = document.getElementById("start-mc");
    if (startMCButton !== null) {
        startMCButton.removeEventListener("click", startMCServer);
        startMCButton.addEventListener("click", startMCServer);
    }
}

function startMCServer() {
	fetch(`http://localhost:3030/start/Minecraft`);
}

window.addEventListener("load", pageLoad);