var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var dbInterface = require('../database/db-interface.js');
var jwtSecret = require('../jwt.js');

/* GET dbdata listing. */
router.get('/', function(req, res, next) {
  sendToDB(req.query.dbname)
  .then((dbRes, err) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(dbRes);
  })
});

function sendToDB(query) {
  return dbInterface.queryData(query, {});
}

module.exports = router;
