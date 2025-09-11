const socket = io();

const loginBox = document.getElementById("login-box");
const chatContainer = document.getElementById("chat-container");
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const avatarFile = document.getElementById("avatar").files[0];

  if (!username) return alert("Nhập tên vào!");

  if (avatarFile) {
    const reader = new FileReader();
    reader.onload = function () {
      localStorage.setItem("username", username);
      localStorage.setItem("avatar", reader.result);
      startChat(username, reader.result);
    };
    reader.readAsDataURL(avatarFile);
  } else {
    localStorage.setItem("username", username);
    localStorage.setItem("avatar", "");
    startChat(username, "");
  }
});

function startChat(username, avatar) {
  loginBox.classList.add("hidden");
  chatContainer.classList.remove("hidden");
  socket.emit("join", { username, avatar });
}

// Tự login nếu nhớ tài khoản
window.onload = () => {
  const username = localStorage.getItem("username");
  const avatar = localStorage.getItem("avatar");
  if (username) {
    loginBox.classList.add("hidden");
    chatContainer.classList.remove("hidden");
    socket.emit("join", { username, avatar });
  }
};

// Nhận tin nhắn
socket.on("message", (msg) => {
  const messages = document.getElementById("messages");
  const div = document.createElement("div");
  div.classList.add("message");

  const avatarImg = msg.avatar
    ? `<img src="${msg.avatar}" alt="avatar">`
    : `<img src="https://via.placeholder.com/32" alt="avatar">`;

  div.innerHTML = `${avatarImg}<div><strong>${msg.username}:</strong> ${msg.text}</div>`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
});

// Danh sách user
socket.on("userList", (list) => {
  const users = document.getElementById("users");
  users.innerHTML = "";
  list.forEach((user) => {
    const li = document.createElement("li");
    li.innerHTML = `<img src="${user.avatar || "https://via.placeholder.com/24"}"> ${user.username}`;
    users.appendChild(li);
  });
});

// Gửi tin nhắn
document.getElementById("chat-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = document.getElementById("msg").value;
  socket.emit("chatMessage", msg);
  document.getElementById("msg").value = "";
});

// Đăng xuất
document.getElementById("logout").addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

// Bật/Tắt nhạc
document.getElementById("toggleMusic").addEventListener("click", () => {
  const iframe = document.getElementById("bg-video");
  if (iframe.src.includes("mute=1")) {
    iframe.src = iframe.src.replace("mute=1", "mute=0");
  } else {
    iframe.src = iframe.src.replace("mute=0", "mute=1");
  }
});
