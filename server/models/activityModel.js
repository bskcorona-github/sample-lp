const db = require("../config/db");

class Activity {
  // すべてのアクティビティを取得
  static async getAll() {
    try {
      const [rows] = await db.query("SELECT * FROM activities");
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // IDでアクティビティを取得（文字列の場合はnameで検索）
  static async getById(id) {
    try {
      const [rows] = await db.query(
        "SELECT * FROM activities WHERE id = ? OR name = ?",
        [id, id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Activity;
