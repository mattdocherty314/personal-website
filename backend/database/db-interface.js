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
    },

    insertData: function(dbCollection, data) {
        const config = fs.readFileSync('./database/mongo-config.json');
        return mongo.connect(`mongodb://${config.host}:${config.port}/`, (err, db) => {
            let database = db.db(config.database);
            return database.collection(dbCollection).insertMany(data).toArray((err, res) => {
                return res;
            });
        });
    },

    deleteData: function(dbCollection, query) {
        const config = fs.readFileSync('./database/mongo-config.json');
        return mongo.connect(`mongodb://${config.host}:${config.port}/`, (err, db) => {
            let database = db.db(config.database);
            return database.collection(dbCollection).deleteMany(query).toArray((err, res) => {
                return res;
            });
        });
    },

    updateData: function(dbCollection, query, data) {
        const config = fs.readFileSync('./database/mongo-config.json');
        return mongo.connect(`mongodb://${config.host}:${config.port}/`, (err, db) => {
            let database = db.db(config.database);
            return database.collection(dbCollection).updateMany(query, data).toArray((err, res) => {
                return res;
            });
        });
    }
};