var express = require('express');
var router = express.Router();

var dbInterface = require('../database/db-interface.js');

/* GET projects listing. */
router.get('/', function(req, res, next) {
  let requestQuery = req.query;
  
  let query = createQuery(requestQuery);
  let dbQuery = createMongoQuery(query);
  
  sendToDB(dbQuery)
  .then((dbRes, err) => {
    res.setHeader('Content-Type', 'application/json');
	if (dbRes.name === "MongoNetworkError") {
		res.send({"error": "Unable to connect to database."});
	} else if (err) {
		res.send({"error": err})
	} else {
		res.send({"results": dbRes});
	}
  })
});

function createQuery(userRequest) {
  let defQuery = {
    'page': 1,
    'numPerPage': 4
  }

  for (let setting in defQuery) {
    for (let userSetting in userRequest) {
      if (setting === userSetting) {
        let parsedSetting = parseStringToCorrect(userRequest[userSetting]);
        defQuery[setting] = parsedSetting;
        break;
      }
    }
  }

  return defQuery;
}

function parseStringToCorrect(stringToParse) {
  var parsedItem = null;
  
  if (stringToParse.indexOf(',') != -1) {
    return stringToParse.split(',')
  }

  parsedItem = parseInt(stringToParse);
  if (!isNaN(parsedItem)) {
    return parsedItem;
  }
  
  if (stringToParse === "true") {
    return true;
  } else if (stringToParse === "false") {
    return false;
  }

  return stringToParse;
}

function createMongoQuery(settings) {
  let mongoQuery = {
    id: {
      $gte: (settings.page-1) * settings.numPerPage,
      $lte: settings.page * settings.numPerPage - 1
    }
  };
  return mongoQuery;
}

function sendToDB(query) {
  return dbInterface.queryData('projects', query);
}

module.exports = router;
