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

const jogo = gameModule.criarJogo();

jogo.subscribe(command => {
    io.emit(command.tipo, command);
})

io.on('connection', socket => {
    console.log('usuário conectado:', socket.id);
    const playerId = socket.id
    jogo.adicionarJogador(playerId);

    socket.on('disconnect', () => {
        console.log('usuário desconectado',playerId);
        jogo.removerJogador(playerId);
    });

})


server.listen(3000, () => {
    console.log('Server iniciado na porta 3000.')
});