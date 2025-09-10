document.addEventListener("DOMContentLoaded", () => {
  // Các phần tử chính
  const loginBox = document.getElementById("loginBox");
  const registerBox = document.getElementById("registerBox");
  const appArea = document.getElementById("appArea");
  const authCard = document.getElementById("authCard");

  // Nút
  const btnLogin = document.getElementById("btnLogin");
  const btnRegister = document.getElementById("btnRegister");
  const btnLogout = document.getElementById("btnLogout");
  const showRegister = document.getElementById("showRegister");
  const showLogin = document.getElementById("showLogin");

  // Input
  const loginName = document.getElementById("loginName");
  const loginPass = document.getElementById("loginPass");
  const regName = document.getElementById("regName");
  const regPass = document.getElementById("regPass");
  const regGender = document.getElementById("regGender");
  const regAvatar = document.getElementById("regAvatar");
  const avatarPreview = document.getElementById("avatarPreview");

  // Chỗ hiển thị trong app
  const meName = document.getElementById("meName");
  const meGender = document.getElementById("meGender");
  const meAvatar = document.getElementById("meAvatar");
  const regMsg = document.getElementById("regMsg");

  // Biến tạm để lưu user
  let currentUser = null;

  // 👉 Chuyển qua form đăng ký
  showRegister.addEventListener("click", () => {
    loginBox.style.display = "none";
    registerBox.style.display = "block";
  });

  // 👉 Quay lại form login
  showLogin.addEventListener("click", () => {
    registerBox.style.display = "none";
    loginBox.style.display = "block";
  });

  // 👉 Xem trước avatar khi chọn ảnh
  regAvatar.addEventListener("change", () => {
    const file = regAvatar.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        avatarPreview.innerHTML = `<img src="${e.target.result}" class="avatarBig" />`;
      };
      reader.readAsDataURL(file);
    }
  });

  // 👉 Đăng ký
  btnRegister.addEventListener("click", () => {
    if (!regName.value || !regPass.value) {
      regMsg.innerText = "⚠️ Vui lòng nhập đầy đủ thông tin!";
      regMsg.style.color = "red";
      return;
    }

    // Tạo user mới
    currentUser = {
      name: regName.value,
      pass: regPass.value,
      gender: regGender.value,
      avatar: regAvatar.files[0] ? URL.createObjectURL(regAvatar.files[0]) : null
    };

    regMsg.innerText = "✅ Đăng ký thành công!";
    regMsg.style.color = "green";

    // Tự động chuyển về login
    setTimeout(() => {
      registerBox.style.display = "none";
      loginBox.style.display = "block";
    }, 1000);
  });

  // 👉 Đăng nhập
  btnLogin.addEventListener("click", () => {
    if (!currentUser) {
      alert("⚠️ Chưa có tài khoản, hãy đăng ký trước!");
      return;
    }
    if (loginName.value === currentUser.name && loginPass.value === currentUser.pass) {
      // Hiển thị app
      authCard.style.display = "none";
      appArea.style.display = "block";

      meName.innerText = currentUser.name;
      meGender.innerText = currentUser.gender === "male" ? "Nam" : "Nữ";
      meAvatar.innerHTML = currentUser.avatar
        ? `<img src="${currentUser.avatar}" class="avatarBig" />`
        : "🙂";
    } else {
      alert("❌ Sai tên hoặc mật khẩu!");
    }
  });

  // 👉 Đăng xuất
  btnLogout.addEventListener("click", () => {
    appArea.style.display = "none";
    authCard.style.display = "block";
    loginName.value = "";
    loginPass.value = "";
  });
});
