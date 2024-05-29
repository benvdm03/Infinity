let board = Array.from({ length: 6 }, () => Array(7).fill(0));
let currentPlayer = 1;
let gameOver = false;

function drawBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 7; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (board[r][c] === 0) {
                cell.classList.add('empty');
            } else if (board[r][c] === 1) {
                cell.classList.add('player1');
            } else if (board[r][c] === 2) {
                cell.classList.add('player2');
            }
            gameBoard.appendChild(cell);
        }
    }
}

function dropPiece(col, player) {
    for (let r = 5; r >= 0; r--) {
        if (board[r][col] === 0) {
            board[r][col] = player;
            break;
        }
    }
    drawBoard();
}

function checkWin(player) {
    // Check for a win
    return false; // Simplified for brevity
}

function aiMove() {
    $.post('/evaluate_move', JSON.stringify({ board: board }), function(data) {
        const col = data.move;
        dropPiece(col, 2);
        if (checkWin(2)) {
            alert('Player 2 wins!');
            gameOver = true;
            document.getElementById('replayButton').style.display = 'block';
        }
        currentPlayer = 1;
    }, 'json');
}

document.getElementById('gameBoard').addEventListener('click', function(event) {
    if (gameOver) return;
    const col = Math.floor(event.offsetX / 55); // Adjusted for cell size and gap
    if (board[0][col] !== 0) return; // Column is full
    dropPiece(col, 1);
    if (checkWin(1)) {
        alert('Player 1 wins!');
        gameOver = true;
        document.getElementById('replayButton').style.display = 'block';
        return;
    }
    currentPlayer = 2;
    setTimeout(aiMove, 1000); // Wait 1 second before AI move
});

document.getElementById('replayButton').addEventListener('click', function() {
    board = Array.from({ length: 6 }, () => Array(7).fill(0));
    currentPlayer = 1;
    gameOver = false;
    drawBoard();
    this.style.display = 'none';
});

drawBoard();
