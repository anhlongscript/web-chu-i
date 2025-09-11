const socket = io();

// Khi login
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  if (!username) return;

  // Ẩn login, hiện chat
  document.querySelector('.login-container').style.display = 'none';
  document.querySelector('.chat-container').style.display = 'flex';

  // Gửi user lên server
  socket.emit('join', { username });
});

// Gửi tin nhắn
document.getElementById('messageForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const msg = document.getElementById('messageInput').value.trim();
  if (!msg) return;
  socket.emit('chatMessage', msg);
  document.getElementById('messageInput').value = '';
});

// Nhận tin nhắn
socket.on('chatMessage', (data) => {
  const div = document.createElement('div');
  div.textContent = `${data.username}: ${data.message}`;
  document.getElementById('messages').appendChild(div);
});

// Cập nhật danh sách user
socket.on('userList', (users) => {
  const ul = document.getElementById('users');
  ul.innerHTML = '';
  users.forEach(u => {
    const li = document.createElement('li');
    li.textContent = u;
    ul.appendChild(li);
  });
});

// Đăng xuất
document.getElementById('logoutBtn').addEventListener('click', () => {
  socket.emit('logout');
  location.reload();
});
