# サンプル LP

このプロジェクトは、SEO 対策を考慮したランディングページ（LP）のサンプルです。VSCode/Cursor で開発でき、レスポンシブデザインに対応しています。

## 機能

- レスポンシブデザイン
- SEO 対策済み（メタタグ、構造化データ、サイトマップなど）
- お問い合わせフォーム
- スムーススクロール
- アニメーション効果

## 技術スタック

- HTML5
- CSS3
- JavaScript (Vanilla JS)

## ファイル構成

```
sample-lp/
├── index.html         # メインのランディングページ
├── privacy.html       # プライバシーポリシーページ
├── terms.html         # 利用規約ページ
├── css/
│   └── style.css      # スタイルシート
├── js/
│   └── script.js      # JavaScriptファイル
├── images/            # 画像ファイル（未追加）
├── robots.txt         # クローラー向け設定ファイル
├── sitemap.xml        # サイトマップファイル
└── README.md          # プロジェクト説明
```

## 使用方法

### ローカル開発

1. リポジトリをクローンまたはダウンロードします
2. VSCode または Cursor で開きます
3. Live Server 拡張機能をインストールします
4. index.html を右クリックして「Live Server で開く」を選択します

### 公開方法

1. Web サーバーを用意します（レンタルサーバー、VPS など）
2. ドメインを取得して設定します
3. FTP クライアント（FileZilla 等）または Git を使用してファイルをアップロードします
4. 必要に応じて、お問い合わせフォームのバックエンド処理を実装します

## SEO 対策

このサンプル LP には以下の SEO 対策が実施されています：

- 適切な HTML 構造（見出しタグの階層化）
- メタタグ（description, viewport, robots）
- OGP 設定（SNS 共有用メタタグ）
- 構造化データ（schema.org）
- サイトマップ（sitemap.xml）
- robots.txt
- 画像の alt 属性
- レスポンシブデザイン（モバイルフレンドリー）

## カスタマイズ方法

1. `index.html` のコンテンツを自社サービスに合わせて変更
2. `css/style.css` の色やフォントを調整
3. 画像を `images/` ディレクトリに追加して参照を更新
4. メタタグや OGP 設定を実際のサービス情報に更新
5. お問い合わせフォームのバックエンド処理を実装

## 注意事項

- 画像ファイルは含まれていないため、実際の使用時には必要な画像を用意してください
- お問い合わせフォームは現状フロントエンドのみの実装です。実際に使用する場合はバックエンド処理を追加してください

## ライセンス

このサンプル LP は自由に使用・改変していただけます。商用利用も可能です。
