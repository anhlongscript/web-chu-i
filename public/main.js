document.addEventListener("DOMContentLoaded", () => {
  // Lấy user hiện tại từ localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "login.html"; // chưa login thì quay lại login
    return;
  }

  // Hiển thị thông tin
  document.getElementById("displayName").innerText = currentUser.name;
  document.getElementById("displayGender").innerText = currentUser.gender;

  const streakStatus = document.getElementById("streakStatus");
  const btnCheckin = document.getElementById("btnCheckin");
  const btnInvite = document.getElementById("btnInvite");
  const friendsList = document.getElementById("friendsList");
  const notifications = document.getElementById("notifications");

  // Load dữ liệu user
  currentUser.streak = currentUser.streak || 0;
  currentUser.hasPartner = currentUser.hasPartner || false;
  currentUser.notifications = currentUser.notifications || [];
  currentUser.friends = currentUser.friends || [];

  // --- Đăng xuất ---
  document.getElementById("btnLogout").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });

  // --- Kiểm tra điều kiện check-in ---
  function updateUI() {
    streakStatus.innerText = `Chuỗi hiện tại: ${currentUser.streak} ngày`;
    btnCheckin.disabled = !currentUser.hasPartner;
    renderFriends();
    renderNotifications();
  }

  // --- Điểm danh ---
  btnCheckin.addEventListener("click", () => {
    currentUser.streak++;
    streakStatus.innerText = `Chuỗi hiện tại: ${currentUser.streak} ngày ✅`;
    saveUser();
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
        updateUI();
      }
    }
  });

  // --- Render danh sách bạn bè ---
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

    // Xử lý accept/decline
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

  // --- Lưu user ---
  function saveUser() {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }

  // Khởi tạo
  updateUI();
});
