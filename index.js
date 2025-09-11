const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "chat.html"));
});

let users = {}; // socket.id -> { username, avatar }

io.on("connection", (socket) => {
  console.log("✅ user connected", socket.id);

  socket.on("join", ({ username, avatar }) => {
    users[socket.id] = { username, avatar };
    io.emit("userList", Object.values(users));
    socket.broadcast.emit("message", {
      username: "Hệ thống",
      text: `${username} đã tham gia phòng.`,
      avatar: ""
    });
  });

  socket.on("chatMessage", (msg) => {
    const user = users[socket.id];
    if (!user) return;
    io.emit("message", { username: user.username, text: msg, avatar: user.avatar });
  });

  socket.on("disconnect", () => {
    const user = users[socket.id];
    if (user) {
      socket.broadcast.emit("message", {
        username: "Hệ thống",
        text: `${user.username} đã rời phòng.`,
        avatar: ""
      });
      delete users[socket.id];
      io.emit("userList", Object.values(users));
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});