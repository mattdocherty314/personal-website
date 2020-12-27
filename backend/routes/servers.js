var express = require('express');
var router = express.Router();

var AWS = require('aws-sdk');
var aws_info = require('../aws.js');

/* GET servers listing. */
router.get('/', function(req, res, next) {
  var aws_config = new AWS.Config({
    accessKeyId: aws_info.aki, secretAccessKey: aws_info.sak, region: aws_info.reg
  });
  AWS.config.update(aws_config);

  var listServers = ["Minecraft"];
  var ec2 = new AWS.EC2();

  let state = [];
  var params = {
    InstanceIds: ['i-0577240b9508bc9f7'],
    IncludeAllInstances: true
  };
  listServers.forEach(server => {
    ec2.describeInstanceStatus(params).promise()
     .then((data, err) => {
      if (err) { 
        console.log(err, err.stack); // an error occurred
      }
      else {
        if (data.InstanceStatuses[0].InstanceState.Name === "running") {
          state.push({
            name: server,
            status: "online"
          })
        }
        else {
          state.push({
            name: server,
            status: "offline"
          })
        }

        if (state.length === listServers.length) {
          res.setHeader('Content-Type', 'application/json');
          res.send(state);
        }
      }
    })
  })
});

module.exports = router;