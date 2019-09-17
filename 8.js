// // 解压
// var crypto = require('crypto');
// var fs = require('fs');
// var zlib = require('zlib');

// var password = new Buffer(process.env.PASS || 'password');
// var decryptStream = crypto.createDecipher('aes-256-cbc', password);

// var gzip = zlib.createGunzip();
// var readStream = fs.createReadStream(__dirname + '/out.gz');

// readStream // reads current file
//   .pipe(gzip) // uncompresses
//   .pipe(decryptStream) // decrypts
//   .pipe(process.stdout) // writes to terminal
//   .on('finish', function () { // finished
//     console.log('done');
//   });

// 压缩
var crypto = require('crypto');
var fs = require('fs');
var zlib = require('zlib');

var password = new Buffer.from(process.env.PASS || 'password');
var encryptStream = crypto.createCipher('aes-256-cbc', password);

var gzip = zlib.createGzip();
var readStream = fs.createReadStream(__dirname + "/6.readMe.txt"); // current file
var writeStream = fs.createWriteStream(__dirname + '/out.gz');

readStream // reads current file
  .pipe(encryptStream) // encrypts
  .pipe(gzip) // compresses
  .pipe(writeStream) // writes to out file
  .on('finish', function () { // all done
    console.log('done');
  });


// // 流和管道
// var fs = require('fs');

// //__dirname 当前目录
// //createReadStream创建输入流， 
// var myReadStream = fs.createReadStream(__dirname + '/6.readMe.txt',);
// //写入一个流
// var myWriteStream = fs.createWriteStream(__dirname + '/6.writeMe.txt')
// myReadStream.setEncoding('utf8');
// myReadStream.pipe(myWriteStream);


// var  data = ''
// //流是事件的实例
// myReadStream.on('data', function (chunk) {
//   console.log('new chunk received');
//   //data += chunk
//   myWriteStream.write(chunk)
// })

// //接受完数据
// myReadStream.on('end', function () {
//   console.log(data);
// })