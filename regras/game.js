require('./mission');

class Game {
    
    constructor (players) {
        this.players = players;
        this.missoes = [new Missao(2, 1), new Missao(3, 1), new Missao(3, 1), new Missao(4, 1), new Missao(4, 2)];
        this.playersOrder = [];
        this.round = 0;
    }

    setPlayersOrder() {
        return Object.values(this.players)
            .sort((a, b) => Math.random() > Math.random() ? a : b)
            .map(player => player.id);
    }

    finishTurn() {
        this.round++;
    }

}

module.exports.Jogo = Jogo;