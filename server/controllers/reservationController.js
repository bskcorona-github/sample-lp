const Reservation = require("../models/reservationModel");
const Activity = require("../models/activityModel");
const EmailService = require("../utils/emailService");

// アクティビティIDのマッピング（文字列 → 数値）
const ACTIVITY_ID_MAP = {
  parasailing: 1,
  snorkeling: 2,
  jetski: 3,
};

// 開発環境用設定（本番環境ではfalseに変更）
const SKIP_EMAIL_SENDING = false;

exports.createReservation = async (req, res) => {
  try {
    const { name, email, phone, activity_id, date, time, participants } =
      req.body;

    // 入力検証
    if (!name || !email || !activity_id || !date || !time || !participants) {
      return res.status(400).json({
        success: false,
        message: "必須項目が入力されていません",
      });
    }

    // 文字列IDを数値IDに変換
    let numericActivityId = activity_id;
    if (isNaN(activity_id) && ACTIVITY_ID_MAP[activity_id]) {
      numericActivityId = ACTIVITY_ID_MAP[activity_id];
    }

    // 予約可能かチェック
    const availability = await Reservation.getAvailability(
      numericActivityId,
      date,
      time
    );
    if (!availability.available || participants > availability.availableSpots) {
      return res.status(400).json({
        success: false,
        message: "予約可能な枠を超えています",
      });
    }

    // 予約を作成
    const reservation = await Reservation.create({
      name,
      email,
      phone,
      activity_id: numericActivityId,
      date,
      time,
      participants,
    });

    // アクティビティ名を取得
    const activity = await Activity.getById(numericActivityId);

    // メール送信（開発環境ではスキップ可能）
    if (!SKIP_EMAIL_SENDING) {
      try {
        // 予約確認メールを送信
        await EmailService.sendConfirmationEmail(reservation, activity.name);

        // 管理者通知メールを送信
        await EmailService.sendAdminNotification(reservation, activity.name);
      } catch (emailError) {
        console.error("メール送信エラー:", emailError);
        // メールエラーでも予約処理は続行
      }
    } else {
      console.log("開発モード: メール送信をスキップします");
      console.log("予約確認メール内容:", {
        to: reservation.email, // 宛先を予約者のメールアドレスに設定
        subject: `【ご予約確認】${activity.name}のご予約ありがとうございます`,
        // その他のメール内容...
      });
      console.log("管理者通知メール内容:", {
        to: "kanemasa.tatsuro@gmail.com",
        subject: `【新規予約通知】${activity.name}の予約がありました`,
        // その他のメール内容...
      });
    }

    res.status(201).json({
      success: true,
      message: "予約が完了しました",
      data: reservation,
    });
  } catch (error) {
    console.error("予約作成エラー:", error);
    res.status(500).json({
      success: false,
      message: "サーバーエラーが発生しました",
      error: error.message,
    });
  }
};

exports.checkAvailability = async (req, res) => {
  try {
    const { activity_id, date, time } = req.query;

    // 入力検証
    if (!activity_id || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "必須パラメータが不足しています",
      });
    }

    // 文字列IDを数値IDに変換
    let numericActivityId = activity_id;
    if (isNaN(activity_id) && ACTIVITY_ID_MAP[activity_id]) {
      numericActivityId = ACTIVITY_ID_MAP[activity_id];
    }

    // 予約状況を取得
    const availability = await Reservation.getAvailability(
      numericActivityId,
      date,
      time
    );

    res.status(200).json({
      success: true,
      data: availability,
    });
  } catch (error) {
    console.error("予約状況チェックエラー:", error);
    res.status(500).json({
      success: false,
      message: "サーバーエラーが発生しました",
      error: error.message,
    });
  }
};
