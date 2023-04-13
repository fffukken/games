const gameContainer = document.getElementById('game-container');
const targetColorDisplay = document.getElementById('target-color');
const colorTiles = document.querySelectorAll('.color-tile');
const scoreDisplay = document.getElementById('score-display');
const timerDisplay = document.getElementById('timer-display');

let score = 0;
let timeRemaining = 30;
let timer;
let targetColor;

function generateTargetColor() {
    const colors = ['red', 'blue', 'green', 'yellow'];
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    targetColorDisplay.textContent = targetColor;
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
    timer = setInterval(() => {
        timeRemaining -= 1;
        timerDisplay.textContent = `Time: ${timeRemaining}s`;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            gameOver();
        }
    }, 1000);
}

function gameOver() {
    colorTiles.forEach(tile => {
        tile.removeEventListener('click', tileTapHandler);
    });
    alert(`Game over! Your score: ${score}`);
}

function initializeGame() {
    colorTiles.forEach(tile => {
        tile.addEventListener('click', tileTapHandler);
    });
    generateTargetColor();
    startTimer();
}

initializeGame();
