// script.js

document.addEventListener("DOMContentLoaded", () => {
  const loginBox = document.getElementById("loginBox");
  const registerBox = document.getElementById("registerBox");
  const appArea = document.getElementById("appArea");

  const btnLogin = document.getElementById("btnLogin");
  const btnRegister = document.getElementById("btnRegister");
  const showRegister = document.getElementById("showRegister");
  const showLogin = document.getElementById("showLogin");
  const btnLogout = document.getElementById("btnLogout");

  // Hiện form đăng ký
  showRegister.addEventListener("click", () => {
    loginBox.style.display = "none";
    registerBox.style.display = "block";
  });

  // Quay lại đăng nhập
  showLogin.addEventListener("click", () => {
    registerBox.style.display = "none";
    loginBox.style.display = "block";
  });

  // Đăng ký
  btnRegister.addEventListener("click", () => {
    const name = document.getElementById("regName").value;
    const pass = document.getElementById("regPass").value;
    const gender = document.getElementById("regGender").value;

    if (!name || !pass) {
      document.getElementById("regMsg").innerText = "⚠️ Vui lòng nhập đủ thông tin";
      return;
    }

    // Lưu tạm vào localStorage
    localStorage.setItem("user", JSON.stringify({ name, pass, gender }));

    alert("✅ Đăng ký thành công, hãy đăng nhập!");
    registerBox.style.display = "none";
    loginBox.style.display = "block";
  });

  // Đăng nhập
  btnLogin.addEventListener("click", () => {
    const name = document.getElementById("loginName").value;
    const pass = document.getElementById("loginPass").value;

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (name === user.name && pass === user.pass) {
      loginBox.style.display = "none";
      appArea.style.display = "block";
      document.getElementById("meName").innerText = user.name;
      document.getElementById("meGender").innerText = user.gender === "male" ? "Nam" : "Nữ";
    } else {
      alert("❌ Sai tên đăng nhập hoặc mật khẩu");
    }
  });

  // Đăng xuất
  btnLogout.addEventListener("click", () => {
    appArea.style.display = "none";
    loginBox.style.display = "block";
  });
});
