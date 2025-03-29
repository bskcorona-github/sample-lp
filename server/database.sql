CREATE DATABASE IF NOT EXISTS reservation_db;

USE reservation_db;

CREATE TABLE IF NOT EXISTS activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  max_participants INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reservations (
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

-- 初期データ挿入
INSERT INTO activities (name, description, max_participants, price) VALUES
('農業体験', '農場での野菜の収穫体験です。', 10, 3000),
('果物狩り', '季節の果物を自分で収穫できます。', 15, 2500),
('陶芸教室', '手作りの陶器を作る体験です。', 8, 4000); 