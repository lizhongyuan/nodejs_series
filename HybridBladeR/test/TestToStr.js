/**
 * Created by svenlee on 16/1/15.
 */

var teams = ["EG", "Ehome"];
console.log(teams.length)

var toTheStr = function(pArray) {
    var resStr = "";
    for (var i = 0; i < pArray.length; i++) {
        var curItemStr = "\"" + String(pArray[i]) + "\"";
        resStr += curItemStr;
        if (i != pArray.length - 1)
            resStr += ","
    }
    return resStr;
}

console.log(toTheStr(teams));

//db.teams.find({'name':{"$in":['EG','Ehome']}})

var option = "{'name':{\"$in\":" + toTheStr(teams) + "}}"
console.log(option);
