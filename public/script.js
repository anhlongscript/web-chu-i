document.addEventListener("DOMContentLoaded", () => {
  const loginBox = document.getElementById("loginBox");
  const registerBox = document.getElementById("registerBox");

  const btnLogin = document.getElementById("btnLogin");
  const btnRegister = document.getElementById("btnRegister");
  const btnShowRegister = document.getElementById("showRegister");
  const btnShowLogin = document.getElementById("showLogin");

  const regMsg = document.getElementById("regMsg");

  // --- Chuyển giữa login <-> register ---
  btnShowRegister.addEventListener("click", () => {
    loginBox.style.display = "none";
    registerBox.style.display = "block";
  });
  btnShowLogin.addEventListener("click", () => {
    registerBox.style.display = "none";
    loginBox.style.display = "block";
  });

  // --- Đăng ký ---
  btnRegister.addEventListener("click", () => {
    const name = document.getElementById("regName").value.trim();
    const pass = document.getElementById("regPass").value.trim();
    const gender = document.getElementById("regGender").value;
    const avatarInput = document.getElementById("regAvatar");

    if (!name || !pass) {
      regMsg.innerText = "⚠️ Vui lòng nhập đầy đủ tên và mật khẩu!";
      regMsg.style.color = "red";
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.name === name)) {
      regMsg.innerText = "⚠️ Tên đã tồn tại, hãy chọn tên khác!";
      regMsg.style.color = "red";
      return;
    }

    let avatar = "🙂";
    if (avatarInput.files.length > 0) {
      avatar = avatarInput.files[0].name; // chỉ lưu tên file demo
    }

    const newUser = {
      name,
      pass,
      gender,
      avatar,
      streak: 0,
      friends: [],
      notifications: [],
      hasPartner: false,
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    regMsg.innerText = "✅ Đăng ký thành công! Hãy đăng nhập.";
    regMsg.style.color = "green";

    setTimeout(() => {
      registerBox.style.display = "none";
      loginBox.style.display = "block";
    }, 1000);
  });

  // --- Đăng nhập ---
  btnLogin.addEventListener("click", () => {
    const name = document.getElementById("loginName").value.trim();
    const pass = document.getElementById("loginPass").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find((u) => u.name === name && u.pass === pass);

    if (!found) {
      alert("Sai tên đăng nhập hoặc mật khẩu!");
      return;
    }

    // Lưu currentUser
    localStorage.setItem("currentUser", JSON.stringify(found));

    // Chuyển sang web chính
    window.location.href = "index.html";
  });
});
