var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter=require('./routes/products');
var adminRouter=require('./routes/admin_login');
var admin=require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);

app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//node解决跨域问题--2018-9-25
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
      //这段仅仅为了方便返回json而已
  res.header("Content-Type", "application/json;charset=utf-8");
  if(req.method == 'OPTIONS') {
      //让options请求快速返回
      res.sendStatus(200); 
  } else { 
      next(); 
  }
});


//全局权限请求拦截
app.use(function (req, res, next) {
  if(req.cookies.userId){
    next();
  }else{
    // console.log(req.originalUrl=="/loginBms/logins");
    if(req.originalUrl=="/users/YZMinfo"||req.originalUrl=="/users/payInit"||req.originalUrl=="/users/newAddress"||req.originalUrl=="/products/develops"||req.originalUrl=="/products/suits"||req.path=="/products/product"||req.originalUrl=="/products/login"||req.originalUrl=="/products/sellWell"||req.originalUrl=="/users/carList"||req.originalUrl=="/users/addressList"||req.originalUrl=="/users/setDefault"||req.originalUrl=="/users/deleAddress"||req.originalUrl=="/users/sendPay"||req.originalUrl=="/users/payMon"||req.originalUrl=="/users/success"||req.originalUrl=="/admin/BMS"||req.originalUrl=="/admin/goods"||req.originalUrl=="/admin/suits"||req.originalUrl=="/admin/sellwell"||req.originalUrl=="/admin/uploadgoods"||req.originalUrl=="/admin/removedata"||req.originalUrl=="/admin/updateId"||req.originalUrl=="/admin/updateTip"||req.originalUrl=="/admin/updateName"||req.originalUrl=="/admin/updateOldPrice"||req.originalUrl=="/admin/updatePrice"||req.originalUrl=="/admin/updateWellId"||req.originalUrl=="/admin/updateWellTip"||req.originalUrl=="/admin/updateWellName"||req.originalUrl=="/admin/updateWellOldPrice"||req.originalUrl=="/admin/updateWellPrice"||req.originalUrl=="/admin/updateSuitId"||req.originalUrl=="/admin/updateSuitTip"||req.originalUrl=="/admin/updateSuitName"||req.originalUrl=="/admin/updateSuitOldPrice"||req.originalUrl=="/admin/updateSuitPrice"||req.originalUrl=="/admin/ordermanagement"||req.originalUrl=="/loginBms/logins"||req.originalUrl=="/admin/leUser"){
    next()
    }else{
      res.json({
        status:'1',
        msg:'当前未登录！',
        result:''
      });
      return;
    }
  }
});

app.use('/', indexRouter);
app.use('/products', productRouter);
app.use('/users', usersRouter);
app.use('/admin', admin);
app.use('/loginBms',adminRouter);     //后台路由


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
