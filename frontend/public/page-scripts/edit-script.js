function pageLoad() {
    window.setInterval(editScriptTick, 1000);
}

function editScriptTick() {
    let selectDBSelectElement = document.getElementById('select-db');
    if ((selectDBSelectElement !== null)) {
        selectDBSelectElement.removeEventListener('change', getDBInfo);
        selectDBSelectElement.addEventListener('change', getDBInfo);
    }
    
}

function getDBInfo(evt) {
    let dbSelected = evt.target.value;
    if (dbSelected === "...") {
        return;
    }

    let fetchParam = {
        headers: {
            Authorization: `Bearer ${getCookie("JWT")}`
        },
        method: "POST"
    };
    fetch(`http://localhost:3030/dbmeta`, fetchParam)
    .then((resp) => {
        return resp.json();
    })
    .then((meta) => {
        let entryFieldsElement = document.getElementById("entry-fields");
        entryFieldsElement.innerHTML = "";

        for (let metaItem of meta) {
            if (metaItem.name === dbSelected) {
                Object.keys(metaItem.fields).map((field) => {
                    entryFieldsElement.innerHTML += `<h3>${field}:</h3>`;
                    generateInputType(entryFieldsElement, field, metaItem.fields[field]);
                })
            }
        }

        
    })
    .catch((err) => {
        console.log(err);
    })

    let dbData = fetch(`http://localhost:3030/dbdata?dbname=${dbSelected}`)
    .then((resp) => {
        return resp.json();
    })

    
}

function generateInputType(element, key, type) {
    switch (type) {
        case "text":
            element.innerHTML += `<textarea id=${key}></textarea>`;
            break;
        case "timestamp":
            element.innerHTML += `<input id=${key} type="date"></input>`;
            break;
        case "int":
            element.innerHTML += `<input id=${key} type="number"></input>`;
            break;
        case "string":
            element.innerHTML += `<input id=${key}></input>`;
            break;
        case "array-string":
            element.innerHTML += `<input id=${key}></input>`;
            break;
        case "dictionary":
            element.innerHTML += `<input id=${key}></input>`;
            break;
        default:
            element.innerHTML += `<div id=${key}></div>`;

            let innerElement = document.getElementById(key);
            console.log(type);
            Object.keys(type).map((ind) => {
                innerElement.innerHTML += `<p>${ind}</p>`;
                generateInputType(innerElement, ind, type[ind])
            });

            break;
    }
}

window.addEventListener("load", pageLoad);

function getCookie(name) {
    var name = name + "=";
    var cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}