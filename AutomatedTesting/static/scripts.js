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
        let row = -1;
        for (let r = 5; r >= 0; r--) {
            if (board[r][col] === 0) {
                row = r;
                break;
            }
        }
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
                let aiRow = -1;
                for (let r = 5; r >= 0; r--) {
                    if (board[r][aiCol] === 0) {
                        aiRow = r;
                        break;
                    }
                }
                if (aiRow !== -1) {
                    board[aiRow][aiCol] = 2;
                    if (checkWin(2)) {
                        gameOver = true;
                    }
                    drawBoard();
                }
                turn = 0;
            }
        };
        xhr.send(JSON.stringify({ board }));

    }

    function checkWin(player) {
        const directions = [
            { x: 0, y: 1 },  // vertical
            { x: 1, y: 0 },  // horizontal
            { x: 1, y: 1 },  // diagonal down-right
            { x: 1, y: -1 }  // diagonal up-right
        ];

        for (let r = 0; r < 6; r++) {
            for (let c = 0; c < 7; c++) {
                if (board[r][c] === player) {
                    for (let { x, y } of directions) {
                        let count = 0;
                        for (let k = 0; k < 4; k++) {
                            const nr = r + k * y;
                            const nc = c + k * x;
                            if (nr < 0 || nr >= 6 || nc < 0 || nc >= 7 || board[nr][nc] !== player) {
                                break;
                            }
                            count++;
                        }
                        if (count === 4) return true;
                    }
                }
            }
        }
        return false;
    }

    document.getElementById('connect4').addEventListener('click', (event) => {
        const canvas = event.currentTarget;
        const rect = canvas.getBoundingClientRect();
        const col = Math.floor((event.clientX - rect.left) / (canvas.width / 7));

        if (gameOver) {
            const width = canvas.width;
            const height = canvas.height;
            const buttonX = (width / 2) - 50;
            const buttonY = height / 2 - 20;
            if (event.clientX > buttonX && event.clientX < buttonX + 100 && event.clientY > buttonY && event.clientY < buttonY + 40) {
                resetGame();
            }
            return;
        }

        handleMove(col);
    });

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

    drawBoard();
});
