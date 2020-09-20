function createPlayerStorage() {
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

    function getPlayers() {
        return players;
    }

    return {
        subscribe,
        addPlayer,
        removePlayer,
        getPlayers
    }

}

module.exports.createPlayerStorage = createPlayerStorage;