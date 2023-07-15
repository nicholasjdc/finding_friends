var socket = io();

var createRoomButton = document.getElementById('test')
var joinRoomButton = document.getElementById('jrButton')
var roomName = document.getElementById('roomName')
var showRoomList = document.getElementById('srButton')
var roomList = document.getElementById('roomlist')
var usernameForm = document.getElementById('username')
var usernameConfirm = document.getElementById('createName')

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
showRoomList.addEventListener('click', function(e){
    e.preventDefault()
    socket.emit('room list', {
        payload: 'roomlistrequest'
    }, function(responseData) {
        roomList.innerHTML = ''
        responseData.forEach(r=>{
            var node = document.createElement('li')
            node.appendChild(document.createTextNode(r))
            roomList.appendChild(node)
        })
       
    })
    console.log('ASYNC?')
})
socket.on('chat message', function(msg) {
    var item = document.createElement('li')
    item.textContent = msg
    messages.appendChild(item)
    window.scrollTo(0, document.body.scrollHeight)
})
