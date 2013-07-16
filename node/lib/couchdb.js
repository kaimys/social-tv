module.exports = new CouchDB();

var  http = require('http'),
     fs = require('fs'),
     dbPath = '/emotv/';

function CouchDB() {

}

CouchDB.prototype.getProgramm = function(id, callback) {
  doGet(dbPath + id, callback);
}

CouchDB.prototype.getNextProgramm = function(callback) {
  doGet(dbPath + "_design/emotv-db/_view/schedule?startkey=\"" + (new Date()).toISOString() + "\"&limit=1", callback);
}

CouchDB.prototype.programmTemplate = function(callback) {
  doGet('/_uuids', function(err, res) {
    var prog, filename;
    if(err) {
      callback(err);
    } else if(res.uuids && res.uuids.length > 0) {
      prog = {
        "type": "program",

        "name": "Lanz am 29.01.2013",
        "description": "Katrin Sass beschimpft Peer Kusmagk - Orginal Demo des TV Hackdays",
        "fortmat": "Lanz",
        "original_url": "http://www.youtube.com/watch?v=X311kXUMp9s",

        "start": "2013-07-05T20:15:00Z",
        "end": "2013-07-12T20:15:00Z",
        "repeat": "once",

        "video": {
          "src": "http://www.eightnine.de/emo-tv/shows/lanz.mp4",
          "type": "video/mp4",
          "length": 182.360,
          "bitrate": 537.730,
          "size": 12315580
        },

        "objects": {
          "markuslanz": {
            "id": "markuslanz",
            "name": "Markus Lanz",
            "img_src": "pic/markuslanz.png"
          }
        },

        "actions" : {
          "right": {
            "sentence": "%X unterstützt %Y",
            "img_src": "emo/richtig.png"
          }
        }
      };
      
      filename = 'couchapp/_docs/' + res.uuids[0] + '.json';
      fs.writeFile(filename, JSON.stringify(prog, null, 2), function (err) {
        if (err) {
          callback(err);
        } else {
          callback(null, filename);
        }
      });
    } else {
      callback('CouchDB did not return UUID but ' + JSON.stringify(ret));
    }
  });
}

// Private fuctions

function doGet(path, callback) {
  var options, req; 
  options = {
    hostname: 'localhost', 
    port: 5984, 
    path: path, 
    method: 'GET'
  };
  console.log('Requesting CouchDB: ' + options.path);
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
