const express = require('express');
const http = require('http');

const socketIo = require('socket.io');

const app = express();
app.use('/img', express.static('img'));

const server = http.Server(app);
const io = socketIo(server);

const PORT = 3000;

// ルーティングの設定。'/' にリクエストがあった場合 src/index.html を返す
app.get('/', (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + '/index.html');
    // res.sendFile(__dirname + '/img/janken_gu.png')
});

// 3000番ポートでHTTPサーバーを起動
server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

io.on('connection', (socket) => {
    console.log('connectedだお');

    socket.on('sendMessage', (message) => {
        console.log('message has been sent:: ', message)
        // handsCheck(message)
        for (const player of message) {
            if (player["playerId"] === 0) {
                var player0hand = player["playerHand"]
            } else {
                var player1hand = player["playerHand"]
            }
        }
        console.log(player0hand, player1hand)
        if (player0hand !== undefined && player1hand !== undefined) {
            var battleResult = battle(player0hand, player1hand)
            console.log(battleResult)
            io.emit('receiveMessage', battleResult)
        }
    })
});

function battle(player0hand, player1hand) {
    if (player0hand === player1hand) {
        return "あいこ"
    } else if (player0hand === "pa" && player1hand === "gu") {
        return "player1の勝ち！"
    } else if (player0hand === "gu" && player1hand === "choki") {
        return "player1の勝ち！"
    } else if (player0hand === "choki" && player1hand === "pa") {
        return "player1の勝ち！"
    } else {
        return "player2の勝ち！"
    }
}

// function handsCheck(message){
//     console.log("start hand check")
//     console.log(message)
//     if (message["playerId"] === 0) {
//         var playerhand = message["playerHand"]
//     } else {
//         var playerhand = message["playerHand"]
//     }
//     return playerhand
//     // console.log(message, player0hand, player1hand)
// }