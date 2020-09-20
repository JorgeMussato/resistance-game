const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const gameModule = require('./game');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index.html');
});

const game = gameModule.createGame();

game.subscribe(command => {
    io.emit(command.tipo, command);
})

io.on('connection', socket => {
    console.log('usuário conectado:', socket.id);
    const playerId = socket.id
    game.addPlayer(playerId);

    socket.on('disconnect', () => {
        console.log('usuário desconectado',playerId);
        game.removePlayer(playerId);
    });

})

server.listen(3000, () => {
    console.log('Server iniciado na porta 3000.')
});