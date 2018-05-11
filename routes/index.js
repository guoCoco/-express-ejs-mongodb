
/*
 * GET home page.
 */

// exports.index = function(req, res){
//   res.render('index', { title: 'Express' })
// };

// exports.hello = function(req, res) {
// 	res.send('the time is ' + new Date().toString())
// }

// exports.user = function(req, res){
// };

// exports.post = function(req, res){
// };

// exports.reg = function(req, res){
// };

// exports.doReg = function(req, res){
// };

// exports.login = function(req, res){
// };

// exports.doLogin = function(req, res){
// };

// exports.logout = function(req, res){
// };

module.exports = function(app){
	app.get('/', function(req, res){
		res.render('index', {
			title: '首页'
		})
	});
	app.get('/reg', function(req, res){
		res.render('reg', {
			title: '用户注册'
		})
	});
	app.post('/reg', function(req, res){
		if(req.body['password-repeat'] !== req.body['password']) {
			req.flash('error', '两次输入的口令不一致');
			return res.redirect('/reg')
		}
		// 生成口令散列值
		var md5 = crypto.ceateHash('md5');
		var password = md5.update(req.body.password).digest('base64');
		var newUser = new User({
			name: req.body.username,
			password: passwprd,
		})
		// 检测用户名是否已经存在
		User.get(newUser.name, function(err, user){
			if(user) {
				err = 'Username already exists';
			}
			if(err){
				req.flash('error', err);
				return res.redirect('/reg')
			}
			// 如果不存在就新增用户
			newUser.save(function(err){
				if(err){
					req.flash('error', err);
					return res.redirect('');
				}
				req.session.user = newUser;
				req.flash('success', '注册成功')；
				fes.redirect('/')
			})
		})
	})
}