require("dotenv").config("./.env");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var userRouter = require('./routes/user');
var propertyRouter = require('./routes/property');
var appointmentRouter = require('./routes/appointment');

const passport = require("passport")
const session = require("express-session")
const UserSchema = require("./models/userschema")

const db = require("./models/dbconnection")

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
resave:true,
saveUninitialized:true,
secret:"nffdsn"
}))

app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(UserSchema.serializeUser())
passport.deserializeUser(UserSchema.deserializeUser())



app.use('/user', userRouter);
app.use('/property', propertyRouter);
app.use("/appointment",appointmentRouter)

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
