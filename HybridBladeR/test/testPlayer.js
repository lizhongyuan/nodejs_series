/**
 * Created by svenlee on 15/12/23.
 */

console.log("test into db.");
var Player = require('../models/player');

var testPlayer = new Player({
    id : "30013",
    playerID: "Universe",
    team : "EG",
    level : "1",
    stability : "1",
    role : "3",
    style : "3",
    isTopLeader : "1",
    isTopFighter : "1"
});

testPlayer.save(function(err, player){
    console.log("save the test player.");
});

/*
Player.get('0', function(err, player){
    console.log(player.id);
});
*/

