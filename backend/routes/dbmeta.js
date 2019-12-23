var express = require('express');
var router = express.Router();

var dbInterface = require('../database/db-interface.js');

/* GET dbmeta listing. */
router.get('/', function(req, res, next) {
  sendToDB({})
  .then((dbRes, err) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(dbRes);
  })
});

function sendToDB(query) {
  return dbInterface.queryData('dbmeta', query);
}

module.exports = router;
