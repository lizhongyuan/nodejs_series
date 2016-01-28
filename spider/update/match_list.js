/**
 * Created by svenlee on 16/1/25.
 */

var request = require('request');
var cheerio = require('cheerio');
var debug = require('debug');

var totalPageTasks = [];

//request('http://dota2.vpgame.com/guess.html', function(err, res){   // for test
var getCurPageTask = function(curTaskUrl, callback) {
    var curPageTasks = [];
    request(curTaskUrl, function (err, res) {
        if (err) return callback(err);

        var $ = cheerio.load(res.body.toString());
        var spinachItems = $('div.spinach-item');
        /*
        console.log(spinachItems.length);
        */

        spinachItems.each(function () {
            var curItem = $(this);
            var matchType = curItem.find('i').attr("class");
            if (matchType != "dota2-icon") {
                //continue;
                return;
            }
            var matchName = curItem.find('span.spinach-league').text();
            var leftTeam = curItem.find('div.spinach-item-team.pull-left div.spinach-item-data span.ellipsis').text();
            var rightTeam = curItem.find('div.spinach-item-team.pull-right div.spinach-item-data span.ellipsis').text();
            var boNum = curItem.find('div.spinach-item div.spinach-item-vs span').text();

            curPageTasks.splice(curPageTasks.length, 0, [leftTeam, rightTeam]);
        });
        callback(null, curPageTasks);
    });
    //console.log("-------");
}


var getTasks = function(pageNum, callback) {
    var preUrl = "http://dota2.vpgame.com/guess/default-index.html?ajax=yw1&page=";
    for(var i = 1; i <= pageNum; i++){
        var curPageUrl = preUrl + String(i);
        getCurPageTask(curPageUrl, function(err, array){
            totalPageTasks += array;
            console.log(array);
        });
    }
    callback(totalPageTasks)
}

getTasks(2, function(){
    console.log(totalPageTasks)
});
