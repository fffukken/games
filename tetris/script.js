
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

// テトリミノをランダムに選択
function getRandomTetrimino() {
    const randomType = tetriminoTypes[Math.floor(Math.random() * tetriminoTypes.length)];
    const tetrimino = {
        type: randomType,
        shape: [], // テトリミノの形状
        color: "", // テトリミノの色
    };

    // テトリミノの形状と色を設定
    switch (randomType) {
        case "I":
            tetrimino.shape = [[1, 1, 1, 1]];
            tetrimino.color = "cyan";
            break;
        case "J":
            tetrimino.shape = [[1, 0, 0], [1, 1, 1]];
            tetrimino.color = "blue";
            break;
        case "L":
            tetrimino.shape = [[0, 0, 1], [1, 1, 1]];
            tetrimino.color = "orange";
            break;
        case "O":
            tetrimino.shape = [[1, 1], [1, 1]];
            tetrimino.color = "yellow";
            break;
        case "S":
            tetrimino.shape = [[0, 1, 1], [1, 1, 0]];
            tetrimino.color = "green";
            break;
        case "T":
            tetrimino.shape = [[0, 1, 0], [1, 1, 1]];
            tetrimino.color = "purple";
            break;
        case "Z":
            tetrimino.shape = [[1, 1, 0], [0, 1, 1]];
            tetrimino.color = "red";
            break;
        default:
            break;
    }

    return tetrimino;
}


// テトリミノの初期位置
let currentTetrimino = getRandomTetrimino();
let currentX = 0;
let currentY = 0;


// Canvasをクリア
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}



// ゲームの初期化
function initGame() {
    // ゲームボードの初期化
    createEmptyGameBoard();
    // 他の初期化処理
    requestAnimationFrame(gameLoop);
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

// ゲームボードを描画
function drawGameBoard() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
            const cell = gameBoard[row][col];
            if (cell !== 0) {
                // 塗りつぶす色を設定
                ctx.fillStyle = "gray";
                // セルを描画
                ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                // 枠を描画
                ctx.strokeStyle = "black";
                ctx.strokeRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
    }
}

// テトリミノを描画
function drawTetrimino(tetrimino, x, y) {
    for (let row = 0; row < tetrimino.shape.length; row++) {
        for (let col = 0; col < tetrimino.shape[row].length; col++) {
            if (tetrimino.shape[row][col]) {
                // テトリミノのセルを描画（青色）
                ctx.fillStyle = "blue";
                ctx.fillRect((x + col) * CELL_SIZE, (y + row) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                // 枠を描画
                ctx.strokeStyle = "black";
                ctx.strokeRect((x + col) * CELL_SIZE, (y + row) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
    }
}
const GRAVITY_INTERVAL = 300; // 300ミリ秒ごとに自動的にテトリミノを1マス下に移動
let lastGravityTime = 0; // 最後に重力が適用された時間

// キーボード入力を監視
document.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "ArrowLeft":
            // 左キーが押された場合、テトリミノを左に移動
            moveTetrimino(-1, 0);
            break;
        case "ArrowRight":
            // 右キーが押された場合、テトリミノを右に移動
            moveTetrimino(1, 0);
            break;
        case "ArrowDown":
            // 下矢印キーが押された場合、テトリミノを1マス下に移動
            moveTetrimino(0, 1);
            break;
            
        case "ArrowUp":
            // スペースキーが押された場合、テトリミノを時計回りに回転
            rotateTetrimino();
            break;
    }
});



const NEW_TETRIMINO_INTERVAL = 1000; // 新しいテトリミノを作成する間隔（ミリ秒）
let lastNewTetriminoTime = Date.now();

function gameLoop() {
    const currentTime = Date.now();

    if (currentTime - lastGravityTime >= GRAVITY_INTERVAL) {
        // 一定の時間間隔ごとにテトリミノを1マス下に移動
        if (moveTetrimino(0, 1) === undefined) {
            // テトリミノが下に移動可能な場合
            lastGravityTime = currentTime;
        } else {
            // テトリミノが下に移動できない場合
            placeTetrimino(); // テトリミノをゲームボードに配置
            const timeSinceLastNewTetrimino = currentTime - lastNewTetriminoTime;
            if (timeSinceLastNewTetrimino >= NEW_TETRIMINO_INTERVAL) {
                // 新しいテトリミノを生成
                currentTetrimino = getRandomTetrimino();
                currentX = 0;
                currentY = 0;
                lastNewTetriminoTime = currentTime; // 新しいテトリミノの生成時刻を更新
            }
        }
    }

    clearCanvas();
    drawGameBoard();
    drawTetrimino(currentTetrimino, currentX, currentY);

    requestAnimationFrame(gameLoop);
}
function clearFullRows() {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (gameBoard[row].every(cell => cell !== 0)) {
            // この行がすべて埋まっている場合
            gameBoard.splice(row, 1); // 行を削除
            gameBoard.unshift(new Array(COLUMNS).fill(0)); // 新しい行を先頭に挿入
        }
    }
}



