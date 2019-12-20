window.addEventListener("load", pageLoad);

function pageLoad() {
    var comDiv = document.getElementById("list-computers");
    var comJSON = loadJSON("../../backend/json/computers.json");

    displayComputerName(comDiv, comJSON);

    addEventListeners(comJSON);
}

function displayComputerName(div, json) {
    div.innerHTML = "";
    for (var c in json) {
        div.innerHTML += `<div id='com${c}'>`;
        div.innerHTML += `<p class='name'>${json[c].name} </p>`;
        div.innerHTML += `<button id='edit-com-${c}'>Edit Data</button>`;
        div.innerHTML += "</div><br>";
    }
}

function addEventListeners(json) {
    var clearBtn = document.getElementById("clear");
    clearBtn.addEventListener("click", function() {
        location.reload();
    });

    var modifyBtn = document.getElementById("modify");
    modifyBtn.addEventListener("click", modifyData);

    var i = 0;
    do {
        var currentEditButton = document.getElementById(`edit-com-${i}`);
        currentEditButton.addEventListener("click", function (evt) {
            editScript(evt.srcElement.id.split("-")[2], json)
        });
        i += 1;
    } while (currentEditButton !== null);
}

function getEditFields() {
    var editName = document.getElementById("edit-name");
    var editOS = document.getElementById("edit-os");
    var editIP = document.getElementById("edit-ip");
    var editPort = document.getElementById("edit-port");
    var editUser = document.getElementById("edit-user");
    var editPass = document.getElementById("edit-pass");
    
    var editObjs = [editName, editOS, editIP, editPort, editUser, editPass];
    return editObjs;
}

function editScript(id, json) {
    var editTitles = ["name", "os", "ip", "port", "user", "pass"];
    var editObjects = getEditFields();
    for (var t in editTitles) {
        editObjects[t].setAttribute("value", json[id][editTitles[t]]);
    }

    var idPara = document.getElementById("com-id");
    idPara.innerHTML = `<strong>Computer ID: </strong> ${id}`; 

    var modifyBtn = document.getElementById("modify");
    modifyBtn.innerHTML = "Edit Computer";

    var startStopBtn = document.getElementById("start-stop");
    //startStopBtn.disabled = false;
    if (json[id].online === true) {
        startStopBtn.innerHTML = "Stop Server";
    } else {
        startStopBtn.innerHTML = "Start Server";
    }
}

function modifyData() {
    var idPara = document.getElementById("com-id");
    var comID = idPara.innerHTML.split(" ").slice(-1)[0];
    var editObjects = getEditFields();
    var jsonString = `{
        "com-${comID}": {
            "name": "${editObjects[0].value}",
            "os": "${editObjects[1].value}",
            "ip": "${editObjects[2].value}",
            "port": "${editObjects[3].value}",
            "user": "${editObjects[4].value}",
            "pass": "${editObjects[5].value}"
        }
    }`;
    var json = JSON.parse(jsonString);
    sendBackend(json, "../../backend/modify-json");
}

