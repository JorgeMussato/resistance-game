const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const playerModule = require('./regras/player-storage');
const gameModule = require('./regras/game');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index.html');
});

const playerStorage = playerModule.createPlayerStorage();

playerStorage.subscribe(command => {
    io.emit(command.tipo, command);
})

io.on('connection', socket => {
    console.log('user connected:', socket.id);
    const playerId = socket.id
    playerStorage.addPlayer(playerId);

    socket.on('disconnect', () => {
        console.log('user disconnected',playerId);
        playerStorage.removePlayer(playerId);
    });

    socket.on('startGame', () => {
        gameModule.startGame(playerStorage.getPlayers());
    })

})

server.listen(3000, () => {
    console.log('Server listening on port 3000')
});