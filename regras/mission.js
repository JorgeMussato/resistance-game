class Mission {

    constructor(numPlayers, numFailures) {
        this.numPlayers = numPlayers;
        this.numFailures = numFailures;
        this.players = [];
        this.votes = [];
        this.approvals = [];
    }

    voteSuccess() {
        this.votes.push(true);
    }

    voteFailure() {
        this.votes.push(false);
    }

    isSuccess() {
        this.votes.filter(voto => !voto).length < this.numFailures;
    }

    setPlayers(players) {
        this.players = players;
    }

    approve() {
        this.approvals.push(true);
    }

    refuse() {
        this.approvals.push(false);
    }

    verificarMissaoAprovada() {
        const numApprovals = this.approvals.filter(aprovacao => aprovacao).length;
        return numApprovals > this.approvals / 2;
    }

    resetar() {
        this.approvals = [];
        this.players = [];
    }

}

module.exports.Mission = Mission;