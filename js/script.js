//chamar a função toda pelo botao no html
function tictactoe() {
    document.getElementById('first').onclick = function () {
        this.disabled = true;
    }

    document.getElementById('second').onclick = function () {
        this.disabled = true;
    }
    //possibilidades de vitoria
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ];

    const grid = () => Array.from(document.getElementsByClassName("q"));
    const qNumID = (qEl) => Number.parseInt(qEl.id.replace('q', ''));
    const emptyQs = () => grid().filter(_qEl => _qEl.innerText === '' && _qEl.innerText !== 'x');
    const allSame = (arr) => arr.every(_qEl => _qEl.innerText === arr[0].innerText && _qEl.innerText !== '');

    //turno do jogador
    const takeTurn = (index, letter) => {

        //caso clique em uma posição ocupada
        if (grid()[index].innerText != '') {
            if(spnMensagem.innerText == '')
            {
            spnMensagem.innerText = "Escolha um campo vazio";
            }
            return false

        } else {
            grid()[index].innerText = letter
            spnMensagem.innerText = '';
            return true
        }
    }
    //randomizar posição do computador
    const opponentChoice = () => qNumID(emptyQs()[Math.floor(Math.random() * emptyQs().length)]);

    //mensagem de vitoria
    const endgame = (winningSequence) => {
        winningSequence.forEach(_qEl => _qEl.classList.add("Winner"));
        spnMensagem.remove();
        winningMessage.appendChild(
            document.createTextNode("Vitoria! O jogo foi encerrado."));
        disableListeners();
    };
    //cada turno ver possibilidade de vitoria
    const checkForVictory = () => {
        let victory = false;
        winningCombos.forEach(_c => {
            const _grid = grid();
            const sequence = [_grid[_c[0]], _grid[_c[1]], _grid[_c[2]]];
            if (allSame(sequence)) {
                victory = true;
                endgame(sequence);
            }
        });
        return victory;
    };

    //turno do computador
    const opponentTurn = () => {
        disableListeners();
        setTimeout(() => {
            takeTurn(opponentChoice(), 'o');
            if (!checkForVictory())
                enableListeners();
        }, 1000);
    }
    //clique do player
    const clickFn = (event) => {
        if (takeTurn(qNumID(event.target), 'x') === true) {
            if (!checkForVictory())
                opponentTurn()
        };

    };
    //habilitar clique do jogador
    const enableListeners = () => grid().forEach(_qEl => _qEl.addEventListener('click', clickFn));
    //desabilitar na vez do computador
    const disableListeners = () => grid().forEach(_qEl => _qEl.removeEventListener('click', clickFn));

    enableListeners();
}
