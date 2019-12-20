var format_script = require("./shared/format-script.js");
var get_data = require("./shared/get-data.js");

var exec = require("child_process").exec;
var fs = require("fs");

exports.main = function(computer, script) {
    var computerSettings = get_data.main("backend/json/computers.json", computer);
    var scriptSettings = get_data.main("backend/json/scripts.json", script);

    startScript(computerSettings, scriptSettings);
    addComputerToRunning(computer, scriptSettings);
}

function startScript(computerData, scriptData) {
    var computerName = computerData.name;
    var scriptName = scriptData.name;
    var script = scriptData.content;

    var sshScript = format_script.main(computerData, script);
    var command = `${sshScript} > "backend/cmd-output/${scriptName}_&_${computerName}.txt"`;
    exec(command, () => {});
}

function addComputerToRunning(computer, scriptData) {
    var scriptDB = fs.readFileSync("backend/json/scripts.json");
    var scriptJSON = JSON.parse(scriptDB);

    for (var s in scriptJSON) {
        if (scriptJSON[s].name === scriptData.name) {
            scriptJSON[s].running.push(computer);
            break;
        }
    }
    
    var formatDB =  JSON.stringify(scriptJSON, null, 4)
    fs.writeFileSync("backend/json/scripts.json", formatDB);
}