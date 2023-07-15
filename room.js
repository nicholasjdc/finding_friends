class Room {
    constructor(roomName, players, host, gametype){
        this.roomName = roomName
        this.players = players
        this.host = host
        this.gametype = gametype
    }
}
module.exports = {
    Room
}