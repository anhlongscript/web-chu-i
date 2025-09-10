document.addEventListener("DOMContentLoaded", () => {
  const btnLogin = document.getElementById("btnLogin");

  btnLogin.addEventListener("click", () => {
    const name = document.getElementById("name").value.trim();
    const gender = document.getElementById("gender").value;

    if (!name) {
      alert("Nhập tên trước đã!");
      return;
    }

    const user = {
      name,
      gender,
      streak: 0,
      hasPartner: false,
      notifications: [],
      friends: ["An", "Bình", "Chi", "Dũng", "Hà"],
    };

    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "index.html"; // sau login chuyển sang web chính
  });
});
