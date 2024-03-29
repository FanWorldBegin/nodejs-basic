# nodejs 基础总结

## 1.全局对象 __dirname __filename
 * __filename 获得当前执行文件所在目录的完整目录名
* __dirname  获得当前执行文件的带有完整绝对路径的文件名
```javascript
console.log(__dirname);
console.log(__filename);

// require exports

var time = 0;

var timer = setInterval(function() {
    time += 2;
    console.log(time + " seconds have passed");
    if (time > 5) {
        clearInterval(timer);
    }
}, 2000);
```

输出
![image](https://github.com/FanWorldBegin/nodejs-basic/blob/master/images/1.png)

## 2.回调函数
```javascript

function callFunction(fun, name) {
    fun(name);
}

callFunction(function(name) {
    console.log(name + ' Bye');
}, 'rails365');

var sayBye = function(name) {
  console.log('hi')
}
```

## 3.模块require
4.app.js
```javascript
var stuff = require('./count');

// var pi = require('./count').pi;

console.log(stuff.counter(['ruby', 'nodejs', 'react']));
console.log(stuff.adder(3));
// console.log(pi);
```

4.count.js
```javascript
var adder = function(a) {
    return `the sum of the 2 numbers is ${a+pi}`;
}

var pi = 3.14;

module.exports = {
    counter: function(arr) {
        return "There are " + arr.length + " elements in the array";
    },
    adder: adder
}
```
## 4.事件
```javascript
// var events = require('events');
// // 新增事件
// var myEmitter = new events.EventEmitter();
// // 给事件绑定函数
// myEmitter.on('someEvent', function(message) {
//     console.log(message);
// })
// //触发事件
// myEmitter.emit('someEvent', 'the event was emitted');

var events = require('events');
// 可以用class  表示继承
var util = require('util');

var Person = function (name) {
  this.name = name
}

util.inherits(Person, events.EventEmitter);

var xiaoming = new Person('xiaoming');
var lili = new Person('lili');
var lucy = new Person('lucy');

var person = [xiaoming, lili, lucy];

person.forEach(function (person) {
  person.on('speak', function (message) {
    console.log(person.name + " said: " + message);
  })
})

//触发事件
xiaoming.emit('speak', 'hi');
lucy.emit('speak', 'I want a curry');

```

## 5.读写文件（同步，异步）

### 1.同步方法读出文件并写入新文件，按照顺序执行，可能会堵塞，排队执行
```javascript 
var fs = require('fs');
//同步方法
var readMe = fs.readFileSync('6.readMe.txt', 'utf8');

fs.writeFileSync('6.writeMe.txt', readMe');
```

### 1.异步读取readFile
```javascript
var fs = require('fs')
//异步读取
var readMe = fs.readFile("readMe.txt", "utf8", function (err, data) {
  fs.writeFile('writeMe.txt', data, function () {
    console.log('writeMe has finished');
  })
});
//先执行这个
console.log("finished");
```

## 7.创建和删除目录 fs.unlink

### 1.创建一个目录
```javascript
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
```

### 2.删除一个目录
```javascript
//删除文件
fs.unlink("6.writeMe.txt", function() {
    console.log("delete writeMe.txt file");
})
```

## 8 流和管道
ls | grep app 这个命令在 linux 或 mac 才适合，或者 windows 的 git bash 也可以的。
如果是 windows 的命令提示符，对应的查找文件的命令应该是： dir | findstr app
### 提高性能
文件系统读取时是一次性把文件放入内存中，如果文件很大，可以用流处理，会先把内容放在buffer 缓存中
### 在nodejs中，有四种stream类型：
* Readable：用来读取数据，比如 fs.createReadStream()。
* Writable：用来写数据，比如 fs.createWriteStream()。
* Duplex：可读+可写，比如 net.Socket()。
* Transform：在读写的过程中，可以对数据进行修改，比如 zlib.createDeflate()（数据压缩/解压）。

### 1.读取流的实例
```javascript
// 流和管道
var fs = require('fs');

//__dirname 当前目录
//createReadStream创建输入流， 
var myReadStream = fs.createReadStream(__dirname + '/6.readMe.txt',);
//写入一个流
var myWriteStream = fs.createWriteStream(__dirname + '/6.writeMe.txt');

myReadStream.setEncoding('utf8');
var  data = ''
//流是事件的实例
myReadStream.on('data', function (chunk) {
  console.log('new chunk received');
  //data += chunk
  myWriteStream.write(chunk)
})

//接受完数据后的处理事件
myReadStream.on('end', function () {
  console.log(data);
})
```

### 2.使用管道快速读文件，并写文件
```javascript
// 流和管道
var fs = require('fs');

//__dirname 当前目录
//createReadStream创建输入流， 
var myReadStream = fs.createReadStream(__dirname + '/6.readMe.txt',);
//写入一个流
var myWriteStream = fs.createWriteStream(__dirname + '/6.writeMe.txt')
myReadStream.setEncoding('utf8');
myReadStream.pipe(myWriteStream);
```

## 9. web 服务器介绍

![image](https://github.com/FanWorldBegin/nodejs-basic/blob/master/images/2.png)

```javascript
server.listen(3000, '127.0.0.1');

下面两个都可以向页面写入文本。
  response.write('Hello from out application ');
  //结束
  response.end(' + request end');
```

## 10 web 服务器响应 JSON
```javascript

var http = require('http');
var onRequest = function(request, response) {
    console.log('Request received');
    response.writeHead(200, { 'Content-Type': 'application/json' });
    // response.write('Hello from out application');
    var myObj = {
        name: "hfpp2012",
        job: "programmer",
        age: 27
    };
    response.end(JSON.stringify(myObj));
}

var server = http.createServer(onRequest);

server.listen(3000, '127.0.0.1');
console.log('Server started on localhost port 3000');
```
![image](https://github.com/FanWorldBegin/nodejs-basic/blob/master/images/3.png)
![image](https://github.com/FanWorldBegin/nodejs-basic/blob/master/images/4.png)
response.end(JSON.stringify(myObj));
 * JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。用于传输
![image](https://github.com/FanWorldBegin/nodejs-basic/blob/master/images/5.png)

* 反序列化JSON.parse
* ![image](https://github.com/FanWorldBegin/nodejs-basic/blob/master/images/6.png)

## 11 web 服务器 响应 HTML 页面
如何响应HTML 页面
提供·HTML 文件给浏览器，把内容响应到浏览器中
### index.html
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>lalala</title>
</head>

<body>
    hello wolrd
</body>

</html>
```

11.js
```javascript
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
```

## 12 web 服务器 用模块
### 12.js
```javascript
var http = require('http');
var fs = require('fs');

function startServer() {
  var onRequest = function (request, response) {
    console.log('Request received');
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
    // response.write('Hello from out application');
    myReadStream.pipe(response);
  }

  var server = http.createServer(onRequest);

  server.listen(3000, '127.0.0.1');
  console.log('Server started on localhost port 3000');
}

exports.startServer = startServer;
```


## 12.app.js
```javascript
var server = require('./12');
server.startServer();
```

## 13 web 服务器 路由
进入不同的路由请求不同的资源。
* request.url 可以识别不同的路由
### server.js
```javascript
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

```


### review.html
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    review page
</body>

</html>
```

### 404.html
```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    404 error page
</body>

</html>
```

## 14.路由重构代码
### app.js
```javascript
var server = require('./server');
var router = require('./router');
//处理函数跳转
var handler = require('./handler');

//定义 路由和处理的对应
var handle = {};
handle["/"] = handler.home;
handle['/home'] = handler.home;
handle['/review'] = handler.review;
handle['/api/v1/records'] = handler.api_records;

//将参数传入server
server.startServer(router.route, handle);
```


### server.js
```javascript
var http = require('http');
var fs = require('fs');

function startServer(route, handle) {
  var onRequest = function (request, response) {
    console.log('Request received ' + request.url);
    route(handle, request.url, response);
  }

  var server = http.createServer(onRequest);

  server.listen(3000, '127.0.0.1');
  console.log('Server started on localhost port 3000');
}

module.exports.startServer = startServer;
```


### router.js
```javascript
var fs = require('fs');

function route(handle, pathname, response) {
    console.log('Routing a request for ' + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response);
    } else {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(__dirname + '/404.html', 'utf8').pipe(response);
    }
}

module.exports.route = route;

```



### handler.js

```javascript
var fs = require('fs');

function home(response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(__dirname + '/index.html', 'utf8').pipe(response);
}

function review(response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(__dirname + '/review.html', 'utf8').pipe(response);
}

function api_records(response) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    var jsonObj = {
        name: "hfpp2012"
    };
    response.end(JSON.stringify(jsonObj));
}

module.exports = {
    home: home,
    review: review,
    api_records: api_records
}
```

## 15 web 服务器 使用 GET 或 POST 请求发送数据
server.js
1. 获取参数
解析3000端口后的内容， 加上true返回 json 否则返回字符串
var params = url.parse(request.url, true).query;
server.js
var url = require('url');  url的工具库
```javascript

var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

function startServer(route, handle) {
    var onRequest = function(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log('Request received ' + pathname);
        var data = [];
        request.on("error", function(err) {
            console.error(err);
        }).on("data", function(chunk) {
            data.push(chunk);
        }).on('end', function() {
            if (request.method === "POST") {
                if (data.length > 1e6) {
                    request.connection.destroy();
                }
                data = Buffer.concat(data).toString();
                route(handle, pathname, response, querystring.parse(data));
            } else {
                var params = url.parse(request.url, true).query;
                route(handle, pathname, response, params);
            }
        });
    }

    var server = http.createServer(onRequest);

    server.listen(3000, '127.0.0.1');
    console.log('Server started on localhost port 3000');
}

module.exports.startServer = startServer;
```