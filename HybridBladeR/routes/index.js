//var router = express.Router();
var express = require('express');
var Player = require('../models/player.js');


module.exports = function(app) {
    app.get('/', function(req, res){
        res.render('index', {title: '主页'})
    });

    app.get('/regPlayer', function(req, res){
        res.render('regPlayer', {});
    });

    /*
     *
     */
    app.post('/regPlayer', checkNotLogin())
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

        newPlayer.save(function(err, player){
            if(err) {
                console.log('regPlayer error.');
                return res.redirect('/regPlayer');
            }

            Player.get(newPlayer.id, function(err, player){
                if(err){}
                console.log(req.session.user.toString());
            });

            res.redirect('/regPlayer');
        });


    });

    function checkNotLogin(req, res, next) {
        if (req.session.user) {
            //req.flash('error', '已登录!');
            res.redirect('back');
        }
        next();
    }
}
