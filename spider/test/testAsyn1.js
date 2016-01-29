/**
 * Created by svenlee on 16/1/21.
 */

var async = require('async');

var arr = [1, 2, 3, 4, 5];

async.eachSeries(arr, function(item, done){
    setTimeout(function(){
        console.log(item);
        done();
    }, Math.random()* 4000);
}, function(err){
    if(err) {
        console(err);
    }
});

/*
async.each(arr, function(item, done){
    //通过setTimeout来模拟一个异步任务
    setTimeout(function(){
        console.log(item);
        done();
    }, Math.random() * 10000);
}, function(err){
    if(err) throw err;
    console.log('完成');
});
*/

/*
//async.each(arr, function(item){
async.eachSeries(arr, function(item){
    //通过setTimeout来模拟一个异步任务
    setTimeout(function(){
        console.log(item);
        //done();
    }, Math.random() * 5000);
}, function(err){
    if(err) throw err;
    console.log('完成');
});
*/
