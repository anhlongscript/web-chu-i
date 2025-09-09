const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Xin chào từ streaky ✨");
});

app.listen(PORT, () => {
  console.log(✅ streaky đang chạy ở cổng ${PORT});
});
