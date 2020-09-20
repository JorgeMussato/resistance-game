function criarJogo() {
    const state = {};
    const jogadores = {};

    const observers = [];
    
    function subscribe(observer) {
        console.log(observer);
        observers.push(observer);
    }

    function notifyAll(command) {
        observers.forEach(observer => observer(command));
    }

    function adicionarJogador(jogador) {
        jogadores[jogador] = {nome: 'Jorge'};
        notifyAll({tipo: 'listaJogadores', jogadores});
    }

    function removerJogador(jogadorRemover) {
        delete jogadores[jogadorRemover];
        notifyAll({tipo: 'listaJogadores ', jogadores});
    }

    return {
        subscribe,
        adicionarJogador,
        removerJogador
    }

}

module.exports.criarJogo = criarJogo;