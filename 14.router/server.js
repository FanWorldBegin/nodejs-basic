var http = require('http');
var fs = require('fs');

function startServer() {
  var onRequest = function (request, response) {
    console.log('Request received ' + request.url);
    // 如果是首页
    if (request.url === '/' || request.url === '/home') {
      response.writeHead(200, {
        'Content-Type': 'text/html'
      });
      fs.createReadStream(__dirname + '/review.html', 'utf8').pipe(response);
    } else if (request.url === '/review') {
      // 如果是review 路由
      response.writeHead(200, {
        'Content-Type': 'text/html'
      });
      fs.createReadStream(__dirname + '/review.html', 'utf8').pipe(response);
    } else if (request.url === '/api/v1/records') {
      //如果是 api/v1/records 
      response.writeHead(200, {
        'Content-Type': 'application/json'
      });

      var jsonObj = {
        name: "hfpp2012"
      };
      response.end(JSON.stringify(jsonObj));
    } else {
      //什么都没有找到
      response.writeHead(400, {
        'Content-Type': 'text/html'
      });
      fs.createReadStream(__dirname + '/404.html', 'utf8').pipe(response);
    }
  }

  var server = http.createServer(onRequest);

  server.listen(3000, '127.0.0.1');
  console.log('Server started on localhost port 3000');
}
startServer()
exports.startServer = startServer;