const socket = io();
let nickname = "";
let avatar = "";

// Convert ảnh thành base64
function getBase64(file, callback) {
  const reader = new FileReader();
  reader.onload = function () {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

function joinChat() {
  nickname = document.getElementById("nickname").value.trim();
  const file = document.getElementById("avatarFile").files[0];

  if (!nickname) return alert("Bạn cần nhập nickname!");

  if (file) {
    getBase64(file, (data) => {
      avatar = data;
      startChat();
    });
  } else {
    avatar = "https://i.pravatar.cc/150?u=" + nickname; // avatar mặc định
    startChat();
  }
}

function startChat() {
  document.getElementById("login").style.display = "none";
  document.getElementById("chat").style.display = "flex";
  socket.emit("join", { nickname, avatar });
}

function sendMessage() {
  const input = document.getElementById("msgInput");
  const msg = input.value.trim();
  if (msg) {
    socket.emit("chatMessage", msg);
    input.value = "";
  }
}

// Nhận tin nhắn từ server
socket.on("chatMessage", (data) => {
  const messages = document.getElementById("messages");
  const div = document.createElement("div");
  div.className = "message";
  div.innerHTML = `<img src="${data.avatar}" class="avatar">
                   <b>${data.nickname}:</b> ${data.text}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
});

// Cập nhật danh sách user online
socket.on("updateUsers", (users) => {
  const userList = document.getElementById("userList");
  const count = document.getElementById("count");
  userList.innerHTML = "";
  count.innerText = Object.keys(users).length;
  for (let id in users) {
    const li = document.createElement("li");
    li.innerHTML = `<img src="${users[id].avatar}" class="avatar">
                    ${users[id].nickname}`;
    userList.appendChild(li);
  }
});
