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

const playerStorage = new playerModule.PlayerStorage();
playerStorage.subscribe(command => {
    io.emit(command.type, command);
});

let game;

io.on('connection', socket => {
    console.log('user connected:', socket.id);
    const playerId = socket.id
    playerStorage.addPlayer(playerId);

    socket.on('disconnect', () => {
        console.log('user disconnected',playerId);
        playerStorage.removePlayer(playerId);
    });

    socket.on('startGame', () => {
        game = new gameModule.Game(playerStorage.players);

        game.subscribe(command => {
            io.emit(command.type, command);
        });

        game.emitGameState();
    });
    
    socket.on('missionStarted', mission => {
        console.log(mission);
    })

});


server.listen(3000, () => {
    console.log('Server listening on port 3000')
});