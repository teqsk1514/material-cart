var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport'); //for request authentication.
var flash = require('connect-flash');//Messages are written to the flash and cleared after being displayed to the user.
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');




//connect to database.

// mongoose.connect('mongodb://localhost:27017/shopping',{useNewUrlParser: true });

mongoose.connect('mongodb://vrook:vrook1234@ds145438.mlab.com:45438/shopping', { useNewUrlParser: true }, () => {
  console.log('connected to mlab');
});

var app = express();

require('./config/passport')

// view engine setup
app.engine('.hbs', expressHbs({ defaultLayout: 'layout', extname: '.hbs' }))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(validator());

app.use(cookieParser());
//initialize the session.
app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 60 * 60 * 1000 }
}));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// use variable local , for header.hbs

app.use((req, res, next) => {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

app.use('/user', usersRouter);
app.use('/', indexRouter);

app.get('*', (req, res) => {
  res.render('error');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.createError(404);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
