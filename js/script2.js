function tictactoe2() {

    document.getElementById('first').onclick = function () {
        this.disabled = true;
    }

    document.getElementById('second').onclick = function () {
        this.disabled = true;
    }

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

    let playerTurn = 1;
    const grid = () => Array.from(document.getElementsByClassName("q"));
    const qNumID = (qEl) => Number.parseInt(qEl.id.replace('q', ''));
    const allSame = (arr) => arr.every(_qEl => _qEl.innerText === arr[0].innerText && _qEl.innerText !== '');

    const takeTurn = (index, letter) => {


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

    const opponentChoice = (index, letter) => {

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

    const endgame = (winningSequence) => {
        winningSequence.forEach(_qEl => _qEl.classList.add("Winner"));
        spnMensagem.remove();
        winningMessage.appendChild(
            document.createTextNode("Vitoria! O jogo foi encerrado."));
        disableListeners();
    };
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

    const opponentTurn = (event) => {
            if (opponentChoice(qNumID(event.target), 'o') === true) {
                if (!checkForVictory())
                playerTurn = 1;

            }
    };

    const clickFn = (event) => {
        if(playerTurn == 1){
            if (takeTurn(qNumID(event.target), 'x') === true) {
                if (!checkForVictory());
                playerTurn = 2;
            }
        }
        else{
            opponentTurn(event)
        }

    };

    const enableListeners = () => grid().forEach(_qEl => _qEl.addEventListener('click', clickFn));
    const disableListeners = () => grid().forEach(_qEl => _qEl.removeEventListener('click', clickFn));

    enableListeners();
}
