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

  const instanceNameToID = {
    "Minecraft": "i-0577240b9508bc9f"
  }

  res.setHeader('Content-Type', 'application/json');

  var ec2 = new AWS.EC2();
  ec2.startInstances({InstanceIds: [instanceNameToID[req.params.name]]})
  .then((err, data) => {
	if (err) {
		throw err;
	}
    res.send({"results": data});
  })
  .catch((error) => {
	  res.send({"error": error})
  })
});

module.exports = router;