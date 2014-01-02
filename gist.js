var http = require('http');
var rest = require('restler');

var url = function (response) {
	var gist = JSON.parse(response).gists[0];
	return 'http://gist.github.com/' + gist.repo;
};

exports.url = url;
exports.get = function(id, callback) {
	rest.get('https://api.github.com/gists/'+id).on('complete', callback);
}
exports.create = function (content, callback) {
	var body = 'files[newfile]=' + content;

	var options = {
		host: 'gist.github.com',
		port: 80,
		path: '/api/v1/json/new',
		method: 'POST',
		headers: {
			'host': 'gist.github.com',
			'Content-length': body.length, 
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	};

	var req = http.request(options, function(res) {
		res.body = '';
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			res.body += chunk;
		});
		res.on('end', function () {
			callback.apply(null, [url(res.body)]);
		});
	});

	req.end(body);
};
