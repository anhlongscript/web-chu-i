// Lấy các phần tử HTML
const btn = document.getElementById("checkin-btn");
const status = document.getElementById("streak-status");

// Biến lưu số ngày streak
let streak = 0;

// Sự kiện khi nhấn nút điểm danh
btn.addEventListener("click", () => {
  streak++;
  status.innerText = `🔥 Bạn đã điểm danh được ${streak} ngày`;
});
