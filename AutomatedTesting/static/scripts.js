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
    }

    function handleMove(col) {
        if (gameOver) return;
        let row = board.findIndex(r => r[col] === 0);
        if (row === -1) return;

        board[row][col] = turn + 1;
        drawBoard();

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/evaluate_move', true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                const aiCol = response.move;
                const aiRow = board.findIndex(r => r[aiCol] === 0);
                board[aiRow][aiCol] = 2;
                drawBoard();
            }
        };
        xhr.send(JSON.stringify({ board }));

        turn = 1 - turn;
    }

    document.getElementById('connect4').addEventListener('click', (event) => {
        const canvas = event.currentTarget;
        const rect = canvas.getBoundingClientRect();
        const col = Math.floor((event.clientX - rect.left) / (canvas.width / 7));
        handleMove(col);
    });

    drawBoard();
});
