const socket = io();

// gửi tin nhắn
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const usersList = document.getElementById('users-list');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

// nhận tin nhắn
socket.on('chat message', (data) => {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message');
  msgDiv.innerHTML = `
    <img src="${data.avatar}" class="avatar">
    <strong>${data.username}:</strong> ${data.message}
  `;
  messages.appendChild(msgDiv);
  messages.scrollTop = messages.scrollHeight;
});

// nhận danh sách user online
socket.on('users online', (users) => {
  usersList.innerHTML = '';
  users.forEach(u => {
    const li = document.createElement('li');
    li.textContent = u.username;
    usersList.appendChild(li);
  });
});