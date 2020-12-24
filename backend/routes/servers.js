var express = require('express');
var router = express.Router();

var AWS = require('aws-sdk');
var aws_info = require('../aws.js');

/* GET awards listing. */
router.get('/', function(req, res, next) {
  var aws_config = new AWS.Config({
    accessKeyId: aws_info.aki, secretAccessKey: aws_info.sak, region: aws_info.reg
  });
  AWS.config.update(aws_config);

  var listServers = ["Minecraft"];
  var lightsail = new AWS.Lightsail();

  let state = [];
  listServers.forEach(server => {
    lightsail.getInstanceState({instanceName: server}, function (err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      }
      else {
        if (data.state.name === "running") {
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