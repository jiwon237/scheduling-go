// Set Express Application

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const eventRouter = require('./routes/events');
const { ensureAuth } = require('./middlewares/authMiddleware');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ 
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true
 }));
 
// session setup
app.use(session({
  secret: 'SESSION_SECRET', // fixed
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 86400000 } // 24h
}));

// route mounting
app.use('/', indexRouter);
app.use('/auth', authRouter);
// Allow user-CRUD operations only after signing in.
app.use('/users', ensureAuth, userRouter);
app.use('/events', ensureAuth, eventRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = 
    req.app.get('env') === 'development' 
    ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
