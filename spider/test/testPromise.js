var rp = require('request-promise');
//var rp = require('request');

var cheerio = require('cheerio'); // Basically jQuery for node.js


/*
var options = {
    uri: 'http://www.google.com',
    transform: function (body) {
        return cheerio.load(body);
    }
};
rp(options)
    .then(function ($) {
        // Process html like you would with jQuery...
    })
    .catch(function (err) {
        // Crawling failed or Cheerio choked...
    });
    */
var options = {
    url: 'http://dota2.vpgame.com/guess/default-index.html?ajax=yw1&page=1',
    transform: function(body){
        return cheerio.load(body);
    }
}

var totalOptions = [{
    url: 'http://dota2.vpgame.com/guess/default-index.html?ajax=yw1&page=1',
    transform: function (body) {
        return cheerio.load(body);
    }
}, {
    url: 'http://dota2.vpgame.com/guess/default-index.html?ajax=yw1&page=2',
    transform: function(body){
        return cheerio.load(body);
    }
}, {
    url: 'http://dota2.vpgame.com/guess/default-index.html?ajax=yw1&page=3',
    transform: function(body){
        return cheerio.load(body);
    }
}
];


var getCurPageTask2 = function(options) {
    rp(options).then(function ($) {
        var spinachItems = $('div.spinach-item');
        var curPageTasks = [];

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
        return curPageTasks;
    });
}

var getCurPageTask = function(options, callback) {
    var curPageTasks = [];
    rp(options).then(function ($) {
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
        //callback(null, curPageTasks);
        console.log(curPageTasks);
        callback(null, curPageTasks);
    });
}

var getTasks = function(totalOptions, totalTaskArray, callback) {
    for(var i = 0; i < totalOptions.length; i++) {
        getCurPageTask(totalOptions[i], function(err, curPageTasks){
            totalTaskArray += curPageTasks;
        });
    }
    //console.log(totalTaskArray);
    callback(totalTaskArray);
}

getTasks(totalOptions, [], function(totalTaskArray){
    console.log("Fuck");
})

/*
getCurPageTask(options,function(err, curPageTasks){
    console.log(curPageTasks);
});
*/

/*
var resArray = getCurPageTask2(options);
console.log(resArray);
*/

