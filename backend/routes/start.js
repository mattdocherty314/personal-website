var express = require('express');
var router = express.Router();

var AWS = require('aws-sdk');
var aws_info = require('../aws.js');

/* GET start listing. */
router.get(`/:name`, function(req, res, next) {
  var aws_config = new AWS.Config({
    accessKeyId: aws_info.aki, secretAccessKey: aws_info.sak, region: aws_info.reg
  });
  AWS.config.update(aws_config);

  var lightsail = new AWS.Lightsail();
  lightsail.startInstance({instanceName: req.params.name}, (err, data) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

module.exports = router;