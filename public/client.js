const socket = io();

const loginScreen = document.getElementById("loginScreen");
const chatScreen = document.getElementById("chatScreen");
const loginForm = document.getElementById("loginForm");
const chatForm = document.getElementById("chatForm");
const messages = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const onlineCount = document.getElementById("onlineCount");
const userList = document.getElementById("userList");
const logoutBtn = document.getElementById("logoutBtn");
const soundBtn = document.getElementById("soundBtn");
const ytPlayer = document.getElementById("ytplayer");

let currentUser = null;
let isMuted = true;

// Auto login nếu có localStorage
window.onload = () => {
  const savedUser = localStorage.getItem("chatUser");
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    socket.emit("register", currentUser);
    loginScreen.classList.add("hidden");
    chatScreen.classList.remove("hidden");
  }
};

// Đăng nhập
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const avatarFile = document.getElementById("avatar").files[0];
  let avatarUrl = "";

  if (avatarFile) {
    const formData = new FormData();
    formData.append("avatar", avatarFile);
    const res = await fetch("/upload", { method: "POST", body: formData });
    const data = await res.json();
    avatarUrl = data.filePath;
  }

  currentUser = { username, avatar: avatarUrl };
  localStorage.setItem("chatUser", JSON.stringify(currentUser));

  socket.emit("register", currentUser);
  loginScreen.classList.add("hidden");
  chatScreen.classList.remove("hidden");
});

// Chat
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (messageInput.value) {
    socket.emit("chatMessage", messageInput.value);
    messageInput.value = "";
  }
});

// Nhận tin nhắn
socket.on("chatMessage", ({ user, msg }) => {
  const div = document.createElement("div");
  div.innerHTML = `<img src="${user.avatar || '/uploads/default.png'}" width="30" style="border-radius:50%"> 
                   <b>${user.username}</b>: ${msg}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
});

// Danh sách online
socket.on("userList", (list) => {
  onlineCount.textContent = `${list.length} người online`;
  userList.innerHTML = list.map(u => 
    `<div><img src="${u.avatar || '/uploads/default.png'}" width="20" style="border-radius:50%"> ${u.username}</div>`
  ).join("");
});

// Đăng xuất
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("chatUser");
  window.location.reload();
});

// Bật/tắt tiếng
soundBtn.addEventListener("click", () => {
  let src = ytPlayer.src;
  if (isMuted) {
    ytPlayer.src = src.replace("mute=1", "mute=0");
    soundBtn.textContent = "🔈";
  } else {
    ytPlayer.src = src.replace("mute=0", "mute=1");
    soundBtn.textContent = "🔊";
  }
  isMuted = !isMuted;
});