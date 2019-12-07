function pageLoad() {
    window.setInterval(tick, 1000);
}

function tick() {
    let unitSelectElement = document.getElementById('show-unit');
    if ((unitSelectElement !== null)) {
        unitSelectElement.removeEventListener('change', getNewUnitList);
        unitSelectElement.addEventListener('change', getNewUnitList);
    }
}

function getNewUnitList(evt) {
    let unitType = evt.target.value;
}

window.addEventListener("load", pageLoad);