var express = require('express');
const { response } = require('../app');
var router = express.Router();

var emailSecret = require('../email.js')

var sendmail = require('sendmail')({smptPort:emailSecret.port});

/* GET contact listing. */
router.get('/', function(req, res, next) {
	var emailAddr = emailSecret.address;
	var contactForm = req.query;
	
	sendmail({
		from: '',
		to: `${emailAddr}`,
		subject: `${contactForm.topic} - ${contactForm.name} (${contactForm.prefCon})`,
		html: contactForm.query,
	}, function(err, reply) {
		res.setHeader('Content-Type', 'application/json');

		if (err) {
			res.send({"error": err})
		}
		res.send({"results": "Successfully sent email."});
	});

	
});

module.exports = router;
