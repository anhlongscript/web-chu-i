const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Serve thư mục public
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Danh sách user
let users = {};

io.on("connection", (socket) => {
  console.log("🔌 Người dùng kết nối:", socket.id);

  socket.on("login", ({ name, avatar }) => {
    users[socket.id] = { name, avatar };
    io.emit("userList", Object.values(users));
  });

  socket.on("chatMessage", (msg) => {
    if (users[socket.id]) {
      io.emit("chatMessage", {
        user: users[socket.id],
        text: msg,
      });
    }
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("userList", Object.values(users));
    console.log("❌ Người dùng thoát:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`✅ Streaky đang chạy ở cổng ${PORT}`);
});
