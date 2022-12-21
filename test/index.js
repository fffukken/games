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

        io.emit('receiveMessage', message)
    })
})