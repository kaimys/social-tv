var db = require('./lib/CouchDB.js'),
    yt = require('./lib/YtApi.js'),
    opt = require('optimist'),
    argv = opt.argv,
    util = require('util');

opt.usage('Usage: $0 generate\n'
          +'       $0 youtube [query]');

if(argv._[0] == 'youtube') {
  
  yt.search(argv._[1], function(err, data) {
    if(err) {
      console.log('Error: ' + JSON.stringify(err));
      return;
    }
    if(data && data.data && data.data.totalItems > 0) {
      console.log(data.data.items[0]);
      db.programmTemplate(data.data.items[0], function(err, fn) {
        if(err) {
          console.log('Error: ' + JSON.stringify(err));
          return;
        }
        console.log('Template ' + fn + ' generated. Use \'couchapp push emotv\' to store in data base.');
      });
    } else {
      console.log(data.totalItems);
    }
    
  });

}