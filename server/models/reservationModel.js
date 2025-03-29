const db = require("../config/db");

class Reservation {
  // 新しい予約を作成する
  static async create(reservation) {
    try {
      const [result] = await db.query(
        `INSERT INTO reservations (name, email, phone, activity_id, date, time, participants, status) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          reservation.name,
          reservation.email,
          reservation.phone,
          reservation.activity_id,
          reservation.date,
          reservation.time,
          reservation.participants,
          "pending",
        ]
      );
      return { id: result.insertId, ...reservation };
    } catch (error) {
      throw error;
    }
  }

  // 特定の日付、時間、アクティビティの予約状況を取得
  static async getAvailability(activityId, date, time) {
    try {
      // アクティビティの最大人数を取得（文字列IDの場合はnameフィールドで検索）
      const [activities] = await db.query(
        "SELECT max_participants FROM activities WHERE id = ? OR name = ?",
        [activityId, activityId]
      );

      if (activities.length === 0) {
        throw new Error("アクティビティが見つかりません");
      }

      const maxParticipants = activities[0].max_participants;

      // 現在の予約人数を取得
      const [reservations] = await db.query(
        `SELECT SUM(participants) as total_participants 
         FROM reservations 
         WHERE activity_id = ? AND date = ? AND time = ? AND status != 'cancelled'`,
        [activityId, date, time]
      );

      const currentParticipants = reservations[0].total_participants || 0;
      const availableSpots = maxParticipants - currentParticipants;

      return {
        available: availableSpots > 0,
        availableSpots,
        maxParticipants,
      };
    } catch (error) {
      throw error;
    }
  }

  // 予約の詳細を取得
  static async getById(id) {
    try {
      const [rows] = await db.query(
        `SELECT r.*, a.name as activity_name, a.price 
         FROM reservations r
         JOIN activities a ON r.activity_id = a.id
         WHERE r.id = ?`,
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Reservation;
