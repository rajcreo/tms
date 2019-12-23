var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mountRoutes = require('./routes/index');
var httpContext = require('express-http-context');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(httpContext.middleware);

mountRoutes(app);

app.use(function (req, res) {
  res.status(404).send({ message: 'URL not found', success: false, url: req.url });
});

module.exports = app;
