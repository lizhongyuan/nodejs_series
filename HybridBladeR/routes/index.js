var Player = require('../models/player.js');
var Team = require('../models/team.js');
var User = require('../models/user.js');
var Bet = require('../strategy/bet.js');


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
                //req.flash();
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

    app.get('/regTeam', function(req, res){
        res.render('regTeam', {title:"注册队员"});
    });
    app.post('/regTeam', function(req, res){
        var id = req.body.id,
            name = req.body.name,
            player1 = [ req.body.player1id, req.body.player1playerID],
            player2 = [ req.body.player2id, req.body.player2playerID],
            player3 = [ req.body.player3id, req.body.player3playerID],
            player4 = [ req.body.player4id, req.body.player4playerID],
            player5 = [ req.body.player5id, req.body.player5playerID],
            players = [player1, player2, player3, player4, player5],
            region = req.body.region,
            level = req.body.level,
            ranking = req.body.ranking,
            stability = req.body.stability,
            style = req.body.style,
            desc = req.body.desc;

        var topFighters = [];
        var tfNum = 0;
        var topLeaders = [];
        var tlNum = 0;
        for(var i = 4; i >= 1; i--) {
            var curTopFighterNumid = "topFighter" + String(i) + "id";
            var curTopFighterNumplayerid = "topFighter" + String(i) + "playerid";

            if (req.body[curTopFighterNumid] == "" || req.body[curTopFighterNumplayerid] == "") {
                console.log(curTopFighterNumid + ":" + req.body[curTopFighterNumid]);
                console.log(curTopFighterNumplayerid + ":" + req.body[curTopFighterNumplayerid]);
                continue;
            }
            var curTopFighter = [req.body[curTopFighterNumid], req.body[curTopFighterNumplayerid]];
            topFighters.splice(0, 0, curTopFighter);
            tfNum++;
        }
        console.log("tfNum: " + String(tfNum));
        topFighters.splice(0, 0, tfNum);

        for(var i = 2; i >= 1; i--) {
            var curTopLeaderNumid = "topLeader" + String(i) + "id";
            var curTopLeaderNumplayerid = "topLeader" + String(i) + "playerid";

            if (req.body[curTopLeaderNumid] == "" || req.body[curTopLeaderNumplayerid] == "") {
                //break;
                console.log("curTopLeaderNumid: " + req.body[curTopLeaderNumid]);
                console.log("curTopLeaderNumplayerid: " + req.body[curTopLeaderNumplayerid]);
                continue;
            }
            var curTopLeader = [req.body[curTopLeaderNumid], req.body[curTopLeaderNumplayerid]];
            topLeaders.splice(0, 0, curTopLeader);
            tlNum++;
        }
        console.log("tlNum: " + String(tlNum));
        topLeaders.splice(0, 0, tlNum);

        var newTeam = new Team({
            id : id,
            name : name,
            players : players,
            region : region,
            level : level,
            ranking : ranking,
            stability : stability,
            style : style,
            topFighters : topFighters,
            topLeaders : topLeaders,
            desc : desc
        });

        newTeam.save(function(err, team){
            if(err){
                console.log("save the team error.");
                // req.flash();
                res.redirect('/regPlayer');
            }
            req.session.team = team;
            //req.flash();
            res.redirect('/');  //注册成功后返回首页
        });
    });

    app.get('/bet', function(req, res){
        res.render('bet', {title:"预测比赛"});
    });
    app.post('/bet', function(req, res){
        var teams = [req.body.team1, req.body.team2];
        /*
        var result = Bet(teams);
        var ajaxText = {
            tips: result
        }
        */
        var ajaxText = "teamA";
        res.send(ajaxText);

        //等于res.send
        /*
        res.write(ajaxText);
        res.end();
        */

        /*
        Team.get(team1Name, function(err, team){
            if(err) {
                console.log(err);
            }
            console.log(team.id);
            console.log(team.players[0][0]);
            console.log(team.players[0]);
        });
        Team.get(team2Name, function(err, team){
            if(err) {
                console.log(err);
            }
            console.log(team.id);
            console.log(team.players[0][0]);
            console.log(team.players[0]);
        });
        */
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
