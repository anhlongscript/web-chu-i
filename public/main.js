document.addEventListener("DOMContentLoaded", () => {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  let allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

  // Cập nhật currentUser từ allUsers (để dữ liệu mới nhất)
  const idx = allUsers.findIndex(u => u.name === currentUser.name);
  if (idx !== -1) currentUser = allUsers[idx];

  // Ghi lại user vào storage
  function saveUser() {
    allUsers[idx] = currentUser;
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }

  // Tabs
  document.querySelectorAll(".tabs button").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tabs button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      document.querySelectorAll(".tab-content").forEach(tab => tab.classList.add("hidden"));
      document.getElementById("tab-" + btn.dataset.tab).classList.remove("hidden");
    });
  });

  // --- Chuỗi ---
  const streakStatus = document.getElementById("streakStatus");
  const btnCheckin = document.getElementById("btnCheckin");
  btnCheckin.addEventListener("click", () => {
    if (currentUser.friends.length === 0) {
      alert("Bạn cần có ít nhất 1 bạn bè để điểm danh!");
      return;
    }
    currentUser.streak++;
    streakStatus.innerText = `Chuỗi hiện tại: ${currentUser.streak} ngày 🔥`;
    saveUser();
    renderRanking();
  });

  // --- Khám phá ---
  function renderDiscover() {
    const list = document.getElementById("discoverList");
    list.innerHTML = "";
    const others = allUsers.filter(u =>
      u.name !== currentUser.name &&
      !currentUser.friends.includes(u.name)
    );
    if (others.length === 0) {
      list.innerHTML = "<li>Không có gợi ý, hãy rủ bạn bè tham gia!</li>";
      return;
    }
    others.forEach(u => {
      const li = document.createElement("li");
      li.innerHTML = `${u.name} (${u.gender}) 
        <button data-add="${u.name}">Kết bạn</button>`;
      list.appendChild(li);
    });
    list.querySelectorAll("[data-add]").forEach(btn => {
      btn.addEventListener("click", () => {
        currentUser.friends.push(btn.dataset.add);
        saveUser();
        renderFriends();
        renderDiscover();
        alert(`Đã kết bạn với ${btn.dataset.add}`);
      });
    });
  }

  // --- Bảng xếp hạng ---
  function renderRanking() {
    const list = document.getElementById("rankingList");
    list.innerHTML = "";
    const sorted = [...allUsers].sort((a, b) => b.streak - a.streak);
    sorted.forEach((u, i) => {
      const li = document.createElement("li");
      li.innerText = `${i + 1}. ${u.name} — ${u.streak} ngày`;
      list.appendChild(li);
    });
  }

  // --- Tôi ---
  document.getElementById("displayName").innerText = currentUser.name;
  document.getElementById("displayGender").innerText = currentUser.gender;
  document.getElementById("btnLogout").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });

  function renderFriends() {
    const list = document.getElementById("friendsList");
    list.innerHTML = "";
    if (currentUser.friends.length === 0) {
      list.innerHTML = "<li>Bạn chưa có bạn nào</li>";
      return;
    }
    currentUser.friends.forEach(f => {
      const li = document.createElement("li");
      li.innerText = f;
      list.appendChild(li);
    });
  }

  function renderNotifications() {
    const list = document.getElementById("notifications");
    list.innerHTML = "<li>Chưa có thông báo</li>";
  }

  // Khởi tạo UI
  streakStatus.innerText = `Chuỗi hiện tại: ${currentUser.streak} ngày`;
  renderFriends();
  renderDiscover();
  renderRanking();
  renderNotifications();
});
