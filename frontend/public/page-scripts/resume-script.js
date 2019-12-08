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
    let unitTitleElement = document.getElementById("unit-type");
    let unitListElement = document.getElementById("unit-list");
    
    unitTitleElement.innerHTML = "<strong> Loading Units... </strong>";
    unitListElement.innerHTML = "";

    let unitType = evt.target.value;
    let unitTitle = evt.target.options[evt.target.selectedIndex].text;

    fetch(`http://localhost:3000/units?tags=${unitType},`)
    .then((resp) => {
        return resp.json();
    })
    .then((units) => {
        unitTitleElement.innerHTML = `<strong> ${unitTitle}: </strong>`;
        units.forEach(unit => {
            unitListElement.innerHTML += `<pre> ${unit.code}: ${unit.name} (GPA ${unit.gpa}) </pre>`;
        });
    })
    .catch((err) => {
        console.log(err)
        unitTitleElement.innerHTML = "<strong> Something went wrong loading Units. </strong>"
    })
}

window.addEventListener("load", pageLoad);