document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const btnCheckin = document.getElementById("btnCheckin");
  const btnLogout = document.getElementById("btnLogout");
  const streakStatus = document.getElementById("streakStatus");
  const friendsList = document.getElementById("friendsList");
  const notifications = document.getElementById("notifications");

  // Cập nhật trạng thái chuỗi
  streakStatus.textContent = `Chuỗi hiện tại: ${user.streak || 0} ngày`;

  // Nút điểm danh
  btnCheckin.addEventListener("click", () => {
    user.streak = (user.streak || 0) + 1;
    localStorage.setItem("user", JSON.stringify(user));
    streakStatus.textContent = `Chuỗi hiện tại: ${user.streak} ngày ✅`;
  });

  // Nút đăng xuất
  btnLogout.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "login.html";
  });

  // Fake danh sách bạn bè
  const friends = ["An", "Bình", "Chi", "Dũng", "Hà"];
  friends.forEach(f => {
    const li = document.createElement("li");
    li.textContent = f;
    friendsList.appendChild(li);
  });

  // Fake thông báo
  const li = document.createElement("li");
  li.textContent = "Không có thông báo";
  notifications.appendChild(li);
});
