function startGame(players) {
    const state = {
        players,
        playersOrder: setPlayersOrder(players),
        missions: [],
        playerTurn: 0,
    }

    function setPlayersOrder(players) {
        return Object.values(players)
            .sort((a, b) => Math.random() > Math.random() ? a : b)
            .map(player => player.id);
    }

    function finishTurn() {
        state.playerTurn = state.playerTurn + 1;
    }

    function getState() {
        return state;
    }

    return {
        finishTurn,
        getState
    }

}

module.exports.startGame = startGame;