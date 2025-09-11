// index.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

let users = {}; // lưu user đang online

// serve static
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

// socket.io
io.on('connection', socket => {
  console.log('🔗 user connected');

  socket.on('join', ({ username, avatar }) => {
    users[socket.id] = { username, avatar };
    io.emit('userList', Object.values(users));
  });

  socket.on('chatMessage', msg => {
    if (users[socket.id]) {
      io.emit('message', {
        username: users[socket.id].username,
        avatar: users[socket.id].avatar,
        text: msg
      });
    }
  });

  socket.on('disconnect', () => {
    delete users[socket.id];
    io.emit('userList', Object.values(users));
    console.log('❌ user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
