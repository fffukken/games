const express = require('express');
const http = require('http');

const socketIo = require('socket.io');

const app = express();
// 使用する画像ファイルをexpressサーバに追加
// app.use('/img', express.static('img'));

const server = http.Server(app);
const io = socketIo(server);

const PORT = 3000;

// ルーティングの設定。'/' にリクエストがあった場合 src/index.html を返す
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// 3000番ポートでHTTPサーバーを起動
server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

let playerHands = [];
let message = "";

const createPlayerHands = (token) => {
    const randomHand = Math.trunc(Math.random() * 13) + 1;
    playerHands.push({ "token": token, "hand": randomHand })
    if (playerHands.length > 5) {
        clearHands()
        message += "ブラウザをリロードしてください"
    }
}

const clearHands = () => {
    playerHands = [];
    //TODO： プレイヤー数をいい感じに調整したい

    io.emit("reload", "");

}


io.on('connection', (socket) => {
    console.log('connected');
    // 特定のプレイヤーにだけ、自分のIDを渡す
    io.to(socket.id).emit("token", { token: socket.id });

    // 全員に手札を渡し、HTML側で自分以外の手を非表示にする
    createPlayerHands(socket.id);
    io.emit("hands", playerHands);

    // 手札公開の際に改めて全プレイヤーの手札を送る。けど、この通信はなくせる気がする。
    socket.on('requestShowHands', () => {
        console.log('showhand ');
        io.emit("showHands", playerHands);
    });

});

