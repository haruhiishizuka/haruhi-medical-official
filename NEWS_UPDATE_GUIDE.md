# ニュース更新ガイド

## 📁 ファイル構成

```
haruhi-medical-official/
├── index.html                    # トップページ（News & Insights セクション）
├── pages/news/
│   ├── index.html               # ニュース一覧ページ
│   ├── template.html            # 新規記事作成用テンプレート
│   ├── obon-holiday-2025.html  # お盆休み記事（例）
│   └── medimatch-release.html  # MediMatchリリース記事（例）
└── NEWS_UPDATE_GUIDE.md        # このガイド
```

## 🔄 ニュース更新フロー

### 新しいニュースを追加する場合

#### 1. 詳細ページを作成
1. **テンプレートをコピー：** `pages/news/template.html` を新しいファイル名でコピー
   - ファイル名例：`new-service-2025.html`、`year-end-holiday-2024.html`
2. **コンテンツを編集：**
   - タイトル、メタディスクリプション
   - 記事ヘッダー（日付、カテゴリ、タグ）
   - 記事本文
   - サイドバーの関連記事リンク
   - ナビゲーションの前後記事リンク

#### 2. トップページ（index.html）を更新
**場所：** 192行目〜243行目の `<!-- 新着情報 -->` セクション

**ニュースタブ（203-213行目）:**
```html
<article class="news-card">
    <div class="news-date">2025.XX.XX</div>
    <h3><a href="pages/news/new-article.html">ニュースタイトル</a></h3>
    <p>ニュースの説明文...</p>
</article>
```

**コラムタブ（217-233行目）:**
```html
<article class="news-card">
    <div class="news-date">2024.XX.XX</div>
    <h3><a href="pages/news/new-column.html">コラムタイトル</a></h3>
    <p>コラムの説明文...</p>
</article>
```

#### 3. ニュース一覧ページ（pages/news/index.html）を更新
**場所：** 63行目〜103行目の記事カード部分

```html
<article class="news-card" data-category="news">
    <div class="card-header" style="padding: 1.5rem 1.5rem 0.5rem;">
        <div class="article-meta" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <div class="article-date" style="color: #6c757d; font-size: 0.9rem; font-weight: 500;">2025.XX.XX</div>
            <div class="article-category" style="background: #f8f9fa; color: #495057; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 500;">ニュース</div>
        </div>
        <h2 style="margin: 0 0 1rem 0; font-size: 1.3rem; font-weight: 600; line-height: 1.4;">
            <a href="new-article.html" style="text-decoration: none; color: #333; transition: color 0.3s ease;">ニュースタイトル</a>
        </h2>
    </div>
    <div class="card-body" style="padding: 0 1.5rem 1.5rem;">
        <p class="article-excerpt" style="color: #6c757d; line-height: 1.6; margin-bottom: 1rem; font-size: 0.95rem;">ニュースの説明文...</p>
        <div class="article-tags" style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <span class="tag" style="background: #e3f2fd; color: #1976d2; padding: 0.25rem 0.5rem; border-radius: 15px; font-size: 0.75rem; font-weight: 500;">タグ1</span>
            <span class="tag" style="background: #e8f5e8; color: #4caf50; padding: 0.25rem 0.5rem; border-radius: 15px; font-size: 0.75rem; font-weight: 500;">タグ2</span>
        </div>
    </div>
</article>
```

#### 4. 人気記事セクションの更新
**場所：** pages/news/index.html の120-124行目

```html
<li style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #e9ecef;">
    <a href="new-article.html" style="text-decoration: none; color: #333; font-weight: 500; line-height: 1.4; transition: color 0.3s ease;">新記事タイトル</a>
</li>
```

## 📋 記事作成のベストプラクティス

### 📝 記事構成
1. **記事サマリー** - 重要なポイントを1-2文で要約
2. **メインコンテンツ** - 見出しと段落で構造化
3. **特別なセクション** - 重要な情報やお知らせ
4. **CTAセクション** - お問い合わせへの誘導

### 🏷️ タグとカテゴリー
- **ニュース：** 新サービス、お知らせ、休業、リリース
- **コラム：** 業界分析、専門知識、トレンド

### 🎨 スタイリングガイド
- **メインカラー：** #675032（緑系）
- **アクセントカラー：** #1976d2（青系）、#4caf50（緑系）
- **文字サイズ：** h1(2.5rem), h2(1.8rem), h3(1.3rem)
- **余白：** 統一感のあるpadding/margin設計

## 📂 ファイル命名規則

- **日付＋内容：** `obon-holiday-2025.html`
- **サービス名：** `medimatch-release.html`  
- **イベント名：** `annual-seminar-2025.html`
- **記号使用避け：** アンダースコア、ハイフンのみ使用

## ⚠️ 注意事項

1. **日付順序：** 新しいニュースを上部に配置
2. **リンク整合性：** 全てのページで適切にリンクが設定されているか確認
3. **レスポンシブ：** モバイル表示も確認
4. **SEO：** titleタグ、meta descriptionを適切に設定
5. **ナビゲーション：** 前後記事リンクを更新

## 🔄 更新後の確認項目

- [ ] トップページでニュースが正しく表示される
- [ ] ニュース一覧ページで記事が正しく表示される  
- [ ] 詳細ページが正しく表示される
- [ ] 人気記事セクションが更新されている
- [ ] 関連記事リンクが正しく動作する
- [ ] レスポンシブデザインで崩れがない
- [ ] ナビゲーション（前後記事）が正しく設定されている