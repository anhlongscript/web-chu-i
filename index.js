// index.js (root của repo)
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// serve thư mục public
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Streaky đang chạy ở cổng ${PORT}`);
});
