document.addEventListener("DOMContentLoaded", () => {
  // Load user hiện tại
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "login.html"; 
    return;
  }

  // Gán mặc định
  currentUser.streak = currentUser.streak || 0;
  currentUser.hasPartner = currentUser.hasPartner || false;
  currentUser.notifications = currentUser.notifications || [];
  currentUser.friends = currentUser.friends || [];

  // Hiển thị thông tin user
  document.getElementById("displayName").innerText = currentUser.name;
  document.getElementById("displayGender").innerText = currentUser.gender;

  const streakStatus = document.getElementById("streakStatus");
  const btnCheckin = document.getElementById("btnCheckin");
  const btnInvite = document.getElementById("btnInvite");
  const friendsList = document.getElementById("friendsList");
  const notifications = document.getElementById("notifications");
  const recommendList = document.getElementById("recommendList");
  const leaderboardList = document.getElementById("leaderboardList");

  // --- Logout ---
  document.getElementById("btnLogout").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });

  // --- Checkin ---
  btnCheckin.addEventListener("click", () => {
    currentUser.streak++;
    streakStatus.innerText = `Chuỗi hiện tại: ${currentUser.streak} ngày ✅`;
    saveUser();
    updateLeaderboard();
  });

  // --- Mời bạn bè ---
  btnInvite.addEventListener("click", () => {
    if (currentUser.friends.length === 0) {
      alert("Bạn chưa có bạn nào để mời!");
      return;
    }
    let msg = "Chọn bạn để mời:\n";
    currentUser.friends.forEach((f, i) => {
      msg += `${i + 1}. ${f}\n`;
    });
    const choice = prompt(msg);
    if (choice) {
      const index = parseInt(choice) - 1;
      if (index >= 0 && index < currentUser.friends.length) {
        const friendName = currentUser.friends[index];
        currentUser.notifications.push({
          type: "invite",
          from: currentUser.name,
          to: friendName,
        });
        alert(`Đã gửi lời mời tới ${friendName}`);
        saveUser();
        renderNotifications();
      }
    }
  });

  // --- Render bạn bè ---
  function renderFriends() {
    friendsList.innerHTML = "";
    if (currentUser.friends.length === 0) {
      friendsList.innerHTML = "<li>Bạn chưa có bạn nào</li>";
      return;
    }
    currentUser.friends.forEach((f) => {
      const li = document.createElement("li");
      li.innerText = f;
      friendsList.appendChild(li);
    });
  }

  // --- Render thông báo ---
  function renderNotifications() {
    notifications.innerHTML = "";
    if (currentUser.notifications.length === 0) {
      notifications.innerHTML = "<li>Không có thông báo</li>";
      return;
    }
    currentUser.notifications.forEach((n, i) => {
      const li = document.createElement("li");
      if (n.type === "invite") {
        li.innerHTML = `<strong>${n.from}</strong> mời bạn giữ chuỗi 🎉 
          <button data-accept="${i}">Đồng ý</button>
          <button data-decline="${i}">Không</button>`;
      }
      notifications.appendChild(li);
    });

    // Accept / Decline
    notifications.querySelectorAll("[data-accept]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = parseInt(btn.dataset.accept);
        currentUser.hasPartner = true;
        currentUser.notifications.splice(index, 1);
        saveUser();
        updateUI();
      });
    });
    notifications.querySelectorAll("[data-decline]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = parseInt(btn.dataset.decline);
        currentUser.notifications.splice(index, 1);
        saveUser();
        updateUI();
      });
    });
  }

  // --- Render khuyến nghị bạn bè ---
  function renderRecommendations() {
    recommendList.innerHTML = "";
    const sample = ["An", "Bình", "Chi", "Dũng", "Hà"];
    sample.forEach((name) => {
      if (!currentUser.friends.includes(name) && currentUser.name !== name) {
        const li = document.createElement("li");
        li.innerHTML = `${name} <button data-add="${name}">Kết bạn</button>`;
        recommendList.appendChild(li);
      }
    });

    recommendList.querySelectorAll("[data-add]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const friendName = btn.dataset.add;
        currentUser.friends.push(friendName);
        saveUser();
        renderFriends();
        renderRecommendations();
      });
    });
  }

  // --- Render bảng xếp hạng ---
  function updateLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const existing = leaderboard.find((u) => u.name === currentUser.name);
    if (existing) {
      existing.streak = currentUser.streak;
    } else {
      leaderboard.push({ name: currentUser.name, streak: currentUser.streak });
    }
    leaderboard.sort((a, b) => b.streak - a.streak);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    renderLeaderboard();
  }

  function renderLeaderboard() {
    leaderboardList.innerHTML = "";
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.forEach((u) => {
      const li = document.createElement("li");
      li.innerText = `${u.name} — ${u.streak} ngày 🔥`;
      leaderboardList.appendChild(li);
    });
  }

  // --- UI update ---
  function updateUI() {
    streakStatus.innerText = `Chuỗi hiện tại: ${currentUser.streak} ngày`;
    btnCheckin.disabled = !currentUser.hasPartner;
    renderFriends();
    renderNotifications();
    renderRecommendations();
    renderLeaderboard();
  }

  function saveUser() {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }

  // --- Chuyển tab ---
  const tabs = document.querySelectorAll(".tab");
  const menuBtns = document.querySelectorAll(".menu button");
  menuBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabName = btn.dataset.tab;
      tabs.forEach((t) => t.classList.remove("active"));
      document.getElementById(`tab-${tabName}`).classList.add("active");
    });
  });

  // Init
  updateUI();
});
