var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', mytest1:'MyTest1'});
  //res.render('index', { title: 'MyTest1' });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: '主页' });
});

/* 注册页面 */
router.get('/reg', function(req, res, next) {
  res.render('reg', { title: '注册' });
});
router.post('/reg', function(req, res, next) {
  res.render('reg', { title: '注册' });
});

/* 登陆页面 */
router.get('/login', function(req, res, next) {
  res.render('login', { title: '登陆' });
});
router.post('/login', function(req, res, next) {
  res.render('login', { title: '登陆' });
});

/* 发表页面 */
router.get('/post', function(req, res, next) {
  res.render('post', { title: '发表' });
});
router.post('/post', function(req, res, next) {
  res.render('post', { title: '发表' });
});

router.get('/nswbmw', function(req, res, next) {
  //res.send('hello world!');
  res.render('nswbmw', { title: 'Express', mytest1:'MyTest1'});
});


module.exports = router;
