# ニュース更新ガイド

## 📁 ファイル構成

```
haruhi-medical-official/
├── index.html                    # トップページ（News & Insights セクション）
└── pages/news/
    └── index.html               # ニュース一覧ページ
```

## 🔄 ニュース更新フロー

### 新しいニュースを追加する場合

#### 1. トップページ（index.html）を更新
**場所：** 192行目〜243行目の `<!-- 新着情報 -->` セクション

**ニュースタブ（203-213行目）:**
```html
<article class="news-card">
    <div class="news-date">2025.XX.XX</div>
    <h3><a href="外部リンクURL" target="_blank">ニュースタイトル <i class="fas fa-external-link-alt" style="font-size: 0.8em; margin-left: 0.5em;"></i></a></h3>
    <p>ニュースの説明文...</p>
</article>
```

**コラムタブ（217-233行目）:**
```html
<article class="news-card">
    <div class="news-date">2024.XX.XX</div>
    <h3>コラムタイトル</h3>
    <p>コラムの説明文...</p>
</article>
```

#### 2. ニュース一覧ページ（pages/news/index.html）を更新
**場所：** 63行目〜103行目の記事カード部分

**外部リンクありの場合:**
```html
<article class="news-card" data-category="news">
    <div class="card-header">
        <div class="article-meta">
            <div class="article-date">2025.XX.XX</div>
            <div class="article-category">ニュース</div>
        </div>
        <h2>
            <a href="外部リンクURL" target="_blank">ニュースタイトル <i class="fas fa-external-link-alt"></i></a>
        </h2>
    </div>
    <div class="card-body">
        <p class="article-excerpt">ニュースの説明文...</p>
        <div class="article-tags">
            <span class="tag">タグ1</span>
            <span class="tag">タグ2</span>
        </div>
    </div>
</article>
```

**外部リンクなし（お知らせ等）の場合:**
```html
<article class="news-card" data-category="news">
    <div class="card-header">
        <div class="article-meta">
            <div class="article-date">2025.XX.XX</div>
            <div class="article-category">ニュース</div>
        </div>
        <h2>お知らせタイトル</h2>
    </div>
    <div class="card-body">
        <p class="article-excerpt">詳細な説明文（完結した内容）...</p>
        <div class="article-tags">
            <span class="tag">お知らせ</span>
        </div>
    </div>
</article>
```

#### 3. 人気記事セクションの更新
**場所：** pages/news/index.html の120-124行目

最新の重要なニュースを反映させる：
```html
<li>
    <a href="外部リンクURL" target="_blank">人気記事タイトル <i class="fas fa-external-link-alt"></i></a>
</li>
```

## 📋 ニュースの種類別運用方針

### 🔗 外部リンク（重要なニュース）
- **用途：** 新サービスリリース、重要な発表
- **リンク先：** 専用サイト、PDF、外部プレスリリース
- **例：** MediMatchリリース → https://medimatch.jp

### 📄 カード内完結（簡単なお知らせ）
- **用途：** 休業案内、営業時間変更、軽微な更新
- **リンク：** なし（カード内で情報完結）
- **例：** お盆休み案内、年末年始休業

### 📝 コラム記事
- **用途：** 業界分析、専門知識の共有
- **リンク：** 基本的になし（読み物として完結）
- **例：** 医療DX、働き方改革に関する考察

## ⚠️ 注意事項

1. **日付順序：** 新しいニュースを上部に配置
2. **リンク統一：** 外部リンクには必ず `target="_blank"` と外部リンクアイコンを付与
3. **カテゴリー：** 「ニュース」「コラム」の区分を明確に
4. **文字数：** 説明文は1-2文程度に収める
5. **タグ：** 適切なタグで分類（新サービス、お知らせ、休業、等）

## 🔄 更新後の確認項目

- [ ] トップページでニュースが正しく表示される
- [ ] ニュース一覧ページで記事が正しく表示される
- [ ] 外部リンクが正しく動作する
- [ ] 人気記事セクションが更新されている
- [ ] レスポンシブデザインで崩れがない