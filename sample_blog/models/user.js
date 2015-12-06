/**
 * Created by svenlee on 15/12/2.
 */

var mongodb = require('./db');

function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
};

module.exports = User;

User.prototype.save = function(callback){
    var user = {
        name: this.name,
        password: this.password,
        email: this.email
    };

    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }

        db.collection('users', function(err, collection){
            if(err) {
                mongodb.close();
                return callback(err);
            }

            collection.insert(user, {
                safe:true
            }, function(err, user){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null, user[0]);	//成功
            });
        });
    });
};

User.get = function(name, callback){
    mongodb.open(function(err, db){
        if(err) {
            return callback(err);
        }
        // 读取users集合
        db.collection('users', function(err, collection){
            if(err){
                mongo.close();
                return callback(err);
            }
            //查找用户名(name键)值为name一个文档
            collection.findOne({name:name}, function(err, user){
                mongodb.close();
                if(err) {
                    return callback(err);
                }
                callback(null, user);
            });
        });
    });
};

