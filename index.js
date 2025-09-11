const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const multer = require("multer");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

// lưu avatar khi upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "public", "uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// tạm lưu người dùng
let users = {};

// API upload avatar
app.post("/upload", upload.single("avatar"), (req, res) => {
  res.json({ filePath: "/uploads/" + req.file.filename });
});

io.on("connection", (socket) => {
  console.log("🔵 User connected", socket.id);

  socket.on("register", (user) => {
    users[socket.id] = user;
    io.emit("userList", Object.values(users));
  });

  socket.on("chatMessage", (msg) => {
    const user = users[socket.id];
    if (user) {
      io.emit("chatMessage", { user, msg });
    }
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("userList", Object.values(users));
  });
});

server.listen(PORT, () => console.log(`✅ Server chạy ở cổng ${PORT}`));