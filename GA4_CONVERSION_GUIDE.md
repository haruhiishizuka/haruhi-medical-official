# Google Analytics 4 コンバージョン設定ガイド

## コンバージョン（成果）として設定すべき項目

### 1. お問い合わせフォーム送信
- イベント名: `contact_form_submit`
- 設定場所: contact.htmlのフォーム送信時

### 2. Medimatchへのリンククリック
- イベント名: `medimatch_click`
- 現在のボタンから外部サイトへの遷移を計測

### 3. 電話番号クリック（スマホ）
- イベント名: `phone_click`
- 電話での問い合わせを計測

### 4. 重要ページの閲覧
- 採用ページの閲覧
- サービス詳細の閲覧時間

## 設定方法

### GA4管理画面での設定
1. 「管理」→「イベント」→「イベントを作成」
2. カスタムイベントを設定
3. 「コンバージョンとしてマークを付ける」をON

### コード実装例

```javascript
// お問い合わせフォーム送信時
document.getElementById('contactForm').addEventListener('submit', function(e) {
    gtag('event', 'contact_form_submit', {
        'event_category': 'engagement',
        'event_label': 'form_submission'
    });
});

// Medimatchボタンクリック時
document.querySelector('.medimatch-btn').addEventListener('click', function() {
    gtag('event', 'medimatch_click', {
        'event_category': 'external_link',
        'event_label': 'medimatch_service'
    });
});

// 電話番号クリック時
document.querySelectorAll('a[href^="tel:"]').forEach(function(tel) {
    tel.addEventListener('click', function() {
        gtag('event', 'phone_click', {
            'event_category': 'contact',
            'event_label': this.href
        });
    });
});
```

## 月次レポートで見るべき指標

### 1. トラフィック分析
- 前月比のユーザー数増減
- 新規vs再訪問者の割合
- モバイルvsデスクトップの割合

### 2. コンテンツ分析
- 人気ページTOP10
- 平均滞在時間の長いページ
- 離脱率の高いページ（改善対象）

### 3. コンバージョン分析
- お問い合わせ数の推移
- Medimatchへの送客数
- コンバージョン率（CVR）

## 改善アクション例

### アクセスが少ない場合
- SEO対策（タイトル、メタディスクリプション改善）
- コンテンツの追加（ブログ、事例紹介）
- SNS活用

### 直帰率が高い場合
- ページ読み込み速度の改善
- ファーストビューの改善
- 内部リンクの追加

### コンバージョンが少ない場合
- CTAボタンの配置変更
- フォームの簡略化
- 信頼性を高める要素の追加（実績、お客様の声）

## ダッシュボード作成

### カスタムダッシュボードの作成
1. 「レポート」→「ライブラリ」
2. 「新しいレポートを作成」
3. 以下を追加：
   - ユーザー数の推移グラフ
   - 人気ページ一覧
   - 流入元の円グラフ
   - コンバージョン数

### 定期レポートの設定
1. 「管理」→「レポートのスケジュール」
2. 週次/月次でメール配信設定
3. 主要指標を自動レポート化

## 競合分析のヒント

### 業界ベンチマークとの比較
- 医療系サイトの平均滞在時間: 2-3分
- 直帰率の目安: 40-60%
- モバイル比率: 60-70%

## 実装優先度

1. **今すぐ実装**: コンバージョントラッキング
2. **1週間以内**: カスタムイベントの設定
3. **1ヶ月以内**: 定期レポートの設定
4. **継続的**: データに基づく改善サイクル