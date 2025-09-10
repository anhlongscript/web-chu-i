document.addEventListener("DOMContentLoaded", () => {
  const displayName = document.getElementById("displayName");
  const displayGender = document.getElementById("displayGender");
  const btnLogout = document.getElementById("btnLogout");

  const btnCheckin = document.getElementById("btnCheckin");
  const streakStatus = document.getElementById("streakStatus");

  const btnAddFriend = document.getElementById("btnAddFriend");
  const friendsList = document.getElementById("friendsList");
  const notifications = document.getElementById("notifications");

  // ===== USER =====
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  displayName.innerText = currentUser;
  displayGender.innerText = "Chưa rõ 😅";

  btnLogout.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });

  // ===== STREAK =====
  let streak = parseInt(localStorage.getItem("streak") || "0");
  function updateStreak() {
    streakStatus.innerText = `🔥 Chuỗi hiện tại: ${streak} ngày`;
  }

  // ===== FRIENDS =====
  let friends = JSON.parse(localStorage.getItem("friends") || "[]");

  function renderFriends() {
    friendsList.innerHTML = "";
    friends.forEach(f => {
      const li = document.createElement("li");
      li.innerText = f;
      friendsList.appendChild(li);
    });

    if (friends.length > 0) {
      btnCheckin.disabled = false;
      updateStreak();
    } else {
      btnCheckin.disabled = true;
      streakStatus.innerText = "🔒 Bạn cần có ít nhất 1 người bạn để mở khóa điểm danh";
    }
  }

  // ===== NOTIFICATIONS =====
  let notis = JSON.parse(localStorage.getItem("notis") || "[]");

  function renderNotis() {
    notifications.innerHTML = "";
    notis.forEach((n, idx) => {
      const li = document.createElement("li");
      li.innerHTML = `${n.msg} 
        <button data-idx="${idx}" class="accept">Đồng ý</button>
        <button data-idx="${idx}" class="decline">Không</button>`;
      notifications.appendChild(li);
    });
  }

  // ===== ADD FRIEND =====
  btnAddFriend.addEventListener("click", () => {
    const friendName = prompt("Nhập tên bạn muốn mời:");
    if (friendName) {
      notis.push({ msg: `${friendName} đã mời bạn kết bạn 👋` });
      localStorage.setItem("notis", JSON.stringify(notis));
      renderNotis();
    }
  });

  // ===== HANDLE NOTIS =====
  notifications.addEventListener("click", (e) => {
    if (e.target.classList.contains("accept")) {
      const idx = e.target.dataset.idx;
      const n = notis[idx];

      // Giả sử lấy tên từ lời mời
      const name = n.msg.split(" ")[0];
      friends.push(name);
      localStorage.setItem("friends", JSON.stringify(friends));

      notis.splice(idx, 1);
      localStorage.setItem("notis", JSON.stringify(notis));

      renderFriends();
      renderNotis();
    }

    if (e.target.classList.contains("decline")) {
      const idx = e.target.dataset.idx;
      notis.splice(idx, 1);
      localStorage.setItem("notis", JSON.stringify(notis));
      renderNotis();
    }
  });

  // ===== CHECKIN =====
  btnCheckin.addEventListener("click", () => {
    streak++;
    localStorage.setItem("streak", streak);
    updateStreak();
  });

  // Init render
  renderFriends();
  renderNotis();
});
