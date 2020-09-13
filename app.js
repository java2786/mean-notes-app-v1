var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const isDev = require('./environment');
const sequelize = require('./config/db');

var repository = require("./repository")

var cors = require('cors')

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger(isDev ? 'dev' : 'combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views','./views');

var corsOptions = {
  // origin: 'http://localhost:9000',
  // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

app.use('/api', indexRouter);



app.get('/', (req, res)=>{
  repository.getAll("note", function (err, data) {
    if(!!err){
      // errorHandler(err, res);
      res.render('index', { title: 'NotesApp', notes: [] });
    } else {
      res.render('index', { title: 'NotesApp', notes: data });
    }
  });
})

app.get('/notes/create', (req, res)=>{
  res.render('create', { title: 'NotesApp' });
})
app.get('/notes/edit', (req, res)=>{
  res.render('edit', { title: 'NotesApp' });
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.json({
    success: false,
    message: err.message,
    error: err
  });
});





if (false) {
  // dropTables();
  // createTables();
}

function createTables() {
  sequelize.sync({ force: true, alter: true })
  require("./models");
}
function dropTables() {
  sequelize.sync({ force: true })
    .then(function () {
      // Drop all tables
      return sequelize.drop()
    })
}
module.exports = app;
