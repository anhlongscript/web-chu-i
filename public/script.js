document.addEventListener("DOMContentLoaded", () => {
  const btnLogin = document.getElementById("btnLogin");
  const loginName = document.getElementById("loginName");
  const loginPass = document.getElementById("loginPass");
  const regBox = document.getElementById("registerBox");
  const loginBox = document.getElementById("loginBox");

  // Xử lý nút Đăng nhập
  btnLogin.addEventListener("click", () => {
    const name = loginName.value.trim();
    const pass = loginPass.value.trim();

    if (!name || !pass) {
      alert("⚠️ Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    // ✅ Tạm coi là login thành công
    // Sau này bạn có thể thay bằng kiểm tra từ localStorage hoặc server
    localStorage.setItem("currentUser", name);

    // 👉 Chuyển hướng sang giao diện chính (index.html trong public)
    window.location.href = "index.html";
  });
});
