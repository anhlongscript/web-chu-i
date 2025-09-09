const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello từ Render 🚀");
});

app.listen(PORT, () => {
  console.log(Server đang chạy ở cổng ${PORT});
});
