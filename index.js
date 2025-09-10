// index.js (root)
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve toàn bộ thư mục public
app.use(express.static(path.join(__dirname, 'public')));

// root -> trả về file login (public/index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ streaky đang chạy ở cổng ${PORT}`);
});
