/**
 * Created by svenlee on 16/1/15.
 */

Team = require("../models/team.js");

BIG = parseInt(100, 2);
MIDDLE = parseInt(10, 2);
SMALL = parseInt(1, 2);
NULL = parseInt(1000, 2);

var bet = function(teams) {
    var team1 = teams[0], team2 = teams[1];
    var higherTeam= (team1.level > team2.level? team1:team2);
    var lowerTeam= (team1.level <= team2.level? team1:team2);

    if(higherTeam.level >= lowerTeam.level + 2) {
        return BIG;
    }

    if(higherTeam.rank - lowerTeam.rank >= 7) {
        return BIG;
    }

    if(higherTeam.stability > lowerTeam.stability) {
        if(higherTeam.style > lowerTeam.style) {
            return MIDDLE;
        }
        else {
            return SMALL;
        }
    }
    else {
        if( higherTeam.style >= lowerTeam.style + 2) {
            return MIDDLE + SMALL;
        }
        else {
            return SMALL;
        }
    }
}

