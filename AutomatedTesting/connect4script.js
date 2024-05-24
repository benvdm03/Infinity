document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameBoard');
    const context = canvas.getContext('2d');
    const SQUARESIZE = 100;
    const RADIUS = SQUARESIZE / 2 - 5;
    const ROW_COUNT = 6;
    const COLUMN_COUNT = 7;
    const width = COLUMN_COUNT * SQUARESIZE;
    const height = (ROW_COUNT + 2) * SQUARESIZE;  // Extra row for player input and score
    const colors = {
        BLUE: '#0000FF',
        BLACK: '#000000',
        RED: '#FF0000',
        YELLOW: '#FFFF00',
        WHITE: '#FFFFFF'
    };

    let board = Array.from({ length: ROW_COUNT }, () => Array(COLUMN_COUNT).fill(0));
    let player1_wins = 0;
    let player2_wins = 0;
    let turn = 0;
    let gameOver = false;

    const replayButton = document.getElementById('replayButton');
    replayButton.addEventListener('click', resetBoard);

    drawBoard();

    canvas.addEventListener('mousemove', (event) => {
        if (gameOver || turn === 1) return;
        const posx = event.offsetX;
        context.clearRect(0, 0, width, SQUARESIZE);
        drawCircle(posx, SQUARESIZE / 2, RADIUS, colors.RED);
    });

    canvas.addEventListener('click', (event) => {
        if (gameOver || turn === 1) return;
        const posx = event.offsetX;
        const col = Math.floor(posx / SQUARESIZE);

        if (isValidLocation(col)) {
            dropPieceAnimation(col, 1);
            if (winningMove(1)) {
                player1_wins += 1;
                gameOver = true;
                alert("Player 1 wins!");
                updateScores();
                replayButton.style.display = 'block';
                return;
            }

            turn = (turn + 1) % 2;
            setTimeout(aiMove, 1000); // Call AI move after 1 second delay
        }
    });

    function aiMove() {
        if (turn === 1 && !gameOver) {
            const [col] = minimax(board, 4, -Infinity, Infinity, true);
            if (isValidLocation(col)) {
                dropPieceAnimation(col, 2);
                if (winningMove(2)) {
                    player2_wins += 1;
                    gameOver = true;
                    alert("Player 2 wins!");
                    updateScores();
                    replayButton.style.display = 'block';
                    return;
                }

                turn = (turn + 1) % 2;

                if (isTerminalNode()) {
                    alert("The game is a draw!");
                    gameOver = true;
                    replayButton.style.display = 'block';
                }
            }
        }
    }

    function drawBoard() {
        context.fillStyle = colors.BLUE;
        context.fillRect(0, SQUARESIZE, width, height);

        for (let c = 0; c < COLUMN_COUNT; c++) {
            for (let r = 0; r < ROW_COUNT; r++) {
                drawCircle(c * SQUARESIZE + SQUARESIZE / 2, r * SQUARESIZE + SQUARESIZE + SQUARESIZE / 2, RADIUS, colors.BLACK);
                if (board[r][c] === 1) {
                    drawCircle(c * SQUARESIZE + SQUARESIZE / 2, r * SQUARESIZE + SQUARESIZE + SQUARESIZE / 2, RADIUS, colors.RED);
                } else if (board[r][c] === 2) {
                    drawCircle(c * SQUARESIZE + SQUARESIZE / 2, r * SQUARESIZE + SQUARESIZE + SQUARESIZE / 2, RADIUS, colors.YELLOW);
                }
            }
        }
    }

    function drawCircle(x, y, radius, color) {
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle = color;
        context.fill();
        context.stroke();
    }

    function isValidLocation(col) {
        return board[0][col] === 0;
    }

    function getNextOpenRow(col) {
        for (let r = ROW_COUNT - 1; r >= 0; r--) {
            if (board[r][col] === 0) {
                return r;
            }
        }
        return -1; // If no open row is found
    }

    function dropPiece(row, col, piece) {
        board[row][col] = piece;
    }

    function dropPieceAnimation(col, piece) {
        const row = getNextOpenRow(col);
        if (row === -1) return; // No valid row to drop the piece

        const x = col * SQUARESIZE + SQUARESIZE / 2;
        let y = SQUARESIZE / 2;
        let velocity = 1;

        const drop = setInterval(() => {
            if (y < height - (row + 1) * SQUARESIZE - SQUARESIZE / 2) {
                y += velocity;
                velocity += 1;
                context.clearRect(0, SQUARESIZE, width, height);
                drawBoard();
                drawCircle(x, y, RADIUS, piece === 1 ? colors.RED : colors.YELLOW);
            } else {
                clearInterval(drop);
                dropPiece(row, col, piece);
                drawBoard();
            }
        }, 10);
    }

    function winningMove(piece) {
        // Check horizontal locations for win
        for (let c = 0; c < COLUMN_COUNT - 3; c++) {
            for (let r = 0; r < ROW_COUNT; r++) {
                if (board[r][c] === piece && board[r][c + 1] === piece && board[r][c + 2] === piece && board[r][c + 3] === piece) {
                    return true;
                }
            }
        }

        // Check vertical locations for win
        for (let c = 0; c < COLUMN_COUNT; c++) {
            for (let r = 0; r < ROW_COUNT - 3; r++) {
                if (board[r][c] === piece && board[r + 1][c] === piece && board[r + 2][c] === piece && board[r + 3][c] === piece) {
                    return true;
                }
            }
        }

        // Check positively sloped diagonals
        for (let c = 0; c < COLUMN_COUNT - 3; c++) {
            for (let r = 0; r < ROW_COUNT - 3; r++) {
                if (board[r][c] === piece && board[r + 1][c + 1] === piece && board[r + 2][c + 2] === piece && board[r + 3][c + 3] === piece) {
                    return true;
                }
            }
        }

        // Check negatively sloped diagonals
        for (let c = 0; c < COLUMN_COUNT - 3; c++) {
            for (let r = 3; r < ROW_COUNT; r++) {
                if (board[r][c] === piece && board[r - 1][c + 1] === piece && board[r - 2][c + 2] === piece && board[r - 3][c + 3] === piece) {
                    return true;
                }
            }
        }

        return false;
    }

    function scorePosition(board, piece) {
        let score = 0;

        const centerArray = board.map(row => row[Math.floor(COLUMN_COUNT / 2)]);
        const centerCount = centerArray.filter(x => x === piece).length;
        score += centerCount * 3;

        for (let r = 0; r < ROW_COUNT; r++) {
            for (let c = 0; c < COLUMN_COUNT - 3; c++) {
                const window = board[r].slice(c, c + 4);
                score += evaluateWindow(window, piece);
            }
        }

        for (let c = 0; c < COLUMN_COUNT; c++) {
            const colArray = board.map(row => row[c]);
            for (let r = 0; r < ROW_COUNT - 3; r++) {
                const window = colArray.slice(r, r + 4);
                score += evaluateWindow(window, piece);
            }
        }

        for (let r = 0; r < ROW_COUNT - 3; r++) {
            for (let c = 0; c < COLUMN_COUNT - 3; c++) {
                const window = [board[r][c], board[r + 1][c + 1], board[r + 2][c + 2], board[r + 3][c + 3]];
                score += evaluateWindow(window, piece);
            }
        }

        for (let r = 0; r < ROW_COUNT - 3; r++) {
            for (let c = 0; c < COLUMN_COUNT - 3; c++) {
                const window = [board[r + 3][c], board[r + 2][c + 1], board[r + 1][c + 2], board[r][c + 3]];
                score += evaluateWindow(window, piece);
            }
        }

        return score;
    }

    function evaluateWindow(window, piece) {
        let score = 0;
        const oppPiece = piece === 1 ? 2 : 1;

        if (window.filter(x => x === piece).length === 4) {
            score += 100;
        } else if (window.filter(x => x === piece).length === 3 && window.filter(x => x === 0).length === 1) {
            score += 5;
        } else if (window.filter(x => x === piece).length === 2 && window.filter(x => x === 0).length === 2) {
            score += 2;
        }

        if (window.filter(x => x === oppPiece).length === 3 && window.filter(x => x === 0).length === 1) {
            score -= 4;
        }

        return score;
    }

    function isTerminalNode() {
        return winningMove(1) || winningMove(2) || getValidLocations().length === 0;
    }

    function getValidLocations() {
        const validLocations = [];
        for (let col = 0; col < COLUMN_COUNT; col++) {
            if (isValidLocation(col)) {
                validLocations.push(col);
            }
        }
        return validLocations;
    }

    function minimax(board, depth, alpha, beta, maximizingPlayer) {
        const validLocations = getValidLocations();
        const isTerminal = isTerminalNode();

        if (depth === 0 || isTerminal) {
            if (isTerminal) {
                if (winningMove(2)) {
                    return [null, 100000000000000];
                } else if (winningMove(1)) {
                    return [null, -10000000000000];
                } else {
                    return [null, 0];
                }
            } else {
                return [null, scorePosition(board, 2)];
            }
        }

        if (maximizingPlayer) {
            let value = -Infinity;
            let column = validLocations[Math.floor(Math.random() * validLocations.length)];
            for (const col of validLocations) {
                const row = getNextOpenRow(col);
                const bCopy = board.map(row => row.slice());
                dropPiece(bCopy, row, col, 2);
                const newScore = minimax(bCopy, depth - 1, alpha, beta, false)[1];
                if (newScore > value) {
                    value = newScore;
                    column = col;
                }
                alpha = Math.max(alpha, value);
                if (alpha >= beta) {
                    break;
                }
            }
            return [column, value];
        } else {
            let value = Infinity;
            let column = validLocations[Math.floor(Math.random() * validLocations.length)];
            for (const col of validLocations) {
                const row = getNextOpenRow(col);
                const bCopy = board.map(row => row.slice());
                dropPiece(bCopy, row, col, 1);
                const newScore = minimax(bCopy, depth - 1, alpha, beta, true)[1];
                if (newScore < value) {
                    value = newScore;
                    column = col;
                }
                beta = Math.min(beta, value);
                if (alpha >= beta) {
                    break;
                }
            }
            return [column, value];
        }
    }

    function resetBoard() {
        board = Array.from({ length: ROW_COUNT }, () => Array(COLUMN_COUNT).fill(0));
        drawBoard();
        gameOver = false;
        turn = 0;
        replayButton.style.display = 'none';
    }

    function updateScores() {
        document.getElementById('player1Score').innerText = `Player 1 Wins: ${player1_wins}`;
        document.getElementById('player2Score').innerText = `Player 2 Wins: ${player2_wins}`;
    }
});
