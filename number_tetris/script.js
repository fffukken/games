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
function gameLoop() {
    // Update the game logic here
    // Add code for block generation, movement, addition, and game end conditions
    // Remember to call renderBoard() and updateScore() to update the display
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
