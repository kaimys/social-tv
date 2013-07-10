module.exports = new CouchDB();

var  http = require('http');

function CouchDB() {

}

CouchDB.prototype.getProgramm = function(id, callback) {
  var options, req; 
  options = {
    hostname: 'localhost', 
    port: 5984, 
    path:'/emotv/' + id, 
    method: 'GET'
  };
  req = http.request(options, function (res) {
    var json = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      json += chunk;
    });
    res.on('end', function() {
      callback(JSON.parse(json));
    });
  });
  req.end();
}
