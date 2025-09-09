// index.js
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Cho phép Express phục vụ file tĩnh trong thư mục public
app.use(express.static(path.join(__dirname, "public")));

// Route mặc định -> index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ streaky đang chạy ở cổng ${PORT}`);
});
