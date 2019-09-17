var http = require('http');

var onRequest = function (request, response) {
  console.log('Request received');
  //写入头信息
  //Content-Type 传入什么类型内容 - text/plain 纯文本
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  response.write('Hello from out application ');
  //结束
  response.end('request end');
}

var server = http.createServer(onRequest);
//监听在3000 端口
server.listen(3000, '127.0.0.1');
console.log('Server started on localhost port 3000');