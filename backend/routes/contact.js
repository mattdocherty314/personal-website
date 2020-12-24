var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	contactForm = req.query();
	res.send({});
	console.log(contactForm);
  });

module.exports = router;