function placeTetrimino() {
    for (let row = 0; row < currentTetrimino.shape.length; row++) {
        for (let col = 0; col < currentTetrimino.shape[row].length; col++) {
            if (currentTetrimino.shape[row][col]) {
                const boardX = currentX + col;
                const boardY = currentY + row;

                // テトリミノをゲームボードに配置
                gameBoard[boardY][boardX] = currentTetrimino.color;
            }
        }
    }

    // 行の削除を確認
    clearFullRows();
}



// テトリミノの回転
function rotateTetrimino() {
    const previousShape = currentTetrimino.shape;
    currentTetrimino.shape = rotateMatrix(currentTetrimino.shape);

    // 回転が無効な場合、元に戻す
    if (!isValidMove(currentTetrimino, currentX, currentY)) {
        currentTetrimino.shape = previousShape;
    }
}

// マトリックスを時計回りに回転
function rotateMatrix(matrix) {
    const N = matrix.length;
    const result = new Array(N).fill(0).map(() => new Array(N).fill(0));

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            result[i][j] = matrix[N - 1 - j][i];
        }
    }

    return result;
}

// 他の関数（moveTetrimino, isValidMove）は前回の回答を参照
// テトリミノの移動
function moveTetrimino(dx, dy) {
    // dx は横方向の移動量（-1: 左, 1: 右）
    // dy は縦方向の移動量

    // 移動前の位置を保存
    const previousX = currentX;
    const previousY = currentY;

    // 移動後の位置を計算
    currentX += dx;
    currentY += dy;

    // 移動が有効かどうかをチェック（衝突検出など）

    if (!isValidMove(currentTetrimino, currentX, currentY)) {
        // 移動が無効な場合、位置を元に戻す
        currentX = previousX;
        currentY = previousY;
        // 移動ができない場合はテトリミノを移動させず、次のテトリミノを作る
        return true;
    }

    // ゲームボードを再描画
    clearCanvas();
    drawGameBoard();
    drawTetrimino(currentTetrimino, currentX, currentY);
}

// 移動が有効かどうかをチェック
function isValidMove(tetrimino, x, y) {
    for (let row = 0; row < tetrimino.shape.length; row++) {
        for (let col = 0; col < tetrimino.shape[row].length; col++) {
            if (tetrimino.shape[row][col]) {
                const boardX = x + col;
                const boardY = y + row;

                // 移動先がゲームボードの境界外か、他のテトリミノと衝突している場合は無効
                if (
                    boardX < 0 ||
                    boardX >= COLUMNS ||
                    boardY >= ROWS ||
                    (boardY >= 0 && gameBoard[boardY][boardX] !== 0)
                ) {
                    return false;
                }
            }
        }
    }
    return true;
}
// ゲームを開始
initGame();
