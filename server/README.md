# 予約システム サーバー

## セットアップ手順

### 環境変数の設定

1. `.env.example`ファイルを`.env`にコピーします
2. `.env`ファイル内の変数を適切な値に変更します

### データベースのセットアップ

1. MySQL がインストールされていることを確認します
2. 以下のコマンドでデータベースを初期化します:

```
# MySQLにログインしてデータベースを作成
mysql -u root -p
```

MySQL プロンプトで以下を実行:

```sql
CREATE DATABASE reservation_db;
exit;
```

次に以下のコマンドでテーブルを作成:

```
mysql -u root -p reservation_db < database.sql
```

または、次の npm スクリプトを実行します:

```
npm run setup-db
```

### サーバーの起動

開発モードで起動:

```
npm run dev
```

本番モードで起動:

```
npm start
```

## API エンドポイント

### アクティビティ

- `GET /api/activities` - すべてのアクティビティを取得
- `GET /api/activities/:id` - 特定のアクティビティを取得

### 予約

- `POST /api/reservations` - 新しい予約を作成
- `GET /api/reservations/availability` - 特定の日時、アクティビティの予約状況を確認

## メール機能

本システムでは以下のメールが送信されます:

1. 予約確認メール - 予約者に送信
2. 予約通知メール - 管理者に送信

メール機能を利用するには、`.env`ファイルに正しい SMTP 設定を行ってください。
