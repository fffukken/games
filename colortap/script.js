const gameContainer = document.getElementById('game-container');
const targetColorDisplay = document.getElementById('target-color');
let colorTiles = document.querySelectorAll('.color-tile');
const scoreDisplay = document.getElementById('score-display');
const timerDisplay = document.getElementById('timer-display');

let score = 0;
let timeRemaining = 15;
let timer;
let targetColor;

// Add the new color to the colors array
const baseColors = ['red', 'blue', 'green', 'orange', 'purple', 'black', 'yellow', 'brown'];

// Add a variable to track the current stage
let currentStage = 1;

// Add a variable to track the colors for the current stage
let colors;

function generateTargetColor() {
    targetColor = colors[Math.floor(Math.random() * colors.length)];

    // Set the text content
    targetColorDisplay.textContent = targetColor;

    // Set a random text color different from the target color
    let textColor;
    do {
        textColor = colors[Math.floor(Math.random() * colors.length)];
    } while (textColor === targetColor);

    targetColorDisplay.style.color = textColor;
}
function tileTapHandler(event) {
    const tappedColor = event.target.id;
    if (tappedColor === targetColor) {
        generateTargetColor();
        updateScore();
    } else {
        // Handle incorrect tap if needed
    }
}

function updateScore() {
    score += 1;
    scoreDisplay.textContent = `Score: ${score}`;
}

function startTimer() {
    timerDisplay.textContent = `Time: ${timeRemaining}s`;
    timer = setInterval(() => {
        timeRemaining -= 1;
        timerDisplay.textContent = `Time: ${timeRemaining}s`;

        if (timeRemaining <= 0) {
            gameOver();
        }
    }, 1000);
}

function gameOver() {
    clearInterval(timer);

    if (score > 9) {
        alert(`Congratulations! You have advanced to Stage ${currentStage + 1}`);
        nextStage();
    } else {
        alert(`Game over! Your score: ${score}`);
        initializeGame();
    }
}

function nextStage() {
    currentStage += 1;
    colors = baseColors.slice(0, currentStage + 1);

    // Reset the game state for the new stage
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    timeRemaining = 15;

    // Remove previous color tiles
    colorTiles.forEach(tile => {
        gameContainer.removeChild(tile);
    });

    // Add new color tiles
    colors.forEach(color => {
        const newColorTile = document.createElement('div');
        newColorTile.className = 'color-tile';
        newColorTile.id = color;
        gameContainer.appendChild(newColorTile);
        newColorTile.addEventListener('click', tileTapHandler);
    });

    // Update the colorTiles NodeList
    colorTiles = document.querySelectorAll('.color-tile');

    // Generate a new target color
    generateTargetColor();

    // Update timer display and clear the existing timer
    timerDisplay.textContent = `Time: ${timeRemaining}s`;
    // console.log(timerDisplay.textContent)
    clearInterval(timer);

    // Start a new timer
    startTimer();
}


function initializeGame() {
    // Set the colors for the current stage
    colors = baseColors.slice(0, currentStage + 1);

    // Update the color tiles event listeners
    colorTiles.forEach(tile => {
        tile.removeEventListener('click', tileTapHandler);
    });

    // Add new color tiles
    for (let i = 0; i < colors.length; i++) {
        colorTiles[i].id = colors[i];
        colorTiles[i].addEventListener('click', tileTapHandler);
    }

    // Reset the game state for the new stage
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    timeRemaining = 15;
    startTimer();
    generateTargetColor();
}


initializeGame();
