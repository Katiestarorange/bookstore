const express = require('express');
const path = require('path');
const createError = require('http-errors');
const logger = require('morgan'); // logger 日志
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
const bookRouter = require('./routes/book');
const qnRouter = require('./routes/qn');
const cartRouter = require('./routes/cart');
const favoriteRouter = require('./routes/favorite');
const receiverRouter = require('./routes/receiver');
const orderRouter = require('./routes/order');
const reviewRouter = require('./routes/review');
const publicRouter = require('./routes/public');

const app = express();

app.use('/public/', express.static(path.join(__dirname, './public/')));
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')));

// 配置解析表单 PoST请求体插件（注意:一定要在 app.use( router)之前)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));
// parse application/json
app.use(bodyParser.json());

// 配置默认目录
app.set('views', path.join(__dirname, './views/'));
// 配置模板引擎
app.set('view engine', 'ejs');

// 允许跨域
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,PASS')
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
//   res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
//   next();
// });

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/book', bookRouter);
app.use('/qn', qnRouter);
app.use('/cart', cartRouter);
app.use('/favorite', favoriteRouter);
app.use('/receiver', receiverRouter);
app.use('/order', orderRouter);
app.use('/review', reviewRouter);
app.use('/public', publicRouter);


// Express对于没有设定的请求路径，默认会返回 Cat not get xxx
// 如果你想要定制这个404，需要通过中间件来配置
// 只需要在自己的路由之后增加一个
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // res.locals 一般用来把req的一些参数传递回res,这样做方便网页显示上次请求的一些信息
  // 等同于： 
  // res.send({
  //   message: err.message,
  //   error: req.app.get('env') === 'development' ? err : {}
  // });

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3000, () => {
  console.log('running...')
})

module.exports = app;
