document.getElementById("btnLogin").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const gender = document.getElementById("gender").value;

  if (!username) {
    alert("Vui lòng nhập tên!");
    return;
  }

  localStorage.setItem("user", JSON.stringify({ username, gender, streak: 0 }));
  window.location.href = "index.html";
});
