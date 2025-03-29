const Activity = require("../models/activityModel");

exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.getAll();

    res.status(200).json({
      success: true,
      data: activities,
    });
  } catch (error) {
    console.error("アクティビティ取得エラー:", error);
    res.status(500).json({
      success: false,
      message: "サーバーエラーが発生しました",
      error: error.message,
    });
  }
};

exports.getActivityById = async (req, res) => {
  try {
    const { id } = req.params;

    const activity = await Activity.getById(id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "アクティビティが見つかりません",
      });
    }

    res.status(200).json({
      success: true,
      data: activity,
    });
  } catch (error) {
    console.error("アクティビティ取得エラー:", error);
    res.status(500).json({
      success: false,
      message: "サーバーエラーが発生しました",
      error: error.message,
    });
  }
};
