/**
 * Created by svenlee on 16/1/29.
 */

var fibers = require('fibers');

var getCurPageTask = function(curTaskUrl, curIndex, callback) {
    console.log(curIndex);
    var curPageTasks = [];
    request(curTaskUrl, function (err, res) {
        if (err) return callback(err);

        var $ = cheerio.load(res.body.toString());
        var spinachItems = $('div.spinach-item');

        spinachItems.each(function () {
            var curItem = $(this);
            var matchType = curItem.find('i').attr("class");
            if (matchType != "dota2-icon") {
                return;
            }
            var matchName = curItem.find('span.spinach-league').text();
            var leftTeam = curItem.find('div.spinach-item-team.pull-left div.spinach-item-data span.ellipsis').text();
            var rightTeam = curItem.find('div.spinach-item-team.pull-right div.spinach-item-data span.ellipsis').text();
            var boNum = curItem.find('div.spinach-item div.spinach-item-vs span').text();

            curPageTasks.splice(curPageTasks.length, 0, [leftTeam, rightTeam, boNum, matchName]);
        });
        if(curIndex-- <= 0){
            callback(null, curPageTasks);
        }
    });
}
