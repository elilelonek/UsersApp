var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var indexRouter = require('./routes/login');
var usersRouter = require('./routes/users');
var homepageRouter = require('./routes/HomePage');
var adminhomeRouter = require('./routes/adminhome');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(session({
  cookie: { maxAge: 3600000, secure: false },
  secret: 'keyboard cat',
  saveUninitialized: true,
  resave: true
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/homepage', homepageRouter);
app.use('/adminhome', adminhomeRouter);

app.use(express.static(path.join(__dirname, 'public')));

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
  res.render('error');
});

module.exports = app;