import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import socketio from 'socket.io';
import routes from './src/routes/todoRoutes';

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
// const m = (name, text, id) => ({ name, text, id })


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

var users = [];
io.on('connection', (socket) => {
    //console.log("A user connected");
    socket.emit('connections', Object.keys(io.sockets.connected).length);
    //rooms
    // socket.on('userJoined', (data, cb) => {
    //     if (!data.name || !data.room) {
    //       return cb('Данные некорректны')
    //     }
    
    //     socket.join(data.room)
    //     cb({ userId: socket.id })
    //     socket.emit('newMessage', m('admin', `Добро пожаловать ${data.name}.`))
    //     socket.broadcast
    //       .to(data.room)
    //       .emit('newMessage', m('admin', `Пользователь ${data.name} зашел.`))
    //   })
    //
    socket.on('disconnect', () => {
        
        //console.log('User has disconnected');
        
    });

    socket.on('joined', (data) => {
        console.log(data + " joined");
        socket.user = data;
        users.push(data);
        socket.broadcast.emit('joined', (data));//
        
        updateClients();
    });

    socket.on('leave', (data) => {
        for(var i=0; i<users.length; i++) {
            if(users[i] == data) {
                users.splice(i, 1);
            }
        }
        console.log(data + " leaved");
        socket.broadcast.emit('leave', (data));

        updateClients();
    });

    socket.on('update', function () {
        users[user] = user;
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



    socket.on('updateChars', (data) => {
        socket.broadcast.emit('updateChars', (data));
    });

    function updateClients() {
        io.sockets.emit('update', users);
        console.log(users)
    }
});
//express listener
// app.listen(PORT, () =>
//     console.log(`your server is running on port ${PORT}`)
// );

