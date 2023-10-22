// Constants
const boardWidth = 3;
const boardHeight = 10;
const blockColors = ["#FF0000", "#00FF00", "#0000FF"]; // Color for each number (2, 4, 8)

// Game state
let board = [];
let score = 0;

// Initialize the game board
function initializeBoard() {
    for (let row = 0; row < boardHeight; row++) {
        board[row] = [];
        for (let col = 0; col < boardWidth; col++) {
            board[row][col] = 0; // Initialize all cells to 0
        }
    }
}

// Render the game board
function renderBoard() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = ""; // Clear the board

    for (let row = 0; row < boardHeight; row++) {
        for (let col = 0; col < boardWidth; col++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.style.backgroundColor = blockColors[board[row][col]];

            // Display the block value as text
            if (board[row][col] > 0) {
                cell.textContent = board[row][col];
            }

            gameBoard.appendChild(cell);
        }
    }
}


// Update the score
function updateScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = score;
}

// Main game loop
// Main game loop
function gameLoop() {
    // Add code for block generation, movement, addition, and game end conditions
    // Remember to call renderBoard() and updateScore() to update the display

    // Check if the game board is empty (first run)
    if (board.every(row => row.every(cell => cell === 0)) && score === 0) {
        // Display the initial block on the game board
        const initialBlock = generateRandomBlock();
        const startX = Math.floor(boardWidth / 2); // Start block in the middle
        const startY = 0; // Start block at the top
        board[startY][startX] = initialBlock;

        renderBoard();
        updateScore();
    }

    // Implement other game logic here
    // ...
}

// Generate a random block (2, 4, or 8)
function generateRandomBlock() {
    const possibleValues = [2, 4, 8];
    const randomIndex = Math.floor(Math.random() * possibleValues.length);
    return possibleValues[randomIndex];
}
// Function to merge and move blocks after moving down
function mergeAndMoveBlocks() {
    let merged = false;

    for (let row = boardHeight - 1; row >= 0; row--) {
        for (let col = 0; col < boardWidth; col++) {
            if (board[row][col] !== 0) {
                // Merge right
                if (col < boardWidth - 1 && board[row][col] === board[row][col + 1]) {
                    board[row][col] *= 2;
                    board[row][col + 1] = 0;
                    merged = true;
                }
                // Merge up
                if (row > 0 && board[row][col] === board[row - 1][col]) {
                    board[row][col] *= 2;
                    board[row - 1][col] = 0;
                    merged = true;
                }
            }
        }
    }

    // If merging has occurred, continue the process recursively
    if (merged) {
        mergeAndMoveBlocks(); // Recursively call the function
    } else {
        // Move merged blocks down
        for (let row = boardHeight - 1; row >= 0; row--) {
            for (let col = 0; col < boardWidth; col++) {
                if (board[row][col] !== 0) {
                    for (let newRow = row; newRow < boardHeight - 1; newRow++) {
                        if (board[newRow + 1][col] === 0) {
                            // Move the block down
                            board[newRow + 1][col] = board[row][col];
                            board[row][col] = 0;
                        }
                    }
                }
            }
        }
    }
}

// Move the current block down as far as possible
function moveBlockDown() {
    let moved = false;

    // Loop through the rows from the bottom to the top
    for (let row = boardHeight - 2; row >= 0; row--) {
        for (let col = 0; col < boardWidth; col++) {
            if (board[row][col] > 0) {
                for (let newRow = row + 1; newRow < boardHeight; newRow++) {
                    if (board[newRow][col] === 0) {
                        // Move the block down
                        board[newRow][col] = board[row][col];
                        board[row][col] = 0;
                        moved = true;
                    } else {
                        break; // Stop when the block encounters another block
                    }
                }
            }
        }
    }

    // If the block hasn't moved down completely, continue moving it down
    if (moved) {
        requestAnimationFrame(moveBlockDown);
    } else {
        mergeAndMoveBlocks();

        // Generate a new block after the current block has settled
        const newBlockValue = generateRandomBlock();
        const startX = Math.floor(boardWidth / 2);
        board[0][startX] = newBlockValue;

        renderBoard();
    }
}
// Move the current block left by one cell
function moveBlockLeft() {
    let moved = false;

    for (let row = 0; row < 1; row++) {
        for (let col = 1; col < boardWidth; col++) {
            if (board[row][col] > 0 && board[row][col - 1] === 0) {
                // Move the block left
                board[row][col - 1] = board[row][col];
                board[row][col] = 0;
                moved = true;
            }
        }
    }

    if (moved) {
        renderBoard();
    }
}

// Move the current block right by one cell
function moveBlockRight() {
    let moved = false;

    // 一番上の列だけ左右に移動させる
    for (let row = 0; row < 1; row++) {
        for (let col = boardWidth - 2; col >= 0; col--) {
            if (board[row][col] > 0 && board[row][col + 1] === 0) {
                // Move the block right
                board[row][col + 1] = board[row][col];
                board[row][col] = 0;
                moved = true;
            }
        }
    }

    if (moved) {
        renderBoard();
    }
}



// Start the game
function startGame() {
    console.log("dg")
    initializeBoard();
    renderBoard();
    updateScore();
    // You can set up event listeners for user input here
    // Example: document.addEventListener("keydown", handleKeyPress);
    setInterval(gameLoop, 1000); // Update the game every second
// Event listener for ArrowDown key
}

// キーボード入力を監視
document.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "ArrowLeft":
            // 左キーが押された場合、テトリミノを左に移動
            moveBlockLeft()
            break;
        case "ArrowRight":
            // 右キーが押された場合、テトリミノを右に移動
            moveBlockRight()
            break;
        case "ArrowDown":
            // 下矢印キーが押された場合、テトリミノを1マス下に移動
            moveBlockDown();
            break;

    }
});


startGame();
