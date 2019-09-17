var fs = require('fs');

//新建一个目录
fs.mkdir('stuff', function () {
  //读取文件
  fs.readFile('6.readMe.txt', 'utf8', function (err, data) {
    //将文件放入新创建的目录
    fs.writeFile('./stuff/writeMe.txt', data, function () {
      console.log('copy successfully');
    })
  })
});

// //删除文件
// fs.unlink("6.writeMe.txt", function() {
//     console.log("delete writeMe.txt file");
// })