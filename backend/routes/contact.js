var express = require('express');
const { response } = require('../app');
var router = express.Router();

var emailSecret = require('../email.js')

var sendmail = require('sendmail')();

router.get('/', function(req, res, next) {
	var emailAddr = emailSecret.value;
	var contactForm = req.query;

	
	sendmail({
		from: '',
		to: `${emailAddr}`,
		subject: `${contactForm.topic} - ${contactForm.name} (${contactForm.prefCon})`,
		html: contactForm.query,
	}, function(err, reply) {
		console.log(err && err.stack);
		console.dir(reply);
	});

	res.setHeader('Content-Type', 'application/json');
	res.send();
});

module.exports = router;
