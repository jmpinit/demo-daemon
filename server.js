var http = require('http');
var express = require('express');
var app = express();

var server = http.createServer(app);
var io = require('socket.io').listen(server);

var gist = require('./gist.js');

app.configure(function(){
	app.use(express.static(__dirname + '/public'));
});

app.get("/add/user", function(req, res) {
	gist.get("8225527", function(data) {console.log(data.files.makefile.content);});
	
	res.writeHead(200, "OK", {'Content-Type': 'text/html'});
	console.log("OK");

	res.end();
});

app.get("/update/:id", function(req, res) {
	var id = req.params.id;
	console.log("updating gist "+id);

	gist.get(id, function(code) {
		var sourcecode = null;
		for(var fn in code.files) {
			sourcecode = code.files[fn].content;
			break;
		}

		if(sourcecode != null) {
			io.sockets.emit('code', sourcecode);
		}
	});

	res.writeHead(200, "OK", {'Content-Type': 'text/html'});
	console.log("OK");

	res.end();
});

/*app.put("/user", function(req, res) {
	var valid = false;

	req.on('data', function(chunk) {
		var data = JSON.parse(chunk);
		console.log('vetting new user named ' + data.name);

		if(true) {
			res.writeHead(200, "OK", {'Content-Type': 'text/html'});
			console.log("OK");
		} else {
			res.writeHead(400, "Bad Request", {'Content-Type': 'text/html'});
			console.log("Bad Request");
		}

		res.end();
	});
});*/

var display = null;
io.sockets.on('connection', function(socket) {
	var address = socket.handshake.address.address;
	console.log("connection " + address + " accepted.");

	display = socket;

	socket.on('disconnect', function() {
		display = null;
		console.log("screen disconnected.");
	});
});

server.listen(3000);
console.log('Listening on port 3000');
