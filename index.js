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

let users = [];

io.on('connection', (socket) => {
  console.log('🔗 Kết nối mới');

  socket.on("join", ({ nickname, avatar }) => {
    socket.nickname = nickname;
    socket.avatar = avatar;
    users.push({ id: socket.id, nickname, avatar });
    io.emit("chat message", { system: true, text: `✨ ${nickname} đã tham gia chat` });
    io.emit("onlineUsers", users);
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    if (socket.nickname) {
      users = users.filter(u => u.id !== socket.id);
      io.emit("chat message", { system: true, text: `👋 ${socket.nickname} đã rời khỏi chat` });
      io.emit("onlineUsers", users);
    }
  });
});

server.listen(PORT, () => {
  console.log(`✅ WebChat chạy ở cổng ${PORT}`);
});
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

let users = [];

io.on('connection', (socket) => {
  console.log('🔗 Kết nối mới');

  socket.on("join", ({ nickname, avatar }) => {
    socket.nickname = nickname;
    socket.avatar = avatar;
    users.push({ id: socket.id, nickname, avatar });
    io.emit("chat message", { system: true, text: `✨ ${nickname} đã tham gia chat` });
    io.emit("onlineUsers", users);
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    if (socket.nickname) {
      users = users.filter(u => u.id !== socket.id);
      io.emit("chat message", { system: true, text: `👋 ${socket.nickname} đã rời khỏi chat` });
      io.emit("onlineUsers", users);
    }
  });
});

server.listen(PORT, () => {
  console.log(`✅ WebChat chạy ở cổng ${PORT}`);
});
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

let users = [];

io.on('connection', (socket) => {
  console.log('🔗 Kết nối mới');

  socket.on("join", ({ nickname, avatar }) => {
    socket.nickname = nickname;
    socket.avatar = avatar;
    users.push({ id: socket.id, nickname, avatar });
    io.emit("chat message", { system: true, text: `✨ ${nickname} đã tham gia chat` });
    io.emit("onlineUsers", users);
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    if (socket.nickname) {
      users = users.filter(u => u.id !== socket.id);
      io.emit("chat message", { system: true, text: `👋 ${socket.nickname} đã rời khỏi chat` });
      io.emit("onlineUsers", users);
    }
  });
});

server.listen(PORT, () => {
  console.log(`✅ WebChat chạy ở cổng ${PORT}`);
});
