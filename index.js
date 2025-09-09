const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Cho phép serve file tĩnh (CSS, JS, ảnh...) nếu sau này bạn thêm
app.use(express.static(__dirname));

// Route chính → trả về file index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`✅ streaky đang chạy ở cổng ${PORT}`);
});
