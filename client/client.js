
var createRoomButton = document.getElementById('test')
var joinRoomButton = document.getElementById('jrButton')
var roomName = document.getElementById('roomName')
var showRoomListH = document.getElementById('srButton')
var roomListH = document.getElementById('roomlist')
var usernameForm = document.getElementById('username')
var usernameConfirm = document.getElementById('createName')

const sessionID = localStorage.getItem("sessionID");
const username = localStorage.getItem("username");
const userID = localStorage.getItem('userID')
var socket = io({
    auth: {
        sessionID: sessionID,
        username: username,
        userID: userID
    }
});

socket.on("session", ({ sessionID, userID, username}) => {
  // attach the session ID to the next reconnection attempts
  socket.auth = { sessionID };
  // store it in the localStorage
  localStorage.setItem("sessionID", sessionID);
  // save the ID of the user
  socket.username = username
  socket.userID = userID;
});

usernameConfirm.addEventListener('click', function(e) {
    e.preventDefault()
    console.log('Confirming Username: '+ usernameForm.value)
    socket.emit('create name', usernameForm.value)

})
createRoomButton.addEventListener('click', function(e) {
    e.preventDefault()
    console.log('Creating Room: ' + roomName.value)
    socket.emit('create room', roomName.value)
        
})
joinRoomButton.addEventListener('click', function(e){
    e.preventDefault()
    if(roomName.value){
        console.log('Joining Room: ' + roomName.value)
        socket.emit('join room', roomName.value)
    }
})
showRoomListH.addEventListener('click', function(e){
    e.preventDefault()
    getRoomList().then((roomList)=>{
        roomListH.innerHTML = ''
        roomList.forEach(r=>{
            var node = document.createElement('li')
            node.appendChild(document.createTextNode(r))
            roomList.appendChild(node)
        })
    })
})
socket.on('chat message', function(msg) {
    var item = document.createElement('li')
    item.textContent = msg
    messages.appendChild(item)
    window.scrollTo(0, document.body.scrollHeight)
})
const updateDisplayName = ()=>{
    socket.emit('create name', usernameForm.value)
}
const createRoom = ()=>{
    socket.emit('create room', roomName.value)
}

const joinRoom = () =>{
    socket.emit('join room', roomName.value)
}
const getRoomList = () =>{
    try{
        socket.emit('room list', {
            payload: 'roomlistrequest'
        }, function(roomList) {
            return roomList
        })
    }catch(e){
        throw Error(e)
    }
    
}
