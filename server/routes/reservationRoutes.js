const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

// 予約の作成
router.post("/", reservationController.createReservation);

// 予約状況の確認
router.get("/availability", reservationController.checkAvailability);

module.exports = router;
