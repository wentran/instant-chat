var app = require('http').createServer();
var io = module.exports.io = require('socket.io')(app);

const PORT = process.env.PORT || 3231;
const SocketManager = require('./socketManager');

io.on('connection', SocketManager);

app.listen(PORT, () => {
    console.log("connect to port" + PORT);
});
