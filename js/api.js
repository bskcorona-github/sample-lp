// API URLs
const API_BASE_URL = "http://localhost:5000/api";

// API Clientクラス
class ApiClient {
  // アクティビティの取得
  static async getActivities() {
    try {
      const response = await fetch(`${API_BASE_URL}/activities`);
      if (!response.ok) {
        throw new Error("アクティビティの取得に失敗しました");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("APIエラー:", error);
      throw error;
    }
  }

  // 予約状況の確認
  static async checkAvailability(activityId, date, time) {
    try {
      const params = new URLSearchParams({
        activity_id: activityId,
        date: date,
        time: time,
      });

      const response = await fetch(
        `${API_BASE_URL}/reservations/availability?${params}`
      );
      if (!response.ok) {
        throw new Error("予約状況の取得に失敗しました");
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("APIエラー:", error);
      throw error;
    }
  }

  // 予約の作成
  static async createReservation(reservationData) {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "予約の作成に失敗しました");
      }

      return data;
    } catch (error) {
      console.error("APIエラー:", error);
      throw error;
    }
  }
}
