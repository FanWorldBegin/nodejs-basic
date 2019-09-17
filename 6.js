// var fs = require('fs');
// //同步方法
// var readMe = fs.readFileSync('6.readMe.txt', 'utf8');

// fs.writeFileSync('6.writeMe.txt', '写入需要传入的文字');

var fs = require('fs')
//异步读取
var readMe = fs.readFile("readMe.txt", "utf8", function (err, data) {
  fs.writeFile('writeMe.txt', data, function () {
    console.log('writeMe has finished');
  })
});

//等待4秒会造成阻塞
// var waitTill = new Date(new Date().getTime() + 4 * 1000);
// while (waitTill > new Date()) {}

//先执行这个
console.log("finished");