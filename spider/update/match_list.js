/**
 * Created by svenlee on 16/1/25.
 */

var request = require('request');
var cheerio = require('cheerio');
var debug = require('debug');
var async = require('async');

var promise = require("bluebird");
//使用bluebird将request库的所有异步方法编译成promise形式，会自动加上Async后缀
request = promise.promisifyAll(request);

//var totalPageTasks = [];

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


//var getTasks = function(pageNum, callback) {
var getTasks = function(pageNum, totalPageTasks, callback) {
    var preUrl = "http://dota2.vpgame.com/guess/default-index.html?ajax=yw1&page=";
    var urlList = [];
    for(var i = 1; i <= pageNum; i++){
        /*
        var curPageUrl = preUrl + String(i);
        getCurPageTask(curPageUrl, function(err, array){
            totalPageTasks += array;
            callback(totalPageTasks);
        });
        */
        var curPageUrl = preUrl + String(i);
        urlList.splice(urlList.length, 0, curPageUrl);
    }
    //console.log(urlList);
    //var totalPageTasks = [];

    async.eachSeries(urlList, function(curPageUrl, next){
        getCurPageTask(curPageUrl,pageNum, function(err, array){
            totalPageTasks += array;
            //console.log(totalPageTasks);
        });
        next();
    }, function(err){
        console.log("...");
        callback(totalPageTasks);
    });
}

getTasks(2, [], function(totalPageTasks){
    //console.log(totalPageTasks)
});
