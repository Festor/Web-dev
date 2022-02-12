



// Генерация элементов доски
function initBoard() {
    // Найти элемент на странице со id board
    let board = document.getElementById('board');
    for (let i = 0; i < 9; i++) {
        let boardCell = document.createElement('div');
        boardCell.classList.add('cell');
        // Добавить этот элемент в конец
        board.append(boardCell);
    }

    return board;
}

function checkAvailableSteps() {
    let cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerHTML == '')
            return true;
    }
    return false;
}

function checkWinner() {
    // Выбрать все эелементы с классом cell
    let cells = document.querySelectorAll('.cell');
    let row, column, diag, diag1;
    // Проверка 3 строк
    for (let i = 0; i < 3; i++) {
        // Первая проверка присутствия значения в элементе
        // Проверка i*3-ого элемента сетки (0, 3, 6)
        row = (cells[i * 3 + 0].innerHTML != '');
        // Проверка i-ого элемента сетки (0, 1 , 2)
        column = (cells[i].innerHTML != '');
        // Проверка диагонального элемента (0, 4, 8)
        diag = (cells[0].innerHTML != '');
        // diag reverse
        diag1 = (cells[2].innerHTML != '')
        // 2 шага 0,1 каждое i-тое смещение
        for (let j = 0; j < 3 - 1; j++) {
            row = row && (cells[i * 3 + j].innerHTML == cells[i * 3 + j + 1].innerHTML)
            column = column && (cells[j * 3 + i].innerHTML == cells[(j + 1) * 3 + i].innerHTML)
            diag = diag && (cells[j * 3 + j].innerHTML == cells[(j + 1) * 3 + 1 + j].innerHTML)
            diag1 = diag1 && (cells[j * 2 + 2].innerHTML == cells[(j + 1) * 2 + 2].innerHTML)
        }
        // оператор проверки логического и с выводом значения ячейки
        let winner = (row && cells[i * 3 + 0].innerHTML) || (column && cells[i].innerHTML)
            || (diag && cells[0].innerHTML) || (diag1 && cells[2].innerHTML);
        if (winner)
            return winner;
    }
    return false;
}

function clickHandler(event) {
    // Проверка событий в классе cell
    if (event.target.className == 'cell') {
        if (gameOver == 1) {
            alert('Игра окончена, ничните новую игру.')
            return
        }
        // Совершение хода
        if (event.target.innerHTML != '') {
            alert('Нельзя ходить здесь');
        } else {
            event.target.innerHTML = turn == 0 ? 'X' : '0';
            turn = (turn + 1) % 2;
        }
        let winner = checkWinner();
        // false or x/0 == true
        if (winner || !checkAvailableSteps()) {
            gameOver = 1;
            alert(winner ? `${winner} одержал победу!` : `Ничья!`);
        }
    }
}

function newGame() {
    let cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
    }
    turn = 0;
    gameOver = 0;
}
let turn = 0;
let gameOver = 0;



// Когда загрузится dom и все внешние ресурсы
window.onload = function () {
    // вызов init Board
    let board = initBoard();
    // Определим обработчик событий для board
    board.onclick = clickHandler;
    document.querySelector('.new-game-btn').onclick = newGame;
}