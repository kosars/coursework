import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import socketio from 'socket.io';
import routes from './src/routes/todoRoutes';

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);



// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/todoDB', {
    useMongoClient: true
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
routes(app);

app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);

http.listen(3000, () => {
    console.log('Listening on port *: 3000');
});


io.on('connection', (socket) => {
    console.log("A user connected");
    socket.emit('connections', Object.keys(io.sockets.connected).length);

    socket.on('disconnect', () => {
        console.log("A user disconnected");
    });

    socket.on('chatmessage', (data) => {
        socket.broadcast.emit('chatmessage', (data));
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', (data));
    });

    socket.on('stopTyping', () => {
        socket.broadcast.emit('stopTyping');
    });

    socket.on('joined', (data) => {
        socket.broadcast.emit('joined', (data));
    });

    socket.on('leave', (data) => {
        socket.broadcast.emit('leave', (data));
    });

});
//express listener
// app.listen(PORT, () =>
//     console.log(`your server is running on port ${PORT}`)
// );

