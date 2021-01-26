var cors = require('cors');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var dbInterface = require('./database/db-interface.js');
var routeDirs = [
  "/awards", "/contact", "/experiences", "/projects", "/servers", "/start", "/units", "/users"
];

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routeDirs.forEach(dir => {
  var importRoute = (dir === "/") ? "./routes/index.js" : `./routes/${dir}.js`;
  app.use(`${dir}`, require(importRoute));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.setHeader('Content-Type', 'application/json');
  res.send({
	"code": err.status,
	"message": err.message
  });
});

module.exports = app;
