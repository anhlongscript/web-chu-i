// index.js
const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Serve static folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Danh sách user online
let users = {};

io.on("connection", (socket) => {
  console.log("🔌 New connection:", socket.id);

  socket.on("join", ({ nickname, avatar }) => {
    users[socket.id] = { nickname, avatar };
    io.emit("updateUsers", users);
    console.log(`${nickname} đã tham gia`);
  });

  socket.on("chatMessage", (msg) => {
    const user = users[socket.id];
    if (user) {
      io.emit("chatMessage", {
        nickname: user.nickname,
        avatar: user.avatar,
        text: msg,
      });
    }
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("updateUsers", users);
    console.log("❌ User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});