var fs = require('fs');
var txt = "以上程序使用fs.readFileSync从源路径读取文件内容，并使用fs.writeFileSync将文件内容写入目标路径。";

var Promise = require('bluebird');

var pfs = Promise.promisifyAll(fs);

var getFileAsync = function(fileName) {
    return pfs.readFileAsync(fileName, "utf8").then(function(data){
        return String(data);
    });
}

var fileData = getFileAsync("message.txt");
console.log(fileData);
/*
pfs.readFileAsync("message.txt", "utf8").then(function(data) {
    console.log(data);
});
*/

//var fsPromise = pfs.readFileAsync("message.txt", "utf8");

/*
fsPromise.then(function(data){
    console.log(data);
}).catch(function(e){
    console.error(e.stack);
});
*/

/*
// 写入文件
fs.writeFile('message.txt', txt, function (err) {
    if (err) throw err;
    console.log('It\'s saved!'); //文件被保存
});

// 读取文件
fs.readFile('message.txt', 'utf8', function (err, data) {
    if (err) throw err;
    console.log(data);
});
*/