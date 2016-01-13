/**
 * Created by svenlee on 16/1/10.
 */
var mongodb = require('./db');

module.exports = Team;

function Team(){}

function Team(team) {
    this.id = team.id;
    this.name = team.name;
    this.players = team.players;
    this.region = team.region;
    this.level = team.level;
    this.ranking = team.ranking;
    this.stability = team.stability;
    this.style = team.style;
    this.topFighters = team.topFighters;
    this.topLeaders = team.topLeaders;
    this.desc = team.desc;
};

Team.prototype.save = function(callback){
    var team = {
        id : this.id,
        name : this.name,
        players : this.players,
        region : this.region,
        level : this.level,
        ranking : this.ranking,
        stability : this.stability,
        style : this.style,
        topFighters : this.topFighters,
        topLeaders : this.topLeaders,
        desc : this.desc
    };

    mongodb.open(function(err, db){
        if(err) {
            return callback(err);
        }

        db.collection('teams', function(err, collection){
            if(err) {
                mongodb.close();
                return callback(err);
            }
            collection.insert(team, {safe:true}, function(err, team){
                mongodb.close();
                if(err) callback(err);
                callback(null, team[0]);    // 又可能插入的不是一个数据
            });
        });
    })
}

Team.get = function(teamName, callback){
    mongodb.open(function(err, db){
        if(err) callback(err);
        db.collection('teams', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.findOne({"name":teamName}, function(err, team){
                mongodb.close();
                if(err) callback(err);
                callback(null, team);
            });
        })
    })
}
