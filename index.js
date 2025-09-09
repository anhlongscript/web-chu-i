const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// route chính
app.get("/", (req, res) => {
  res.send("Xin chào từ streaky ✨");
});

// lắng nghe server
app.listen(PORT, () => {
  console.log(✅ streaky đang chạy ở cổng ${PORT});
});
