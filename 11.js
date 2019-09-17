var http = require('http');
var fs = require('fs');

var onRequest = function (request, response) {
  console.log('Request received');
  response.writeHead(200, {
    'Content-Type': 'text/html'
  });
  //通过流读取出出来
  var myReadStream = fs.createReadStream(__dirname + '/11.index.html', 'utf8');
  // response.write('Hello from out application');
  //使用管道将文件输出到响应中
  myReadStream.pipe(response);
}

var server = http.createServer(onRequest);

server.listen(3000, '127.0.0.1');
console.log('Server started on localhost port 3000');