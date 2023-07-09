const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server)

rooms = []

app.get('/', (req, res) =>{
    res.sendFile(__dirname +'/index.html');
});

io.on('connection', (socket) =>{
    console.log('a user connected: ' + socket.id)
    
    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg)
        console.log('message: ' +msg)
    })
    
    socket.on('disconnect', ()=>{
        console.log('user disconnected')
    })

    socket.on('join', (roomName) =>{
        socket.joing(roomName)
    })
    
})

server.listen(8080, ()=>{
    console.log('listening of *:8080')
})