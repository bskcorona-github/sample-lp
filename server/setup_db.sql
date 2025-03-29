-- データベースの作成（存在しなければ）
CREATE DATABASE IF NOT EXISTS reservation_db;

-- データベースの選択
USE reservation_db;

-- 既存テーブルを削除
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS activities;

-- アクティビティテーブルの作成
CREATE TABLE activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  max_participants INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 予約テーブルの作成
CREATE TABLE reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  activity_id INT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  participants INT NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (activity_id) REFERENCES activities(id)
);

-- アクティビティデータの挿入（固定ID）
INSERT INTO activities (id, name, description, max_participants, price) VALUES
(1, 'parasailing', 'パラセーリング体験', 5, 7000),
(2, 'snorkeling', 'シュノーケリング体験', 8, 5000),
(3, 'jetski', 'ジェットスキー体験', 3, 8000);

-- IDの自動増分を修正（既にID 3まで使用したので、次は4から）
ALTER TABLE activities AUTO_INCREMENT = 4; 