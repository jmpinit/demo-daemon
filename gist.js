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
