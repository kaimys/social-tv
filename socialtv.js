var express         = require('express'),
    socket_io       = require('socket.io'),
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

app.get('/api/timeline.json', function(req, res) {
    res.set({
        'Content-Type': 'application/javascript',
        'CacheControl:': 'private,max=age=0',
        'Connection:': 'close'
    });
    res.send(JSON.stringify(timeline));
    res.end();
});

var server = app.listen(7777);
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
