
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');
const MongoStore = require('connect-mongo');
const settings = require('./settings');


var app = module.exports = express.createServer();
// const app = express();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  // app.set('view options', {layout: false}); // 关闭 layout.ejs
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({
  	secret: settings.cookieSecret,
  	// store: new MongoStore({
  	// 	db: settings.db
  	// })
  }));
  app.use(express.router(routes));
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

// app.get('/', routes.index);
// app.get('/index', routes.hello);
// app.all('/user/:username', function(req, res, next) {
// 	console.log('all methods captured');
// 	next();
// })
// app.get('/user/:username', function(req, res){
// 	res.send('user:' +  req.params.username)
// });

// 1.微博网站路由规划
/*
1. / -> 首页
2. /u/[user] -> 用户的主页
3. /post -> 发布信息
4. /reg -> 用户注册
5. /login -> 用户登录
6. /logout -> 用户登出
*/ 
// app.get('/', routes.index);;
// app.get('/u/:user', routes.user);
// app.post('/post', routes.post);
// app.get('/reg', routes.reg);
// app.post('/reg', routes.doReg);
// app.get('/login', routes.login);
// app.post('/login', routes.doLogin);
// app.get('/logout', routes.logout)

// // 片段视图, partial 是一个可以在视图中使用的函数，参数1：片段视图的名称参数2：对象或者数组
// app.get('/list', function(req, res) {
// 	res.render('list', {
// 		title: 'List',
// 		items: [1991, 'guokk', 'express', 'node.js']
// 	});
// })


// // 下面的这段代码的意思是在翻译 userlist 页面模板套用 admin.ejs作为页面布局
// // function(req, res) {
// // 	res.render('userlist', {
// // 		title: '用户列表-后台管理系统',
// // 		layout: 'admin'
// // 	})
// // }

// const util = require('util');
// // 静态视图助手
// app.helpers({
// 	inspects: function(obj){
// 		return util.inspect(obj, true)
// 	}
// });
// // 动态视图助手
// app.dynamicHelpers({
// 	headers: function(req, res) {
// 		return req.headers;
// 	}
// })

// app.get('/helper', function(req, res) {
// 	res.render('helper', {
// 		title: 'Helpers'
// 	});
// });




app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
