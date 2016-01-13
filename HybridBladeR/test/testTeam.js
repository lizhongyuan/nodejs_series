/**
 * Created by svenlee on 16/1/11.
 */
var Team = require('../models/team');

var newTeam = new Team({
    id : "1002",
    name : "VG",
    players : [[10021, "Burning"], [10022, "super1"], [10023, "iceiceice"], [10024, "fy"], [10025, "fenir"]],
    region : "CN",
    level : 1,
    ranking : 5,
    stability : 1,
    style : 1,
    topFighters : [1, [10021, "Burning"]],
    topLeaders : [0],
    desc :  "传统强队，成员稳定合作默契，无拖后腿短板，有B神，不直播。\ " +
            "但BP遇强则乱，4号位定位模糊，2号位对线能力偏弱，1号位偏保守（以上严重影响战术制定和执行），\3" +
            "号位大赛不稳，全队皆有不同程度状态下滑。总结起来，虐菜无情，(国际大赛)争冠很难。"
});

/*
var newTeam = new Team();
newTeam.id = "1002";
newTeam.name = "VG";
newTeam.region = "CN";
newTeam.level = 1;
newTeam.ranking = 5;
newTeam.stability = 1;
newTeam.style = 1;
newTeam.topFighters[0] = 1;
newTeam.topFighters[1] = [10021, "Burning"];
newTeam.topLeaders[0] = 0;
newTeam.desc = "传统强队，成员稳定合作默契，无拖后腿短板，有B神，不直播。\ " +
    "但BP遇强则乱，4号位定位模糊，2号位对线能力偏弱，1号位偏保守（以上严重影响战术制定和执行），\3" +
    "号位大赛不稳，全队皆有不同程度状态下滑。总结起来，虐菜无情，(国际大赛)争冠很难。";
newTeam.players.splice(0, 0, [10025, "Fenir"]);
newTeam.players.splice(0, 0, [10024, "Fy"]);
newTeam.players.splice(0, 0, [10023, "Iceiceice"]);
newTeam.players.splice(0, 0, [10022, "Super1"]);
newTeam.players.splice(0, 0, [10021, "Burning"]);
*/

/*
newTeam.save(function(err, team){
    if(err) {
        return;
    }
    console.log("save ok.");
});
*/

Team.get("VG", function(err, team){
    if(err) {
        console.log(err);
    }
    console.log(team.id);
    console.log(team.players[0][0]);
    console.log(team.players[0]);
});
