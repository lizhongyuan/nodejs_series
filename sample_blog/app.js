var express = require('express');
var multer  = require('multer');

var app = express();

app.use(multer({
  dest: './public/images',
  rename: function (fieldname, filename) {
    return filename;
  }
}));

//set the settings
var settings = require('./settings');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

//添加session会话支持
var session = require('express-session');
//添加connect-mongo
var MongoStore = require('connect-mongo')(session);

app.use(session({
  secret: settings.cookieSecret,
  key: settings.db,
  cookie: {maxAge: 1000*60*60*24*30},

  store: new MongoStore({
    db: settings.db,
    host: settings.host,
    port: settings.port
  })
}));




// set the connect-flash
var flash = require('connect-flash');

// muler实现文件上传
/*
var multer = require('multer');
app.use(multer({
  dest:'./public/images',                 // 上传文件所在的目录
  rename: function(fieldname, filename){  // 用来修改上传后的文件名，这里设置为保存原文件名
    return filename;
  }
}));
*/


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set use flash
app.use(flash());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
