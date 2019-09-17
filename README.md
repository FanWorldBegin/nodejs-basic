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