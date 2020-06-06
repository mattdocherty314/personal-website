var fs = require('fs');
var mongo = require('mongodb').MongoClient;

module.exports = {
    queryData: function queryData(dbCollection, query) {
        const config = JSON.parse(fs.readFileSync('./database/mongo-config.json'));
        return mongo.connect(`mongodb://${config.host}:${config.port}/`)
        .then((db, err) => {
            return db.db(config.database);
        })
        .then((database, err) => {
            return database.collection(dbCollection).find(query).toArray();
        })
        .catch((error) => {
            return error;
        })
    },

    insertData: function(dbCollection, data) {
        const config = JSON.parse(fs.readFileSync('./database/mongo-config.json'));
        return mongo.connect(`mongodb://${config.host}:${config.port}/`)
        .then((db, err) => {
            return db.db(config.database);
        })
        .then((database, err) => {
            return database.collection(dbCollection).insertMany(data);
        })
        .catch((error) => {
            return error;
        })
    },

    deleteData: function(dbCollection, query) {
        const config = JSON.parse(fs.readFileSync('./database/mongo-config.json'));
        return mongo.connect(`mongodb://${config.host}:${config.port}/`)
        .then((db, err) => {
            return db.db(config.database);
        })
        .then((database, err) => {
            return database.collection(dbCollection).deleteMany(query);
        })
        .catch((error) => {
            return error;
        })
    },

    updateData: function(dbCollection, query, data) {
        const config = JSON.parse(fs.readFileSync('./database/mongo-config.json'));
        return mongo.connect(`mongodb://${config.host}:${config.port}/`)
        .then((db, err) => {
            return db.db(config.database);
        })
        .then((database, err) => {
            return database.collection(dbCollection).updateMany(query, data);
        })
        .catch((error) => {
            return error;
        })
    }
};