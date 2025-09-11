const socket = io();
let nickname = "";
let avatar = "";
let password = "";

// Convert ảnh thành base64
function getBase64(file, callback) {
  const reader = new FileReader();
  reader.onload = () => callback(reader.result);
  reader.readAsDataURL(file);
}

// Fake Database trong localStorage
let usersDB = JSON.parse(localStorage.getItem("usersDB") || "{}");

function register() {
  const nick = document.getElementById("regNick").value.trim();
  const pass = document.getElementById("regPass").value.trim();
  const file = document.getElementById("regAvatar").files[0];

  if (!nick || !pass) return alert("Vui lòng nhập đầy đủ thông tin!");

  if (usersDB[nick]) return alert("Nickname đã tồn tại!");

  if (file) {
    getBase64(file, (data) => {
      usersDB[nick] = { password: pass, avatar: data };
      localStorage.setItem("usersDB", JSON.stringify(usersDB));
      alert("Đăng ký thành công! Hãy đăng nhập.");
      switchToLogin();
    });
  } else {
    const defaultAvatar = "https://i.pravatar.cc/150?u=" + nick;
    usersDB[nick] = { password: pass, avatar: defaultAvatar };
    localStorage.setItem("usersDB", JSON.stringify(usersDB));
    alert("Đăng ký thành công! Hãy đăng nhập.");
    switchToLogin();
  }
}

function login() {
  const nick = document.getElementById("loginNick").value.trim();
  const pass = document.getElementById("loginPass").value.trim();

  if (!usersDB[nick]) return alert("Tài khoản không tồn tại!");
  if (usersDB[nick].password !== pass) return alert("Sai mật khẩu!");

  nickname = nick;
  avatar = usersDB[nick].avatar;

  document.getElementById("auth").style.display = "none";
  document.getElementById("chat").style.display = "flex";

  socket.emit("join", { nickname, avatar });
}

function switchToLogin() {
  document.getElementById("registerBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
}

function switchToRegister() {
  document.getElementById("registerBox").style.display = "block";
  document.getElementById("loginBox").style.display = "none";
}

function sendMessage() {
  const input = document.getElementById("msgInput");
  const msg = input.value.trim();
  if (msg) {
    socket.emit("chatMessage", msg);
    input.value = "";
  }
}

// Nhận tin nhắn
socket.on("chatMessage", (data) => {
  const messages = document.getElementById("messages");
  const div = document.createElement("div");
  div.className = "message";
  div.innerHTML = `
    <img src="${data.avatar}" class="avatar">
    <div>
      <b>${data.nickname}</b><br>
      <span>${data.text}</span>
    </div>`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
});

// Cập nhật user online
socket.on("updateUsers", (users) => {
  const userList = document.getElementById("userList");
  const count = document.getElementById("count");
  userList.innerHTML = "";
  count.innerText = Object.keys(users).length;
  for (let id in users) {
    const li = document.createElement("li");
    li.innerHTML = `<img src="${users[id].avatar}" class="avatar"> ${users[id].nickname}`;
    userList.appendChild(li);
  }
});