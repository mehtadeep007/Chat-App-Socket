const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const router = require('./router');


const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);


io.on('connection', (socket) => {
    console.log('We have a new connection.');

    socket.on('join',({name,room},callback)=>{
        console.log(name,room)

        callback();
    });

    socket.on('disconnect', () => {
        console.log('User left');
    })
});


server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));