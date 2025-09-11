const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const multer = require('multer');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

// Cấu hình upload avatar
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

app.use(express.static(path.join(__dirname, 'public')));

// API upload
app.post('/upload', upload.single('avatar'), (req, res) => {
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

// Danh sách user
let users = [];

io.on('connection', (socket) => {
  socket.on('register', (user) => {
    socket.user = user;
    users.push(user);
    io.emit('userList', users);
  });

  socket.on('chatMessage', (msg) => {
    if (socket.user) {
      io.emit('chatMessage', { user: socket.user, msg });
    }
  });

  socket.on('disconnect', () => {
    users = users.filter(u => u !== socket.user);
    io.emit('userList', users);
  });
});

server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});