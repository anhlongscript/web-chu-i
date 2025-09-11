const socket = io();

const loginScreen = document.getElementById("login-screen");
const chatScreen = document.getElementById("chat-screen");
const usernameInput = document.getElementById("username");
const avatarInput = document.getElementById("avatar");
const joinBtn = document.getElementById("join-btn");
const logoutBtn = document.getElementById("logout-btn");
const usersList = document.getElementById("users");
const messages = document.getElementById("messages");
const chatForm = document.getElementById("chat-form");
const msgInput = document.getElementById("msg");

let currentUser = null;

joinBtn.addEventListener("click", () => {
  const name = usernameInput.value.trim();
  const avatar = avatarInput.files[0]
    ? URL.createObjectURL(avatarInput.files[0])
    : "https://via.placeholder.com/50";

  if (!name) {
    alert("Hãy nhập tên!");
    return;
  }

  currentUser = { name, avatar };
  socket.emit("login", currentUser);

  loginScreen.classList.add("hidden");
  chatScreen.classList.remove("hidden");
});

logoutBtn.addEventListener("click", () => {
  window.location.reload();
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (msgInput.value) {
    socket.emit("chatMessage", msgInput.value);
    msgInput.value = "";
  }
});

socket.on("userList", (users) => {
  usersList.innerHTML = "";
  users.forEach((u) => {
    const li = document.createElement("li");
    li.innerHTML = `<img src="${u.avatar}"/> ${u.name}`;
    usersList.appendChild(li);
  });
});

socket.on("chatMessage", (data) => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<img src="${data.user.avatar}"/> <b>${data.user.name}:</b> ${data.text}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
});
