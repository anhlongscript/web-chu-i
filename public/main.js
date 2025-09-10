// kiểm tra user
const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  window.location.href = "login.html"; // chưa login thì quay lại login
}

// hiển thị user info (chỉ để debug, bạn có thể làm popup "Tôi")
console.log("Xin chào:", user.name, "-", user.gender);

// quản lý streak
let streak = parseInt(localStorage.getItem("streak") || "0");
const streakStatus = document.getElementById("streakStatus");
const btnCheckin = document.getElementById("btnCheckin");

function updateStreak() {
  streakStatus.textContent = `Chuỗi hiện tại: ${streak} ngày`;
}

btnCheckin.addEventListener("click", () => {
  streak++;
  localStorage.setItem("streak", streak);
  updateStreak();
});

updateStreak();

// quản lý bạn bè (fake list)
const friends = ["An", "Bình", "Chi", "Dũng", "Hà"];
const friendsList = document.getElementById("friendsList");
friends.forEach(f => {
  const li = document.createElement("li");
  li.textContent = f;
  friendsList.appendChild(li);
});

// logout
document.getElementById("btnProfile").addEventListener("click", () => {
  if (confirm("Bạn có chắc muốn đăng xuất?")) {
    localStorage.removeItem("user");
    window.location.href = "login.html";
  }
});
