class PlayerStorage {
    
    constructor() {
        this.players = {};
        this.observers = [];
    }
    
    subscribe(observer) {
        observers.push(observer);
    }

    notifyAll(command) {
        observers.forEach(observer => observer(command));
    }

    addPlayer(jogador) {
        players[jogador] = {id: jogador, nome: 'Jorge'};
        notifyAll({ tipo: 'listaJogadores', players });
    }

    removePlayer(jogadorRemover) {
        delete players[jogadorRemover];
        notifyAll({ tipo: 'listaJogadores ', players });
    }

    getPlayers() {
        return players;
    }

}

module.exports.createPlayerStorage = createPlayerStorage;