+ morgan日志模块 
	- 实现在控制台可以看到有日志输出，日志内容包括请求方法、请求状态、远程地址、请求时间等信息
	- https://blog.csdn.net/swl979623074/article/details/78303776
+ NodeJs 中 Express 框架使用 morgan 中间件记录日志
	- Express中的 app.js 文件已经默认引入了该中间件
		* var logger = require('morgan');
	- 使用app.use(logger('dev'));
		* 可以将请求信息打印在控制台，便于开发调试，
	- 但实际生产环境中，需要将日志记录在log文件里，可以使用如下代码:
		* // create a write stream (in append mode)
			`var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})`
			// setup the logger
			`app.use(morgan('combined', {stream: accessLogStream}))`

+ res.locals 
  一般用来把req的一些参数传递回res,这样做方便网页显示上次请求的一些信息
  等同于： 
  res.send({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });