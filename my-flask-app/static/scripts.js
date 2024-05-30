const ROW_COUNT = 6;
const COLUMN_COUNT = 7;
let board = Array(ROW_COUNT).fill(null).map(() => Array(COLUMN_COUNT).fill(0));
let gameOver = false;

const gameBoard = document.getElementById("game-board");
const resetButton = document.getElementById("reset-button");

function drawBoard() {
    gameBoard.innerHTML = "";
    for (let r = 0; r < ROW_COUNT; r++) {
        for (let c = 0; c < COLUMN_COUNT; c++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener("click", () => handleMove(c));
            if (board[r][c] === 1) {
                cell.classList.add("red");
            } else if (board[r][c] === 2) {
                cell.classList.add("yellow");
            }
            gameBoard.appendChild(cell);
        }
    }
}

function handleMove(col) {
    if (gameOver) return;
    for (let r = ROW_COUNT - 1; r >= 0; r--) {
        if (board[r][col] === 0) {
            board[r][col] = 1;
            drawBoard();
            if (checkWin(1)) {
                gameOver = true;
                alert("Player 1 wins!");
                resetButton.style.display = "block";
                return;
            }
            if (isBoardFull()) {
                gameOver = true;
                alert("The game is a draw!");
                resetButton.style.display = "block";
                return;
            }
            evaluateMove();
            break;
        }
    }
}

function evaluateMove() {
    fetch("/evaluate_move", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ board }),
    })
        .then((response) => response.json())
        .then((data) => {
            const { move, board: newBoard } = data;
            board = newBoard;
            drawBoard();
            if (checkWin(2)) {
                gameOver = true;
                alert("Player 2 wins!");
                resetButton.style.display = "block";
                return;
            }
            if (isBoardFull()) {
                gameOver = true;
                alert("The game is a draw!");
                resetButton.style.display = "block";
                return;
            }
        });
}

function checkWin(piece) {
    // Check horizontal locations for win
    for (let r = 0; r < ROW_COUNT; r++) {
        for (let c = 0; c < COLUMN_COUNT - 3; c++) {
            if (
                board[r][c] === piece &&
                board[r][c + 1] === piece &&
                board[r][c + 2] === piece &&
                board[r][c + 3] === piece
            ) {
                return true;
            }
        }
    }
    // Check vertical locations for win
    for (let c = 0; c < COLUMN_COUNT; c++) {
        for (let r = 0; r < ROW_COUNT - 3; r++) {
            if (
                board[r][c] === piece &&
                board[r + 1][c] === piece &&
                board[r + 2][c] === piece &&
                board[r + 3][c] === piece
            ) {
                return true;
            }
        }
    }
    // Check positively sloped diagonals
    for (let r = 0; r < ROW_COUNT - 3; r++) {
        for (let c = 0; c < COLUMN_COUNT - 3; c++) {
            if (
                board[r][c] === piece &&
                board[r + 1][c + 1] === piece &&
                board[r + 2][c + 2] === piece &&
                board[r + 3][c + 3] === piece
            ) {
                return true;
            }
        }
    }
    // Check negatively sloped diagonals
    for (let r = 3; r < ROW_COUNT; r++) {
        for (let c = 0; c < COLUMN_COUNT - 3; c++) {
            if (
                board[r][c] === piece &&
                board[r - 1][c + 1] === piece &&
                board[r - 2][c + 2] === piece &&
                board[r - 3][c + 3] === piece
            ) {
                return true;
            }
        }
    }
    return false;
}

function isBoardFull() {
    for (let r = 0; r < ROW_COUNT; r++) {
        for (let c = 0; c < COLUMN_COUNT; c++) {
            if (board[r][c] === 0) {
                return false;
            }
        }
    }
    return true;
}

function resetGame() {
    board = Array(ROW_COUNT).fill(null).map(() => Array(COLUMN_COUNT).fill(0));
    gameOver = false;
    resetButton.style.display = "none";
    drawBoard();
}

drawBoard();
