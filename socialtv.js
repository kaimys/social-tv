var express         = require('express'),
    socket_io       = require('socket.io'),
    db              = require('./lib/CouchDB.js'),
    app             = express.createServer(),
    timeline        = [],
    votes           = {};
    
app.use(express.logger());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(app.router);
app.use(express.static(__dirname + '/public'));
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

//app.param('id', /^[a-z0-9]+$/);

app.get('/api/timeline.json', function(req, res) {
    res.set({
        'Content-Type': 'application/json',
        'CacheControl:': 'private,max=age=0',
        'Connection:': 'close'
    });
    res.send(JSON.stringify(timeline));
    res.end();
});

app.get('/api/programm/:id', function(req, res) {
    res.set({
        'Content-Type': 'application/json',
        'CacheControl:': 'private,max=age=0',
        'Connection:': 'close'
    });
    db.getProgramm(req.params.id, function(data) {
      res.send(JSON.stringify(data));
      res.end();
    });
});

var port = process.env.PORT || 5000,
    server = app.listen(port);
io = socket_io.listen(server)
io.sockets.on('connection', function (socket) {
    console.log("incomming connection");
    socket.on('express', function (data) {
        data['time'] = Date.now();
        votes[data.target] = votes[data.target] || 0;
        votes[data.target] += 1;
        data['votes'] = votes[data.target];
        socket.broadcast.emit('express', data);
        timeline.push(data);
        console.log(data);
        setTimeout(function() {
            votes[data.target] -= 1;
        }, 10000);
    });
});
