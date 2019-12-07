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
        });
    },

    insertData: function(dbCollection, data) {
        const config = JSON.parse(fs.readFileSync('./database/mongo-config.json'));
        return mongo.connect(`mongodb://${config.host}:${config.port}/`)
        .then((db, err) => {
            return db.db(config.database);
        })
        .then((database, err) => {
            return database.collection(dbCollection).insertMany(data).toArray();
        });
    },

    deleteData: function(dbCollection, query) {
        const config = JSON.parse(fs.readFileSync('./database/mongo-config.json'));
        return mongo.connect(`mongodb://${config.host}:${config.port}/`)
        .then((db, err) => {
            return db.db(config.database);
        })
        .then((database, err) => {
            return database.collection(dbCollection).deleteMany(query).toArray();
        });
    },

    updateData: function(dbCollection, query, data) {
        const config = JSON.parse(fs.readFileSync('./database/mongo-config.json'));
        return mongo.connect(`mongodb://${config.host}:${config.port}/`)
        .then((db, err) => {
            return db.db(config.database);
        })
        .then((database, err) => {
            return database.collection(dbCollection).updateMany(data).toArray();
        })
    }
};