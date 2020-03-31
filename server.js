var http = require('http');
var txt = {"userinfo":[
	{"name":"Leo", "password":"qwert"},
	{"name":"Neptune", "password":"12345"},
	{"name":"Charles", "password":"lalalalala"}
]};
var userinfo = eval("("+txt+")");

http.createServer(function (request, response) {

	// 发送 HTTP 头部 
	// HTTP 状态值: 200 : OK
	// 内容类型: text/plain
	response.writeHead(200, {'Content-Type': 'text/plain'});

	// 发送响应数据 "Hello World"
	response.end('Hello World\n'+userinfo[1].name+': '+userinfo[1].password);
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');