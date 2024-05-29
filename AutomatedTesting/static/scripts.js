document.addEventListener('DOMContentLoaded', (event) => {
    const board = Array.from({ length: 6 }, () => Array(7).fill(0));
    let turn = 0;
    let gameOver = false;

    function drawBoard() {
        const canvas = document.getElementById('connect4');
        const context = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const cellSize = width / 7;

        context.clearRect(0, 0, width, height);

        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 7; col++) {
                const x = col * cellSize;
                const y = row * cellSize + cellSize;
                context.beginPath();
                context.rect(x, y, cellSize, cellSize);
                context.strokeStyle = 'blue';
                context.stroke();
                context.closePath();

                context.beginPath();
                context.arc(x + cellSize / 2, y + cellSize / 2, cellSize / 2 - 5, 0, 2 * Math.PI);
                context.fillStyle = board[row][col] === 1 ? 'red' : board[row][col] === 2 ? 'yellow' : 'white';
                context.fill();
                context.closePath();
            }
        }

        if (gameOver) {
            const buttonX = (width / 2) - 50;
            const buttonY = height / 2 - 20;
            context.fillStyle = 'white';
            context.fillRect(buttonX, buttonY, 100, 40);
            context.strokeStyle = 'black';
            context.strokeRect(buttonX, buttonY, 100, 40);

            context.fillStyle = 'black';
            context.font = '20px Arial';
            context.fillText('Replay', buttonX + 10, buttonY + 25);
        }
    }

    function handleMove(col) {
        if (gameOver) return;
        let row = getNextOpenRow(col);
        if (row === -1) return;

        board[row][col] = 1;
        drawBoard();

        if (checkWin(1)) {
            gameOver = true;
            drawBoard();
            return;
        }

        turn = 1;
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/evaluate_move', true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                const aiCol = response.move;
                const aiRow = getNextOpenRow(aiCol);

                board[aiRow][aiCol] = 2;
                drawBoard();

                if (checkWin(2)) {
                    gameOver = true;
                    drawBoard();
                    return;
                }

                turn = 0;
            }
        };
        xhr.send(JSON.stringify({ board }));
    }

    function getNextOpenRow(col) {
        for (let r = 5; r >= 0; r--) {
            if (board[r][col] === 0) {
                return r;
            }
        }
        return -1;
    }

    function checkWin(player) {
        for (let r = 0; r < 6; r++) {
            for (let c = 0; c < 4; c++) {
                if (board[r][c] === player && board[r][c + 1] === player && board[r][c + 2] === player && board[r][c + 3] === player) {
                    return true;
                }
            }
        }

        for (let c = 0; c < 7; c++) {
            for (let r = 0; r < 3; r++) {
                if (board[r][c] === player && board[r + 1][c] === player && board[r + 2][c] === player && board[r + 3][c] === player) {
                    return true;
                }
            }
        }

        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 4; c++) {
                if (board[r][c] === player && board[r + 1][c + 1] === player && board[r + 2][c + 2] === player && board[r + 3][c + 3] === player) {
                    return true;
                }
            }
        }

        for (let r = 3; r < 6; r++) {
            for (let c = 0; c < 4; c++) {
                if (board[r][c] === player && board[r - 1][c + 1] === player && board[r - 2][c + 2] === player && board[r - 3][c + 3] === player) {
                    return true;
                }
            }
        }

        return false;
    }

    function resetGame() {
        for (let r = 0; r < 6; r++) {
            for (let c = 0; c < 7; c++) {
                board[r][c] = 0;
            }
        }
        turn = 0;
        gameOver = false;
        drawBoard();
    }

    document.getElementById('connect4').addEventListener('click', (event) => {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const col = Math.floor(x / (rect.width / 7));

        if (gameOver && x >= rect.width / 2 - 50 && x <= rect.width / 2 + 50) {
            resetGame();
        } else if (turn === 0 && !gameOver) {
            handleMove(col);
        }
    });

    drawBoard();
});
