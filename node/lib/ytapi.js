module.exports = new YtApi();

var  http = require('http');

function YtApi() {}

YtApi.prototype.search = function(query, callback) {
  doGet('/feeds/api/videos?v=2&alt=jsonc&max-results=1&q=' + query, callback);
}

// Private fuctions

function doGet(path, callback) {
  var options, req; 
  options = {
    hostname: 'gdata.youtube.com', 
    port: 80, 
    path: path, 
    method: 'GET'
  };
  console.log('Requesting YouTube API: ' + options.path);
  req = http.request(options, function (res) {
    var json = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      json += chunk;
    });
    res.on('end', function() {
      var ret = JSON.parse(json);
      if(ret.error) {
        callback(ret);
      } else {
        callback(null, ret);
      }
    });
  });
  req.end();
}
