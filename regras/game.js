const missionModule = require('./mission');

const Mission = missionModule.Mission;

class Game {
    
    constructor (players) {
        this.players = players;
        this.missions = [new Mission(2, 1), new Mission(3, 1), new Mission(3, 1), new Mission(4, 1), new Mission(4, 2)];
        this.playersOrder = this.setPlayersOrder();
        this.round = 0;
        this.skips = 0;
        this.observers = [];
    }

    setPlayersOrder() {
        return Object.values(this.players)
            .sort(() => Math.random() - Math.random())
            .map(player => player.id);
    }

    getPlayers() {
        return Object.values(this.players);
    }

    finishTurn() {
        this.round++;
    }

    resolveMission(index) {
        const mission = this.missions[index];
        if (mission.isApproved()) {
            mission.startMission();
            this.skips = 0;
        } else {
            mission.reset();
            this.skips++;
            verifyMaxSkips();
        }
    }

    verifyMaxSkips() {
        if (this.skips > 5) {

        }
    }

    endGame(win) {
        console.log('Game ended', win ? 'Resistance Won' : 'Infiltrators won')
    }

    getGameState() {
        return {
            players: Object.values(this.players),
            missions: this.missions.map(mission => mission.getMissionState()),
            round: this.round,
            skips: this.skips,
            playerTurn: this.playersOrder[this.round % this.getPlayers().length]
        };
    }

    emitGameState() {
        this.notifyAll({type: 'gameState', gameState: this.getGameState()})
    }

    subscribe(arrow) {
        this.observers.push(arrow);
    }

    notifyAll(event) {
        this.observers.forEach(observer => observer(event));
    }

}

module.exports.Game = Game;