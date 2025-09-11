const socket = io();

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const chat = document.getElementById("chat");
const msgInput = document.getElementById("msgInput");
const messages = document.getElementById("messages");

let currentUser = null;

// Đăng ký
registerForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(registerForm);

  const res = await fetch("/register", {
    method: "POST",
    body: formData
  });

  if (res.ok) {
    alert("Đăng ký thành công, hãy đăng nhập!");
    registerForm.style.display = "none";
    loginForm.style.display = "block";
  } else {
    const data = await res.json();
    alert(data.message);
  }
});

// Đăng nhập
loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (data.success) {
    currentUser = { username, avatar: data.avatarUrl };
    document.getElementById("auth").style.display = "none";
    chat.style.display = "flex";
  } else {
    alert(data.message);
  }
});

// Gửi tin nhắn
document.getElementById("sendBtn").addEventListener("click", () => {
  if (!msgInput.value.trim()) return;

  const msg = {
    user: currentUser.username,
    avatar: currentUser.avatar,
    text: msgInput.value
  };

  socket.emit("chat message", msg);
  msgInput.value = "";
});

// Nhận tin nhắn
socket.on("chat message", (msg) => {
  const item = document.createElement("div");
  item.classList.add("message");
  item.innerHTML = `
    <img src="${msg.avatar}" class="avatar">
    <div>
      <b>${msg.user}</b><br>
      <span>${msg.text}</span>
    </div>
  `;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});

// Chuyển form
document.getElementById("showLogin").addEventListener("click", (e) => {
  e.preventDefault();
  registerForm.style.display = "none";
  loginForm.style.display = "block";
});

document.getElementById("showRegister").addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.style.display = "none";
  registerForm.style.display = "block";
});