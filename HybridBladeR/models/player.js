/**
 * Created by svenlee on 15/12/18.
 */

var mongodb = require('./db');

function Player(player) {
    this.id = player.id;
    this.playerID = player.playerID;
    this.team = player.team;
    this.level = player.level;
    this.stability = player.stability;
    this.role = player.role;
    this.style = player.style;
    this.isTopLeader = player.isTopLeader;
    this.isTopFighter = player.isTopFighter;
};

module.exports = Player;

Player.prototype.save = function(callback){
    var player = {
        id : this.id,
        playerID: this.playerID,
        team : this.team,
        level : this.level,
        stability : this.stability,
        role : this.role,
        style : this.style,
        isTopLeader : this.isTopLeader,
        isTopFighter : this.isTopFighter
    };

    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }

        db.collection('players', function(err, collection){
            if(err) {
                mongodb.close();
                return callback(err);
            }

            collection.insert(player, {
                safe:true
            }, function(err, player){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null, player[0]);	//成功
            });
        });
    });
};

Player.get = function(playerID, callback){
    mongodb.open(function(err, db){
        if(err) {
            return callback(err);
        }
        // 读取players的集合
        db.collection('players', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //查找玩家名(playerID键)值为playerID一个文档
            collection.findOne({"playerID":playerID}, function(err, player){
                mongodb.close();
                if(err) {
                    console.log("Player.get error: " + err.toString());
                    return callback(err);
                }
                callback(null, player);
            });
        });
    });
};
