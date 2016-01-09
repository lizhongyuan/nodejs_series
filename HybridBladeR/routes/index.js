var Player = require('../models/player.js');
var User = require('../models/user.js');


module.exports = function(app) {
    app.get('/', function(req, res){
        res.render('index', {title: '主页'})
    });

    app.get('/regPlayer', function(req, res){
        res.render('regPlayer', {title:"注册队员"});
    });

    app.post('/regPlayer', function(req, res){
        var id = req.body.id,
            playerID = req.body.playerID,
            level = req.body.level,
            stability = req.body.stability,
            role = req.body.role,
            style = req.body.style,
            isTopLeader = req.body.isTopLeader,
            isTopFighter = req.body.isTopFighter;

        var newPlayer = new Player({
            id: id,
            playerID : playerID,
            level : level,
            stability : stability,
            role : role,
            style : style,
            isTopLeader : isTopLeader,
            isTopFighter : isTopFighter
        });

        // 判断是否已经有这个队员了
        Player.get(newPlayer.playerID, function(err, player){
            if(err) {
                return res.redirect('/');
            }
            if(player) {    // 已经有这个队员了, redirect至/regPlayer
                // req.flash();
                req.flash();
                return res.redirect('/regPlayer');
            }
            newPlayer.save(function(err, player) {
                if(err) {
                    // req.flash();
                    res.redirect('/regPlayer');
                }
                req.session.player = player;
                //req.flash();
                res.redirect('/');  //注册成功后返回首页
            });
        });
    });

    app.get('/reg', function(req, res){
        res.render('reg', { title: '注册' });
    });
    app.post('/reg', function (req, res) {
        var name = req.body.name,
            password = req.body.password,
            password_re = req.body['password-repeat'];
        //检验用户两次输入的密码是否一致
        if (password_re != password) {
            req.flash('error', '两次输入的密码不一致!');
            return res.redirect('/reg');//返回注册页
        }
        //生成密码的 md5 值
        /*
         var md5 = crypto.createHash('md5'),
         password = md5.update(req.body.password).digest('hex');
         */
        var newUser = new User({
            name: name,
            password: password,
            email: req.body.email
        });
         //检查用户名是否已经存在
         User.get(newUser.name, function (err, user) {
             if (err) {
                 req.flash('error', err);
                 return res.redirect('/');
             }
             if (user) {
                 req.flash('error', '用户已存在!');
                 return res.redirect('/reg');//返回注册页
             }
             //如果不存在则新增用户
             newUser.save(function (err, user) {
                 if (err) {
                     req.flash('error', err);
                     return res.redirect('/reg');//注册失败返回主册页
                 }
                 req.session.user = newUser;//用户信息存入 session
                 req.flash('success', '注册成功!');
                 res.redirect('/');//注册成功后返回主页
             });
         });
    });
}
