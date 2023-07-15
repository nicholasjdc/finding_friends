const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server)
const {Room} = require('./room.js')
const {User} = require('./user.js')

rooms = []
users = []
app.use('/', express.static(__dirname + '/client'));

io.on('connection', (socket) =>{
    console.log('a user connected: ' + socket.id)
    
    socket.on('create name', (msg)=>{
        socket.broadcast.emit('')
    })
    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg)
        console.log('message: ' +msg)
    })
    
    socket.on('disconnect', ()=>{
        console.log('user disconnected')
    })

    socket.on('create room', (roomName) =>{
        console.log('creating room: ', roomName)
        if(rooms.some((r)=>r.roomName == roomName)){
            console.log("room name already taken")
        }else{
            newRoom = new Room(roomName, '','','')
            console.log(newRoom.roomName)
            socket.join(roomName)
            rooms.push(newRoom)
        }
    })
    socket.on('test message', (msg)=>{
        console.log(msg)
    })

    socket.on('join room', (roomName)=>{
        console.log(roomName)
        const roomNameList = rooms.map((r)=>r.roomName)
        console.log(roomNameList)
        if(roomNameList.includes(roomName)){
            socket.join(roomName)
        }else{
            console.log("No Room Found :(")
        }
    })
    socket.on('room list', function(data, callback){
        console.log('Room List Requested')
        callback(rooms.map((r)=>r.roomName))
    })
    
})

server.listen(8080, ()=>{
    console.log('listening of *:8080')
})