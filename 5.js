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

xiaoming.emit('speak', 'hi');
lucy.emit('speak', 'I want a curry');
