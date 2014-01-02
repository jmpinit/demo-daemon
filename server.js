var express = require('express');
var app = express();

var gist = require('./gist.js');

app.configure(function(){
	app.use(express.static(__dirname + '/public'));
});

/*app.get("/size/:file", function(req, res) {
	var fn = './media/' + req.params.file;
	fs.exists(fn, function(exists) {
		if(exists) {
			fs.stat(fn, function(error, stats) {
				console.log(fn);
				console.log(stats.size);

				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.write(stats.size.toString());
				res.end();
			});
		}
	});
});*/

/*app.get("/media", function(req, res) {
	fs.readdir('./media', function(err, files) {
		var body = "";

		if(!err) {
			body = { files: files };

			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.write(JSON.stringify(body));
			res.end();

			console.log('directory listing via /media');
		} else {
			res.writeHead(500, "Could not get directory listing.", {'Content-Type': 'text/html'});
			res.end();
		}
	});
});*/

app.get("/add/user", function(req, res) {
	gist.get("7836051", function(data) {console.log(data.files.makefile.content);});
	
	res.writeHead(200, "OK", {'Content-Type': 'text/html'});
	console.log("OK");

	res.end();
});

app.put("/add/user", function(req, res) {
	var valid = false;

	console.log(gist.get("7836051"));

	req.on('data', function(chunk) {
		var data = JSON.parse(chunk);
		console.log('vetting new user named ' + data.name);

		//if(/* TODO user exists */)) {
			res.writeHead(200, "OK", {'Content-Type': 'text/html'});
			console.log("OK");
		/*} else {
			res.writeHead(400, "Bad Request", {'Content-Type': 'text/html'});
			console.log("Bad Request");
		}*/

		res.end();
	});
});

app.listen(3000);
console.log('Listening on port 3000');
