let dbData = null;

function pageLoad() {
    window.setInterval(editScriptTick, 1000);
}

function editScriptTick() {
    let selectDB = document.getElementById('select-db');
    if ((selectDB !== null)) {
        selectDB.removeEventListener('change', getDBInfo);
        selectDB.addEventListener('change', getDBInfo);
    }
    
    let selectEntry = document.getElementById('select-entry');
    if ((selectEntry !== null)) {
        selectEntry.removeEventListener('change', fillFields);
        selectEntry.addEventListener('change', fillFields);
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
        entryFieldsElement.innerHTML = `<input id='db' name='db' hidden value='${dbSelected}'/>`;

        for (let metaItem of meta) {
            if (metaItem.name === dbSelected) {
                Object.keys(metaItem.fields).map((field) => {
                    entryFieldsElement.innerHTML += `<h3>${field}:</h3>`;
                    generateInputType(entryFieldsElement, field, metaItem.fields[field]);
                })
                entryFieldsElement.innerHTML += `<br/><button id="edit-button" type="submit"> Insert Data </button>`;
            }
        }

        
    })
    .catch((err) => {
        console.log(err);
    })

    dbData = fetch(`http://localhost:3030/${dbSelected}?numPerPage=100`)
    .then((resp) => {
        return resp.json();
    })
    .then((dbResp) => {
        let selectEntryElement = document.getElementById("select-entry");
        
        selectEntryElement.innerHTML = "<option id='id-new'>New ID</option>";
        for (data of dbResp) {
            selectEntryElement.innerHTML += `<option id='id-${data.id}'>ID: ${data.id}</option>`;
        }

        return dbResp;
    }) 
}

function fillFields() {
    Promise.resolve(dbData)
    .then((data) => {
        let selectEntry = document.getElementById("select-entry");
        let selectEntryID = selectEntry.selectedIndex - 1;

        let editButton = document.getElementById("edit-button");
        if (selectEntryID === -1) {
            editButton.innerHTML = "Insert Data";
        }
        else {
            editButton.innerHTML = "Modify Data";
            
            let selectEntryData = data[selectEntryID];
            Object.keys(selectEntryData).map((key) => {
                if (key !== "_id") {
                    if (key === "last_modified") {
                        convertTStoInDate(selectEntryData.last_modified, "last_modified");
                    } else if (key === "times") {
                        convertTStoInDate(selectEntryData.times[0].start, "start");
                        convertTStoInDate(selectEntryData.times[0].end, "end");
                    }
                    else {
                        let keyElement = document.getElementById(key);
                        keyElement.value = selectEntryData[key];
                    }
                }
            })
        }
    })
}

function generateInputType(element, key, type) {
    switch (type) {
        case "text":
            element.innerHTML += `<textarea id=${key} name=${key}></textarea>`;
            break;
        case "timestamp":
            element.innerHTML += `<input id=${key} name=${key} type="date"></input>`;
            break;
        case "int":
            element.innerHTML += `<input id=${key} name=${key} type="number"></input>`;
            break;
        case "string":
            element.innerHTML += `<input id=${key} name=${key}></input>`;
            break;
        case "array-string":
            element.innerHTML += `<input id=${key} name=${key}></input>`;
            break;
        case "dictionary":
            element.innerHTML += `<input id=${key} name=${key}></input>`;
            break;
        default:
            element.innerHTML += `<div id=${key} name=${key}></div>`;

            let innerElement = document.getElementById(key);
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

function convertTStoInDate(timestamp, elementID) {
    let keyElement = document.getElementById(elementID);
    let dateTS = new Date();

    timestamp = (timestamp === -1 ? Date.now() : timestamp * 1000);
    dateTS.setTime(timestamp);

    let dateYear = dateTS.getUTCFullYear();
    let dateMonth = dateTS.getUTCMonth()+1;
    let dateDay = dateTS.getUTCDate();

    if (dateMonth < 10) {
        dateMonth = `0${dateMonth}`;
    } if (dateDay < 10) {
        dateDay = `0${dateDay}`;
    }

    let dateValue = `${dateYear}-${dateMonth}-${dateDay}`;
    keyElement.value = dateValue;
}