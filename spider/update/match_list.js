/**
 * Created by svenlee on 16/1/25.
 */

var request = require('request');
var cheerio = require('cheerio');
var debug = require('debug');
var Fiber = require('fibers');


/*
 * 从curTaskUrl中抓取比赛信息，回调函数callback(err, curPageTasks),
 * 第二个参数为结果
 */
var getCurPageTask = function(curTaskUrl, callback) {
    var curPageTasks = [];      //结果
    Fiber(function() {
        var curFiber = Fiber.current;       //拿到当前Fiber

        request(curTaskUrl, function (err, res) {
            if (err) {
                return callback(err);
            }

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
            callback(null, curPageTasks);
            curFiber.run();
        });     // request end;
        Fiber.yield();
        return curPageTasks;
    }).run();
}


/*
 *
 */
var getNumPageTasks = function(feedUrl, pageNum, totalPageTasks, callback) {
    Fiber(function(){
        var curFiber = Fiber.current;
        for(var i = 1; i <= pageNum; i++){
            var curPageUrl = feedUrl + String(i);
            getCurPageTask(curPageUrl, function(err, array){
                totalPageTasks = totalPageTasks.concat(array);
                if(i == pageNum){
                    callback(pageNum, i, totalPageTasks);
                }
                curFiber.run(); //解除阻塞
            });
            Fiber.yield();      // 阻塞
        }
    }).run();
}

/*
var getPageNum = function(url){
    var pageNum;
    Fiber(function(){
        var curFiber = Fiber.current;
        request(url, function(err, res){
            if(err) {
                throw DOMException;
            }

            var $ = cheerio.load(res.body.toString());
            var spinachItems = $('div.pager li.page');
            pageNum = spinachItems.length;
            curFiber.run();
        });
        Fiber.yield();
        console.log(pageNum);
    }).run();
}
*/
var getPageNum = function(url, callback){
    var pageNum;
    Fiber(function(){
        var curFiber = Fiber.current;
        request(url, function(err, res){
            if(err) {
                throw DOMException;
            }

            var $ = cheerio.load(res.body.toString());
            var spinachItems = $('div.pager li.page');
            pageNum = spinachItems.length;
            callback("", pageNum);
            curFiber.run();
        });
        Fiber.yield();
    }).run();
}

var getTasks = function() {
    var feedUrl = "http://dota2.vpgame.com/guess/default-index.html?ajax=yw1&page=";
    var pageNum = getPageNum("http://dota2.vpgame.com/guess.html");
    console.log(pageNum);
}

getTasks();

/*
getNumPageTasks("http://dota2.vpgame.com/guess/default-index.html?ajax=yw1&page=", 2, [], function(pageNum, i, totalPageTasks){
    console.log(totalPageTasks);
    console.log(totalPageTasks.length);
});
*/
var  res = getCurPageTask("http://dota2.vpgame.com/guess/default-index.html?ajax=yw1&page=", function(){

});
console.log(res);
