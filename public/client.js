const socket = io();

const loginPage = document.getElementById("loginPage");
const chatPage = document.getElementById("chatPage");
const usernameInput = document.getElementById("username");
const rememberMe = document.getElementById("rememberMe");
const loginBtn = document.getElementById("loginBtn");

const logoutBtn = document.getElementById("logoutBtn");
const usersList = document.getElementById("users");

const messages = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// Giữ đăng nhập nếu có
window.onload = () => {
  const savedName = localStorage.getItem("chatUsername");
  if (savedName) {
    usernameInput.value = savedName;
    login(savedName);
  }
};

function login(name) {
  socket.emit("login", { name });
  loginPage.classList.add("hidden");
  chatPage.classList.remove("hidden");
  if (rememberMe.checked) {
    localStorage.setItem("chatUsername", name);
  }
}

loginBtn.onclick = () => {
  const name = usernameInput.value.trim();
  if (name) login(name);
};

logoutBtn.onclick = () => {
  socket.emit("logout");
  localStorage.removeItem("chatUsername");
  chatPage.classList.add("hidden");
  loginPage.classList.remove("hidden");
};

// Cập nhật danh sách user
socket.on("updateUsers", (users) => {
  usersList.innerHTML = "";
  users.forEach((u) => {
    const li = document.createElement("li");
    li.textContent = u.name;
    usersList.appendChild(li);
  });
});

// Nhận tin nhắn
socket.on("chatMessage", ({ name, msg }) => {
  const div = document.createElement("div");
  div.textContent = `${name}: ${msg}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
});

// Gửi tin nhắn
sendBtn.onclick = () => {
  const msg = messageInput.value.trim();
  if (msg) {
    socket.emit("chatMessage", msg);
    messageInput.value = "";
  }
};
