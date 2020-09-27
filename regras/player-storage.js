class PlayerStorage {
    
    constructor() {
        this.players = {};
        this.observers = [];
    }
    
    subscribe(observer) {
        this.observers.push(observer);
    }

    notifyAll(command) {
        this.observers.forEach(observer => observer(command));
    }

    addPlayer(jogador) {
        this.players[jogador] = {id: jogador, name: Math.random().toString(36).substring(6)};
        this.notifyAll({ type: 'playerList', players: this.players });
    }

    removePlayer(jogadorRemover) {
        delete this.players[jogadorRemover];
        this.notifyAll({ type: 'playerList ', players: this.players });
    }

}

module.exports.PlayerStorage = PlayerStorage;