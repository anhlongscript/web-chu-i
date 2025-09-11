const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('🔗 Kết nối mới');

  socket.on("join", (nickname) => {
    socket.nickname = nickname;
    io.emit("system", `✨ ${nickname} đã tham gia chat`);
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    if (socket.nickname) {
      io.emit("system", `👋 ${socket.nickname} đã rời khỏi chat`);
    }
  });
});

server.listen(PORT, () => {
  console.log(`✅ WebChat chạy ở cổng ${PORT}`);
});
