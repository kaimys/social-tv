var db = require('./lib/CouchDB.js');

db.programmTemplate(function(err, fn) {
  if(err) {
    console.log('Error: ' + JSON.stringify(err));
    return;
  }
  console.log('Template ' + fn + ' generated. Use \'couchapp push emotv\' to store in data base.');
});
