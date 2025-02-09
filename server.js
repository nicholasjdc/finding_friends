const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io")

const io = new Server(server)
const {Room} = require('./room.js')
const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");

const { InMemorySessionStore } = require("./sessionStore");
const sessionStore = new InMemorySessionStore();

rooms = []
users = []
app.use('/', express.static(__dirname + '/client'));
io.use((socket, next) => {
    console.log('use')
    const sessionID = socket.handshake.auth.sessionID;
    console.log('sid: ' +socket.handshake.auth.sessionID)
    if (sessionID) {
      const session = sessionStore.findSession(sessionID);
      if (session) {
        socket.sessionID = sessionID;
        socket.userID = session.userID;
        socket.username = session.username;
        return next();
      }
    }
    const username = socket.handshake.auth.username;
    /*
    if (!username) {
        console.log('broken')
      return next(new Error("invalid username"));
    }
    */
    socket.sessionID = randomId();
    socket.userID = randomId();
    socket.username = randomId()
    next();
  });
io.on('connection', (socket) =>{
  console.log('sessionID, user ID, username: ' + socket.sessionID, socket.userID, socket.username)

  sessionStore.saveSession(socket.sessionID, {
    userID: socket.userID,
    username: socket.username,
    connected: true,
  });
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
    username: socket.username,
  });
  socket.join(socket.userID);


    console.log('a user connected: ' + socket.id)
    
    socket.on('create name', (msg)=>{
      console.log('Creating name: ' + msg)
      socket.username = msg
      console.log(sessionStore.findSession(socket.sessionID))
    })
    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg)
        console.log('message: ' +msg)
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
    socket.on("disconnect", async () => {
        const matchingSockets = await io.in(socket.userID).fetchSockets();
        const isDisconnected = matchingSockets.size === 0;
        if (isDisconnected) {
          // notify other users
          socket.broadcast.emit("user disconnected", socket.userID);
          // update the connection status of the session
          sessionStore.saveSession(socket.sessionID, {
            userID: socket.userID,
            username: socket.username,
            connected: false,
          });
        }
      });
    
})

server.listen(8080, ()=>{
    console.log('listening of *:8080')
})