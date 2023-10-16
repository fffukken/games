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

// Start the game
function startGame() {
    initializeBoard();
    renderBoard();
    updateScore();
    // You can set up event listeners for user input here
    // Example: document.addEventListener("keydown", handleKeyPress);
    setInterval(gameLoop, 1000); // Update the game every second
}

startGame();
