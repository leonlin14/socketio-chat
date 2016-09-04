var http = require('http');
var url = require('url');
var fs = require('fs');
var io = require('socket.io');
var moment = require('moment');

var server = http.createServer(function(req, res){
	console.log('Connection');
	var path = url.parse(req.url).pathname;

	switch (path) {
		case '/':
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.write('Hello, World.');
			res.end();
		break;
		case '/socket.html':
			fs.readFile(__dirname + path, function(error, data) {
				if (error){
					res.writeHead(404);
					res.write("opps this doesn't exist - 404");
				} else {
					res.writeHead(200, {"Content-Type": "text/html"});
					res.write(data, "utf8");
				}
				res.end();
			});
		break;
		default:
			res.writeHead(404);
			res.write("opps this doesn't exist - 404");
			res.end();
		break;
	}
});

var port = 3001;
server.listen(port, function() {
	console.log('Server running at http://localhost:' + port);
});

var serv_io = io.listen(server);

serv_io.sockets.on('connection', function(socket) {
	// socket.emit('data', {
	// 	'message': 'Hello World!!' 
	// });

 //    setInterval(function() {
	// 	socket.emit('date', {
	// 		'time': moment().format('HH:mm:ss')
	// 	});
	// }, 1000);

	socket.on('client_data', function(data) {
		socket.emit('data', {
			'message': data.message,
			'time': moment().format('HH:mm:ss')
		});
	});

	// socket.on('client_data', function(data) {
	// 	console.log(data.message)
	// });
});