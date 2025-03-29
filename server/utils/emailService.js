const transporter = require("../config/mailer");
require("dotenv").config();

class EmailService {
  // 予約確認メールを送信する
  static async sendConfirmationEmail(reservation, activityName) {
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: reservation.email,
      subject: `【ご予約確認】${activityName}のご予約ありがとうございます`,
      html: `
        <h2>ご予約確認</h2>
        <p>${reservation.name}様</p>
        <p>この度は、ご予約いただき誠にありがとうございます。</p>
        <p>以下の内容でご予約を承りました。</p>
        
        <div style="margin: 20px 0; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
          <p><strong>アクティビティ:</strong> ${activityName}</p>
          <p><strong>日付:</strong> ${reservation.date}</p>
          <p><strong>時間:</strong> ${reservation.time}</p>
          <p><strong>人数:</strong> ${reservation.participants}名様</p>
        </div>
        
        <h3>ご参加にあたってのご注意</h3>
        <ul>
          <li>当日は開始時間の15分前までにお越しください。</li>
          <li>天候等の理由により、やむを得ず中止となる場合がございます。その際は事前にご連絡いたします。</li>
          <li>服装・持ち物等の詳細は当社ウェブサイトをご確認ください。</li>
        </ul>
        
        <p>ご不明な点がございましたら、お気軽にお問い合わせください。</p>
        <p>当日、皆様にお会いできることを楽しみにしております。</p>
        
        <div style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
          <p>〒000-0000 東京都〇〇区××町1-2-3</p>
          <p>電話: 03-1234-5678</p>
          <p>メール: info@example.com</p>
        </div>
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("予約確認メール送信成功:", info.messageId);
      return info;
    } catch (error) {
      console.error("予約確認メール送信エラー:", error);
      throw error;
    }
  }

  // 管理者通知メールを送信する
  static async sendAdminNotification(reservation, activityName) {
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: "kanemasa.tatsuro@gmail.com",
      subject: `【新規予約通知】${activityName}の予約がありました`,
      html: `
        <h2>新規予約通知</h2>
        <p>新しい予約が入りました。</p>
        
        <div style="margin: 20px 0; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
          <p><strong>予約ID:</strong> ${reservation.id}</p>
          <p><strong>予約者名:</strong> ${reservation.name}</p>
          <p><strong>メール:</strong> ${reservation.email}</p>
          <p><strong>電話番号:</strong> ${reservation.phone || "なし"}</p>
          <p><strong>アクティビティ:</strong> ${activityName}</p>
          <p><strong>日付:</strong> ${reservation.date}</p>
          <p><strong>時間:</strong> ${reservation.time}</p>
          <p><strong>人数:</strong> ${reservation.participants}名</p>
        </div>
        
        <p>予約管理システムで詳細をご確認ください。</p>
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("管理者通知メール送信成功:", info.messageId);
      return info;
    } catch (error) {
      console.error("管理者通知メール送信エラー:", error);
      throw error;
    }
  }
}

module.exports = EmailService;
