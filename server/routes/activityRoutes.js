const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activityController");

// すべてのアクティビティを取得
router.get("/", activityController.getAllActivities);

// IDによるアクティビティ取得
router.get("/:id", activityController.getActivityById);

module.exports = router;
