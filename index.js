const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const multer = require("multer");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

// Bộ nhớ giả (RAM)
let usersDB = {}; // { username: { password, avatarUrl } }

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Multer upload avatar
const upload = multer({ dest: "public/uploads/" });

// API đăng ký
app.post("/register", upload.single("avatar"), (req, res) => {
  const { username, password } = req.body;

  if (usersDB[username]) {
    return res.status(400).json({ message: "Tên đã tồn tại" });
  }

  let avatarUrl = "/default.png";
  if (req.file) {
    avatarUrl = "/uploads/" + req.file.filename;
  }

  usersDB[username] = { password, avatarUrl };
  console.log("✅ Đăng ký:", username);

  res.json({ success: true });
});

// API đăng nhập
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!usersDB[username] || usersDB[username].password !== password) {
    return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu" });
  }

  res.json({ success: true, avatarUrl: usersDB[username].avatarUrl });
});

// Chat socket.io
io.on("connection", (socket) => {
  console.log("🔗 User connected:", socket.id);

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`✅ Server chạy ở cổng ${PORT}`);
});