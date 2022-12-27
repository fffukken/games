const express = require('express');
const http = require('http');

const socketIo = require('socket.io');

const app = express();
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

io.on('connection', (socket) => {
    console.log('connectedだお');

    socket.on('sendMessage', (message) => {
        console.log('message has been sent:: ', message)
        // handsCheck(message)
        if (message["playerId"] === 0) {
            var player0hand = message["playerHand"]
        } else {
            var player1hand = message["playerHand"]
        }
        console.log(player0hand, player1hand)
        if (player0hand !== undefined && player1hand !== undefined) {
            var battleResult = battle(player0hand, player1hand)
            console.log(battleResult)
        }
        io.emit('receiveMessage', battleResult)
    })
});

function battle(player0hand, player1hand) {
    if (player0hand === player1hand) {
        return "hikiwake"
    } else {
        return "dottika kati"
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