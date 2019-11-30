// ES5 write
var http = require("http"); // 引入一个http模块 功能包
var fs = require("fs");  //引入fs 文件系统模块
var ws = require("socket.io"); //引入socket.IO模块 下载到本地的node_modules 文件夹里了


var server = http.createServer(function(req,res){ //请求，发送

	var html = fs.readFileSync("./client.html"); // 调用fs模块中的同步读文件方法, ./后面跟的是读取的文件名
	//console.log(html);  

	res.end(html); // 当执行完毕之后发送一个helloworld 重启服务器，
	                        //发现localhost显示helloworld，服务器搭好了
}).listen(3000); //listen port
// return 玩之后一定要监听端口 默认3000端口
//这个服务器创建之后 一旦有用户连接到这个服务器，就会执行函数
//funxtion里面的内容

var io = ws(server); //把http服务与websocket服务相关联 。第五行和第七行. 然后返回io石栗
                      // io就是websocket服务器实例

io.on("connection",function(socket){ //on是监听connection事件。js里面。
	//这个function回调函数发生在用户连接io服务器时。而什么时候接入是未知的，所以用监听的形式
	//socket 负责在登录 断开连接时候 监听
	console.log("有新用户进入房间");

	//接受客户端的消息
	socket.on("message", function(obj){ //监听到消息之后，对消息进行处理.用一个回调函数
		//接受消息之后，进行广播，不是显示。显示是客户端的事情

		console.log("obj"); //接收来自客户端的消息

		io.emit("message",obj); //emit是主动发送事件。 服务器io发给所有已经建立连接的对象obj(客户端)
	}); 
});        

//接下来实现接受消息。建立连接之后，接受消息。