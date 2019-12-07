var express = require('express');
var router = express.Router();

var dbInterface = require('../database/db-interface.js');

/* GET resume listing. */
router.get('/', function(req, res, next) {
  let requestQuery = req.query;
  
  let query = createQuery(requestQuery);
  let dbQuery = createMongoQuery(query);
  
  sendToDB(dbQuery)
  .then((dbRes, err) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(dbRes);
  })
});

function createQuery(userRequest) {
  let defQuery = {
    'tags': ['core', 'elective'],
    'gt_gpa': 4,
    'gt_pct': 50
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
    gpa: {
      $gte: settings.gt_gpa
    },
    percentage: {
      $gte: settings.gt_pct
    },
    tags: {
      $in: settings.tags
    }
  };
  return mongoQuery;
}

function sendToDB(query) {
  return dbInterface.queryData('units', query);
}

module.exports = router;
