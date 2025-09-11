const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

let users = {}; // socket.id -> { name }

io.on("connection", (socket) => {
  console.log("✅ Người dùng mới kết nối");

  socket.on("login", ({ name }) => {
    users[socket.id] = { name };
    io.emit("updateUsers", Object.values(users));
  });

  socket.on("chatMessage", (msg) => {
    const user = users[socket.id];
    if (user) {
      io.emit("chatMessage", { name: user.name, msg });
    }
  });

  socket.on("logout", () => {
    delete users[socket.id];
    io.emit("updateUsers", Object.values(users));
    socket.disconnect();
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("updateUsers", Object.values(users));
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server chạy tại cổng ${PORT}`);
});
