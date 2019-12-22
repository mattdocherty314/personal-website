var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs')

var dbInterface = require('../database/db-interface.js');

/* GET resume listing. */
router.get('/', function(req, res, next) {
  let requestQuery = req.query;
  
  let dbQuery = createMongoQuery(requestQuery);
  
  sendToDB(dbQuery)
  .then((dbRes, err) => {
    let password = requestQuery.password;
    if (bcrypt.compareSync(password, dbRes[0].passwordhash)) {
      
      res.setHeader('Content-Type', 'application/json');
      res.send({success: `${dbRes[0].perms}`});
    }
    else {
      res.setHeader('Content-Type', 'application/json');
      res.send({success: false});
    }
  })
});

function createQuery(userRequest) {
  let defQuery = {
    username: userRequest.username
  }

  return defQuery;
}

function createMongoQuery(settings) {
  let mongoQuery = {
    username: settings.username
  };
  return mongoQuery;
}

function sendToDB(query) {
  return dbInterface.queryData('users', query);
}

module.exports = router;
