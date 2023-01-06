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
    // res.sendFile(__dirname + '/img/janken_gu.png')
});

// 3000番ポートでHTTPサーバーを起動
server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

io.on('connection', (socket) => {
    console.log('connectedだお');
    console.log(socket.id)
    io.emit("token", { token: socket.id });
    // io.to(socket.id).emit("token", { token: socket.id });
    socket.on('sendMessage', (message) => {
        console.log('message has been sent:: ', message)
    })
});

