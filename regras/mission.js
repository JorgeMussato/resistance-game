class Mission {

    constructor(numPlayers, numFailures) {
        this.id = Math.random().toString(36).substring(3);
        this.numPlayers = numPlayers;
        this.numFailures = numFailures;
        this.players = [];
        this.votes = [];
        this.approvals = [];
    }

    setPlayers(players) {
        this.players = players;
    }

    approve() {
        this.approvals.push(true);
    }

    reject() {
        this.approvals.push(false);
    }

    isApproved() {
        const numApprovals = this.approvals.filter(aprovacao => aprovacao).length;
        return numApprovals > this.approvals / 2;
    }

    reset() {
        this.approvals = [];
        this.players = [];
    }

    startMission() {
        console.log('distribuir cartas');
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

    getMissionState() {
        return {
            id: this.id,
            numPlayers: this.numPlayers,
            numFailures: this.numFailures,
        }
    }

}

module.exports.Mission = Mission;