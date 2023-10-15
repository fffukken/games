// ゲームの初期化
function initGame() {
    // ゲームの初期化ロジックをここに書く
}

// ゲームのメインループ
function gameLoop() {
    // ゲームのメインループロジックをここに書く
    requestAnimationFrame(gameLoop);
}

// ゲームの開始
function startGame() {
    initGame();
    gameLoop();
}

// ゲームを開始するためのイベントリスナー
window.addEventListener('load', startGame);
