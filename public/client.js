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

let currentUser = null;
let ytPlayer = document.getElementById("ytplayer");

// đăng nhập
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
  socket.emit("register", currentUser);

  loginScreen.classList.add("hidden");
  chatScreen.classList.remove("hidden");
});

// chat
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (messageInput.value) {
    socket.emit("chatMessage", messageInput.value);
    messageInput.value = "";
  }
});

// nhận tin nhắn
socket.on("chatMessage", ({ user, msg }) => {
  const div = document.createElement("div");
  div.innerHTML = `<img src="${user.avatar || '/uploads/default.png'}" width="30" style="border-radius:50%"> 
                   <b>${user.username}</b>: ${msg}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
});

// danh sách người dùng
socket.on("userList", (list) => {
  onlineCount.textContent = `${list.length} người online`;
  userList.innerHTML = list.map(u => 
    `<div><img src="${u.avatar || '/uploads/default.png'}" width="20" style="border-radius:50%"> ${u.username}</div>`
  ).join("");
});

// đăng xuất
logoutBtn.addEventListener("click", () => {
  window.location.reload();
});

// bật/tắt tiếng video
let isMuted = true;
soundBtn.addEventListener("click", () => {
  const src = ytPlayer.src;
  if (isMuted) {
    ytPlayer.src = src.replace("mute=1", "mute=0");
    isMuted = false;
    soundBtn.textContent = "🔈";
  } else {
    ytPlayer.src = src.replace("mute=0", "mute=1");
    isMuted = true;
    soundBtn.textContent = "🔊";
  }
});