var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var dbInterface = require('../database/db-interface.js');
var jwtSecret = require('../jwt.js');

/* POST users listing. */
router.post('/', function(req, res, next) {
  let requestQuery = req.body;
  
  let dbQuery = createMongoQuery(requestQuery);
  
  sendToDB(dbQuery)
  .then((dbRes, err) => {
    let password = requestQuery.password;
    if (bcrypt.compareSync(password, dbRes[0].passwordhash)) {

      let token = jwt.sign({
        exp: Math.floor(Date.now()/1000) + 3600,
        data: {
          username: dbRes[0].username,
          access: dbRes[0].perms
        }
      }, jwtSecret.value);
      
      res.setHeader('Content-Type', 'application/json');
      res.send({success: `${token}`});
    }
    else {
      res.setHeader('Content-Type', 'application/json');
      res.send({success: null});
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
