var express = require('express');
var router = express.Router();

var dbInterface = require('../database/db-interface.js');

/* POST users listing. */
router.post('/', async function(req, res, next) {
    res.redirect("http://localhost:3000/edit");

    let reqBody = req.body;
    let dbName = reqBody.db;
    let dbID = reqBody.id;

    let numEntries = await sendToDB(dbName)
    .then((dbRes, err) => {
        return dbRes.length;
    })

    let entryTypes = await sendToDB("dbmeta")
    .then((dbRes, err) => {
        for (dbMeta in dbRes) {
            if (dbRes[dbMeta].name === dbName) {
                return dbRes[dbMeta].fields;
            }
        }
    })

    let data = {};
    for (id in entryTypes) {
        switch(entryTypes[id]) {
            case "int":
                data[id] = isNaN(reqBody[id]) ? 0 : parseInt(reqBody[id]);
                break;
            case "timestamp":
                data[id] = isNaN(convertDateToTS(reqBody[id])) ? parseInt(Date.now()/1000) : convertDateToTS(reqBody[id]);
                break;
            case "array-string":
                data[id] = reqBody[id].split(",");
                break;
            default:
                data[id] = reqBody[id];
        }
    }

    if ((dbID === '') || (parseInt(dbID) >= numEntries) || (parseInt(dbID) < 0)) {
        data.id = numEntries;
        insertIntoDB(dbName, data);
    } 
    else {
        modifyDB(dbName, data, dbID);
    }
});

function convertDateToTS(date) {
    let year = date[0];
    let month = date[1]-1;
    let day = date[2];

    let d = new Date(year, month, day, 10, 0, 0, 0);
    return d.getTime()/1000;
}

function sendToDB(dbName) {
    return dbInterface.queryData(dbName, {});
}

function insertIntoDB(dbName, data) {
    return dbInterface.insertData(dbName, [data]);
}

function modifyDB(dbName, data, id) {
    let affectedID = {id: parseInt(id)};
    let setData = {$set: data}
    return dbInterface.updateData(dbName, affectedID, setData);
}

module.exports = router;