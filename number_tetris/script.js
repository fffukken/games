// Constants
const boardWidth = 3;
const boardHeight = 6;
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

            // Set the background color based on the value in the board
            const cellValue = board[row][col];
            cell.style.backgroundColor = getTileColor(cellValue);

            // Display the block value as text
            if (cellValue > 0) {
                cell.textContent = cellValue;
            }

            gameBoard.appendChild(cell);
        }
    }
}

// Function to get the tile color based on the cell value
function getTileColor(cellValue) {
    if (cellValue === 2) {
        return "white"; // For value 2, set the background color to white
    } else if (cellValue >= 1024) {
        return "red"; // For values 1024 and above, set the background color to red
    } else if (cellValue > 2) {
        return "blue"; // For values greater than 2 and less than 1024, set the background color to blue
    } else {
        return "transparent"; // Default background color (or any other color you prefer)
    }
}


// Update the score
function updateScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = score;
}
// Main game loop
let gameInterval; // ゲームループのインターバルを格納する変数
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
    // // Check if the block has reached the top
    // if (board[boardHeight - 1].some(cell => cell > 0)) {
    //     // Game over logic here
    //     alert("Game Over");
    //     clearInterval(gameInterval); // ゲームループを停止

    //     return;
    // }
    // Implement other game logic here
    // ...
}

// ボード上にあるすべての数字を取得してリストにする関数
function getAllValuesOnBoard() {
    const allValues = [];
    for (let row = 0; row < boardHeight; row++) {
        for (let col = 0; col < boardWidth; col++) {
            const cellValue = board[row][col];
            if (cellValue > 0) {
                allValues.push(cellValue);
            }
        }
    }
    return allValues;
}

// ボード上のランダムな値を取得
function getRandomValueFromBoard() {
    const allValues = getAllValuesOnBoard();
    if (allValues.length > 0) {
        const randomIndex = Math.floor(Math.random() * allValues.length);
        return allValues[randomIndex];
    } else {
        // ボード上に数字がない場合のエラーハンドリング
        console.error("ボード上に数字がありません。");
        // 代替の値を返すか、エラーを適切に処理します
        return 0; // 代替の値を返す例
    }
}

// Generate a random block (2, 4, or 8)
let useRandomValue = true; // 初回はランダムな値を使用

function generateRandomBlock() {
    if (useRandomValue) {
        const possibleValues = [2, 4, 8];
        const randomIndex = Math.floor(Math.random() * possibleValues.length);
        useRandomValue = false; // 次回はボード上の値を使用
        return possibleValues[randomIndex];
    } else {
        // ボード上のランダムな値を取得
        const allValues = getAllValuesOnBoard();
        const randomIndex = Math.floor(Math.random() * allValues.length);
        console.log(allValues, randomIndex)
        useRandomValue = true; // 次回は再びランダムな値を使用
        return allValues[randomIndex];
    }
}


function mergeAndMoveBlocks() {
    let merged = false;

    for (let row = boardHeight - 1; row >= 0; row--) {
        for (let col = 0; col < boardWidth; col++) {
            if (board[row][col] !== 0) {
                // Merge right
                if (col < boardWidth - 1 && board[row][col] === board[row][col + 1]) {
                    // マージした数字をスコアに加算
                    score += board[row][col];
                    board[row][col] *= 2;
                    board[row][col + 1] = 0;
                    merged = true;
                }
                // Merge up
                if (row > 0 && board[row][col] === board[row - 1][col]) {
                    // マージした数字をスコアに加算
                    score += board[row][col];
                    board[row][col] *= 2;
                    board[row - 1][col] = 0;
                    merged = true;
                }
            }
        }
    }

    // スコアを画面に更新
    updateScore();

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

// Function to get the tile color based on the cell value
function getTileColor(cellValue) {
    if (cellValue <= 1024) {
        // Calculate blue component based on cellValue
        const blue = (255 / 1024) * cellValue;
        return `rgb(0, 0, ${blue})`;
    } else if (cellValue <= 9096) {
        // Calculate red and green components based on cellValue
        const red = (255 / 9096) * cellValue;
        const green = (255 / 9096) * cellValue;
        return `rgb(${red}, ${green}, 255)`;
    } else {
        return "transparent"; // Default background color (or any other color you prefer)
    }
}

startGame();
