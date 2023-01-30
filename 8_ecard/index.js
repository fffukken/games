const express = require('express');
const http = require('http');

const socketIo = require('socket.io');
const { isTypedArray } = require('util/types');

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

// 0:平民、1:皇帝,2:奴隷
let emperorHands = [0, 0, 0, 0, 1];
let slaveHands = [0, 0, 0, 0, 2]

const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const createPlayerHands = () => {
    playerHands = [{ "emperorHand": shuffle(emperorHands), "slaveHand": shuffle(slaveHands) }]
    // playerHands = [{ "emperorHand": shuffle(emperorHands), "slaveHand": shuffle(slaveHands) }]
}


io.on('connection', (socket) => {
    console.log('connected');
    // 特定のプレイヤーにだけ、自分のIDを渡す
    io.to(socket.id).emit("token", { token: socket.id });

    // 接続数を確認
    console.log("接続数", socket.client.conn.server.clientsCount)
    let connectionCount = socket.client.conn.server.clientsCount;

    if (connectionCount === 1) {
        io.emit("players", "wait 1 player")
    } else if (connectionCount === 2) {
        io.emit("players", "gamestart")
        // 全員に手札を渡し、HTML側で自分以外の手を非表示にする
        socket.on('sendMyRole', (myRole) => {
            createPlayerHands(socket.id);
            io.to(socket.id).emit("role", myRole);
            if (myRole === "emperor") {
                // 自分以外（相手）にRoleを送る
                socket.broadcast.emit("role", "slave")
            } else {
                socket.broadcast.emit("role", "emperor")
            }
            io.emit("hands", playerHands);


        })
    } else {
        io.emit("players", "requestDisconnect")
    }
    console.log("接続数disco?", socket.client.conn.server.clientsCount)



    // 手札公開の際に改めて全プレイヤーの手札を送る。けど、この通信はなくせる気がする。
    // socket.on('requestShowHands', () => {
    //     console.log('showhand ');
    //     io.emit("showHands", playerHands);
    // });

});

