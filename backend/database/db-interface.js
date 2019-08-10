var fs = require('fs');
var mongo = require('mongodb').MongoClient;

function queryData(dbCollection, query) {
    const config = fs.readFileSync('./mongo-config.js');
    return mongo.connect(`mongodb://${config.host}:${config.port}/`, (err, db) => {
        let database = db.db(config.database);
        return database.collection(dbCollection).find(query).toArray((err, res) => {
            return res
        });
    });
}

function insertData(dbCollection, data) {
    const config = fs.readFileSync('./mongo-config.js');
    return mongo.connect(`mongodb://${config.host}:${config.port}/`, (err, db) => {
        let database = db.db(config.database);
        return database.collection(dbCollection).insertMany(data).toArray((err, res) => {
            return res
        });
    });
}

function deleteData(dbCollection, query) {
    const config = fs.readFileSync('./mongo-config.js');
    return mongo.connect(`mongodb://${config.host}:${config.port}/`, (err, db) => {
        let database = db.db(config.database);
        return database.collection(dbCollection).deleteMany(query).toArray((err, res) => {
            return res
        });
    });
}

function updateData(dbCollection, query, data) {
    const config = fs.readFileSync('./mongo-config.js');
    return mongo.connect(`mongodb://${config.host}:${config.port}/`, (err, db) => {
        let database = db.db(config.database);
        return database.collection(dbCollection).updateMany(query, data).toArray((err, res) => {
            return res
        });
    });
}