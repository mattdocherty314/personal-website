var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var dbInterface = require('../database/db-interface.js');
var jwtSecret = require('../jwt.js');

/* POST dbmeta listing. */
router.post('/', function(req, res, next) {
  let token = jwt.verify(req.headers.authorization.split(" ")[1], jwtSecret.value);

  if (token.data.access === "admin") {
    
    sendToDB({})
    .then((dbRes, err) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(dbRes);
    })
  }
});

function sendToDB(query) {
  return dbInterface.queryData('dbmeta', query);
}

module.exports = router;
