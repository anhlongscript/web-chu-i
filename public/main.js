document.addEventListener("DOMContentLoaded", () => {
  const displayName = document.getElementById("displayName");
  const displayGender = document.getElementById("displayGender");
  const btnLogout = document.getElementById("btnLogout");
  const btnCheckin = document.getElementById("btnCheckin");
  const streakStatus = document.getElementById("streakStatus");

  // 🔹 Lấy user đang login từ localStorage
  const currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    // Nếu chưa login thì quay lại trang login
    window.location.href = "login.html";
    return;
  }

  // Tạm gán dữ liệu (sau này sẽ lấy từ đăng ký)
  displayName.innerText = currentUser;
  displayGender.innerText = "Chưa rõ 😅";

  // Xử lý logout
  btnLogout.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });

  // Xử lý điểm danh
  let streak = parseInt(localStorage.getItem("streak") || "0");

  function updateStreak() {
    streakStatus.innerText = `🔥 Chuỗi hiện tại: ${streak} ngày`;
  }

  updateStreak();

  btnCheckin.addEventListener("click", () => {
    streak++;
    localStorage.setItem("streak", streak);
    updateStreak();
  });
});
