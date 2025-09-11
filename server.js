// index.js (root)
const express = require('express');
const path = require('path');
const http = require('http'); // thêm http server
const app = express();
const server = http.createServer(app); // tạo server từ http
const { Server } = require('socket.io');
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Serve toàn bộ thư mục public
app.use(express.static(path.join(__dirname, 'public')));

// root -> trả về file login (public/index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Socket.IO xử lý chat
io.on('connection', (socket) => {
  console.log('🔗 Người dùng mới kết nối');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('❌ Người dùng thoát');
  });
});

// Dùng server.listen thay vì app.listen
server.listen(PORT, () => {
  console.log(`✅ streaky đang chạy ở cổng ${PORT}`);
});
