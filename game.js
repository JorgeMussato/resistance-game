function createGame() {
    const players = {};
    const observers = [];
    
    function subscribe(observer) {
        observers.push(observer);
    }

    function notifyAll(command) {
        observers.forEach(observer => observer(command));
    }

    function addPlayer(jogador) {
        players[jogador] = {id: jogador, nome: 'Jorge'};
        notifyAll({ tipo: 'listaJogadores', players });
    }

    function removePlayer(jogadorRemover) {
        delete players[jogadorRemover];
        notifyAll({ tipo: 'listaJogadores ', players });
    }

    function start() {
        startMatch(players)
    }

    return {
        subscribe,
        addPlayer,
        removePlayer
    }

}

function startMatch(players) {
    const state = {
        players,
        playersOrder: getPlayersOrder(players),
        allyScore: 0,
        enemyScore: 0,
        playerTurn: getFirstPlayer(players),

    }

    function getPlayersOrder(players) {
        return Object.values(players)
            .sort((a, b) => Math.random() > Math.random() ? a : b)
            .map(player => player.id);
    }

    function getFirstPlayer(players) {
        const position = Math.floor(players.length * Math.random());
        return Object.values(players)[position];
    }


}

module.exports.createGame = createGame;