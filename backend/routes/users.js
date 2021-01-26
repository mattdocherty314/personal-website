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
	res.setHeader('Content-Type', 'application/json');
	if (dbRes.name === "MongoNetworkError") {
		res.send({"error": "Unable to connect to database."});
	} else if (dbRes[0] === undefined) {
		// Wait a random amount of time before responding, so that it can't be identified as an invalid username
		setTimeout(() => {res.send({"error": "Invalid username or password."})}, Math.random()*2000+100);
	} else if (err) {
		res.send({"error": err})
	}
    let password = requestQuery.password;
    if (bcrypt.compareSync(password, dbRes[0].passwordhash)) {

      let token = jwt.sign({
        exp: Math.floor(Date.now()/1000) + 3600,
        data: {
          username: dbRes[0].username,
          access: dbRes[0].access
        }
      }, jwtSecret.value);
      
      res.send({"success": `${token}`});
    }
    else {
      res.send({"error": "Invalid username or password."});
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
