// Canvas要素の取得
const canvas = document.getElementById("tetrisCanvas");
const ctx = canvas.getContext("2d");

// ゲームボードの設定
const ROWS = 20;
const COLUMNS = 10;
const CELL_SIZE = 30;
// ゲームボードの状態を表す配列
let gameBoard = [];

// テトリミノの種類
const tetriminoTypes = ["I", "J", "L", "O", "S", "T", "Z"];


// ゲームの初期化
function initGame() {
    console.log("A",gameBoard)
    gameBoard = createEmptyGameBoard();
    console.log(gameBoard)
}


// ゲームボードを初期化
function createEmptyGameBoard() {
    for (let row = 0; row < ROWS; row++) {
        gameBoard[row] = [];
        for (let col = 0; col < COLUMNS; col++) {
            gameBoard[row][col] = 0; // 0 は空のセルを表す
        }
    }
}

// ゲームを開始
initGame();
console.log(gameBoard , "B")