// Xử lý form đăng ký
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const messageBox = document.getElementById("message");

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const avatar = document.getElementById("avatar").files[0];
    const password = document.getElementById("password").value;
    const gender = document.getElementById("gender").value;

    if (!avatar) {
      messageBox.innerText = "⚠️ Vui lòng chọn avatar!";
      messageBox.style.color = "red";
      return;
    }

    if (!password) {
      messageBox.innerText = "⚠️ Vui lòng nhập mật khẩu!";
      messageBox.style.color = "red";
      return;
    }

    if (!gender) {
      messageBox.innerText = "⚠️ Vui lòng chọn giới tính!";
      messageBox.style.color = "red";
      return;
    }

    messageBox.innerText = "✅ Đăng ký thành công!";
    messageBox.style.color = "green";

    // Sau này có thể lưu thông tin vào server hoặc localStorage
  });
});
