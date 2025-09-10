// ====== DỮ LIỆU ======
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

// ====== DOM ELEMENTS ======
const loginBox = document.getElementById("loginBox");
const registerBox = document.getElementById("registerBox");
const appArea = document.getElementById("appArea");

const btnLogin = document.getElementById("btnLogin");
const btnRegister = document.getElementById("btnRegister");
const btnLogout = document.getElementById("btnLogout");
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

const meName = document.getElementById("meName");
const meGender = document.getElementById("meGender");
const meAvatar = document.getElementById("meAvatar");

const regMsg = document.getElementById("regMsg");

// Leaderboard
const leaderboardBox = document.createElement("div");
leaderboardBox.className = "card";
leaderboardBox.innerHTML = `<h2>🏆 Bảng xếp hạng streak</h2><div id="leaderboardList"></div>`;
document.body.appendChild(leaderboardBox);

// ====== CHUYỂN GIAO DIỆN ======
showRegister.addEventListener("click", () => {
  loginBox.style.display = "none";
  registerBox.style.display = "block";
});

showLogin.addEventListener("click", () => {
  registerBox.style.display = "none";
  loginBox.style.display = "block";
});

// ====== ĐĂNG KÝ ======
btnRegister.addEventListener("click", () => {
  const name = document.getElementById("regName").value.trim();
  const pass = document.getElementById("regPass").value.trim();
  const gender = document.getElementById("regGender").value;
  const avatarFile = document.getElementById("regAvatar").files[0];

  if (!name || !pass) {
    regMsg.innerText = "⚠️ Vui lòng nhập đầy đủ!";
    regMsg.style.color = "red";
    return;
  }

  if (users.find(u => u.name === name)) {
    regMsg.innerText = "⚠️ Tên đã tồn tại!";
    regMsg.style.color = "red";
    return;
  }

  let avatar = "🙂";
  if (avatarFile) {
    avatar = URL.createObjectURL(avatarFile);
  }

  const newUser = { name, pass, gender, avatar, streak: 0 };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  regMsg.innerText = "✅ Đăng ký thành công! Hãy đăng nhập.";
  regMsg.style.color = "green";
});

// ====== ĐĂNG NHẬP ======
btnLogin.addEventListener("click", () => {
  const name = document.getElementById("loginName").value.trim();
  const pass = document.getElementById("loginPass").value.trim();

  const user = users.find(u => u.name === name && u.pass === pass);
  if (!user) {
    alert("❌ Sai tài khoản hoặc mật khẩu!");
    return;
  }

  // Cập nhật streak (demo: mỗi lần login streak +1)
  user.streak++;
  localStorage.setItem("users", JSON.stringify(users));

  currentUser = user;
  localStorage.setItem("currentUser", JSON.stringify(user));

  showApp();
  renderLeaderboard();
});

// ====== ĐĂNG XUẤT ======
btnLogout.addEventListener("click", () => {
  currentUser = null;
  localStorage.removeItem("currentUser");

  appArea.style.display = "none";
  loginBox.style.display = "block";
});

// ====== HIỂN THỊ APP SAU LOGIN ======
function showApp() {
  loginBox.style.display = "none";
  registerBox.style.display = "none";
  appArea.style.display = "block";

  meName.innerText = currentUser.name;
  meGender.innerText = currentUser.gender === "male" ? "Nam" : "Nữ";
  if (currentUser.avatar.startsWith("blob:") || currentUser.avatar.startsWith("data:")) {
    meAvatar.innerHTML = `<img src="${currentUser.avatar}" class="avatarBigImg"/>`;
  } else {
    meAvatar.innerText = currentUser.avatar; // icon mặc định
  }
}

// ====== HIỂN THỊ LEADERBOARD ======
function renderLeaderboard() {
  const listBox = document.getElementById("leaderboardList");
  if (!listBox) return;

  const sorted = [...users].sort((a, b) => b.streak - a.streak);
  listBox.innerHTML = sorted
    .map((u, i) => `
      <div class="row">
        <span>${i + 1}. ${u.name}</span>
        <span>🔥 ${u.streak} ngày</span>
      </div>
    `)
    .join("");
}

// ====== AUTO LOAD ======
document.addEventListener("DOMContentLoaded", () => {
  if (currentUser) {
    showApp();
  }
  renderLeaderboard();
});
