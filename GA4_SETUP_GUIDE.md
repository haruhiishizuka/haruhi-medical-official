# Google Analytics 4 (GA4) 設定ガイド

## 概要
このサイトにGoogle Analytics 4のトラッキングコードが追加されました。実際に動作させるには、以下の手順でGA4の測定IDを取得し、設定する必要があります。

## 設定手順

### 1. Google Analytics アカウントの作成
1. [Google Analytics](https://analytics.google.com/) にアクセス
2. Googleアカウントでログイン
3. 「測定を開始」をクリック

### 2. プロパティの設定
1. アカウント名を入力（例：株式会社はるひメディカルサービス）
2. データ共有設定を確認して「次へ」
3. プロパティ名を入力（例：はるひメディカルサービス公式サイト）
4. タイムゾーン：日本
5. 通貨：日本円（JPY）を選択
6. 「次へ」をクリック

### 3. ビジネス情報の設定
1. 業種カテゴリ：「ヘルスケア」または「ビジネスサービス」を選択
2. ビジネスの規模を選択
3. 利用目的を選択して「作成」

### 4. データストリームの設定
1. プラットフォーム：「ウェブ」を選択
2. ウェブサイトのURL：サイトのURLを入力
3. ストリーム名：任意の名前（例：メインサイト）
4. 「ストリームを作成」をクリック

### 5. 測定IDの取得
1. 作成されたデータストリームの詳細画面で「測定ID」が表示されます
2. 形式：`G-XXXXXXXXXX`（Gで始まる英数字）
3. この測定IDをコピー

### 6. サイトへの測定ID設定

現在、すべてのHTMLファイルに以下のコードが追加されています：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
</script>
```

**`G-XXXXXXXXXX`を実際の測定IDに置き換える必要があります。**

### 7. 置き換えが必要なファイル一覧
以下のすべてのファイルで`G-XXXXXXXXXX`を実際の測定IDに置き換えてください（各ファイルに2箇所）：

- `index.html`
- `pages/about.html`
- `pages/contact.html`
- `pages/contact-success.html`
- `pages/privacy.html`
- `pages/sitemap.html`
- `pages/terms.html`
- `pages/news/index.html`
- `pages/news/medimatch-release.html`
- `pages/news/obon-holiday-2025.html`
- `pages/news/template.html`
- `pages/recruit/index.html`

### 8. 動作確認
1. サイトをブラウザで開く
2. Google Analyticsの管理画面で「リアルタイム」レポートを確認
3. 自分のアクセスが表示されれば設定完了

## トラッキングされるデータ
- ページビュー数
- ユーザー数
- セッション数
- 平均滞在時間
- 直帰率
- 参照元/メディア
- デバイス情報
- 地域情報

## プライバシーポリシーへの追記
Google Analyticsを使用する場合、プライバシーポリシーに以下の内容を追記することを推奨します：

- Google Analyticsを使用していること
- Cookieを使用してデータを収集していること
- 収集したデータの用途
- オプトアウトの方法

## 注意事項
- 測定IDは公開されても問題ありませんが、管理画面へのアクセス権限は適切に管理してください
- 定期的にAnalyticsのレポートを確認し、サイトの改善に活用してください
- GDPRやCCPAなどのプライバシー規制に準拠する必要がある場合は、追加の設定が必要です

## サポート
設定に関して不明な点がある場合は、[Google Analytics ヘルプセンター](https://support.google.com/analytics) を参照してください。