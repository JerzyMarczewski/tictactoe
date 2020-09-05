const cells = document.querySelectorAll('[data-cell]');
const winningMessageText = document.querySelector('[data-winning-messege-text]');
const winningMessage = document.querySelector('.winning-message');
const restartBtn = document.getElementById('restart-button');
let xTurn = true;
let moves = 0;


const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let board = [];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true});
})

restartBtn.addEventListener('click', restart);

function restart(e) {
    location.reload();
}

function handleClick(e) {
    const cell = e.target;
    let index = getIndex(cell);
    moves++;
    if(xTurn) {
        cell.classList.add('x');
        placeInArray('x', index);
        checkWin('x');
        xTurn = false;
    }else {
        cell.classList.add('o');
        placeInArray('o', index);
        checkWin('o');
        xTurn = true;
    } 
    
    swapTurn();
}

function swapTurn() {
    let gameBoard = document.querySelector('.board');
    if (gameBoard.classList.contains('x')){
        gameBoard.classList.remove('x');
        gameBoard.classList.add('o');
    } else {
        gameBoard.classList.remove('o');
        gameBoard.classList.add('x');
    }
}

function getIndex(element) {
    let parent = element.parentNode;
    return Array.prototype.indexOf.call(parent.children, element);
}

function placeInArray(letter, index) {
    board[index] = letter;
}

function checkWin(l) {
    for(combo in winningCombos){
        let arr = winningCombos[combo];
        if (board[arr[0]] === l &&
            board[arr[1]] === l &&
            board[arr[2]] === l) {
                winningMessageText.innerText = l + ' won';
                winningMessage.classList.add('show');
                break;
        }
    }
    if (moves === 9){
        winningMessageText.innerText = 'draw';
        winningMessage.classList.add('show');
    }
}



