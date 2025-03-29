const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// ルーターのインポート
const reservationRoutes = require("./routes/reservationRoutes");
const activityRoutes = require("./routes/activityRoutes");

// Expressアプリの初期化
const app = express();

// ミドルウェアの設定
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ルートの設定
app.use("/api/reservations", reservationRoutes);
app.use("/api/activities", activityRoutes);

// ヘルスチェックエンドポイント
app.get("/api/health", (req, res) => {
  res
    .status(200)
    .json({ status: "OK", message: "サーバーは正常に動作しています" });
});

// エラーハンドリング
app.use((err, req, res, next) => {
  console.error("サーバーエラー:", err.stack);
  res.status(500).json({
    success: false,
    message: "サーバーでエラーが発生しました",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal Server Error",
  });
});

// サーバーの起動
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`サーバーが起動しました - ポート: ${PORT}`);
});
