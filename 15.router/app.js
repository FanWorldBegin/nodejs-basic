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