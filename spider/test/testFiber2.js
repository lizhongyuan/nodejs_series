/**
 * Created by svenlee on 16/1/29.
 */
var Fiber = require('fibers');
//var http = require("http");
var request = require('request');

Fiber(function(){
    var curFiber = Fiber.current;
    setTimeout(function(){
            console.log("aaa");
            curFiber.run();
        }, 3000
    );
    Fiber.yield();
    console.log("000");
}).run();

/*
Fiber(function () {
    var httpFiber = Fiber.current;
    var html = "";
    http.get("http://www.baidu.com", function (res) {
    //request("http://www.baidu.com", function (res) {
        var dataFiber = Fiber.current;
        res.on("data", function (data) {
            html += data;
        });
        res.on("end", function (data) {
            httpFiber.run();
        });
    });
    Fiber.yield();
    console.log(html);
}).run();
*/
