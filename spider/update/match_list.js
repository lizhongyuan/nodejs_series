/**
 * Created by svenlee on 16/1/25.
 */

var request = require('request');
var cheerio = require('cheerio');
var debug = require('debug');

request('http://dota2.vpgame.com/guess.html', function(err, res){   // for test
//request(curTaskUrl, function(err, res){
    if(err) return console.error(err);

    var $ = cheerio.load(res.body.toString());

    var spinachItems = $('div.spinach-item');
    console.log(spinachItems.length);

    spinachItems.each(function(){
        var curItem = $(this);
        var matchType = curItem.find('i').attr("class");
        if(matchType != "dota2-icon"){
            //continue;
            return;
        }
        var matchName = curItem.find('span.spinach-league').text();
        //div.spinach-item div.spinach-item-team.pull-left div.spinach-item-data span.ellipsis
        // div.spinach-item div.spinach-item-vs span
        var leftTeam = curItem.find('div.spinach-item-team.pull-left div.spinach-item-data span.ellipsis').text();
        var rightTeam = curItem.find('div.spinach-item-team.pull-right div.spinach-item-data span.ellipsis').text();
        var boNum = curItem.find('div.spinach-item div.spinach-item-vs span').text();
        console.log(rightTeam);
        console.log(boNum);
    });
});

/*
{
var taskUrl = "http://dota2.vpgame.com/guess/default-index.html?ajax=yw1&page=";
var pageNum = $('ul#yw2 li.page').length;

for(i = 1; i <= pageNum; i++) {
    var curTaskUrl = taskUrl + String(i);
    console.log(curTaskUrl);
}

console.log(pageNum);

}
*/
