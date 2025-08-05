# お問い合わせフォーム → Slack通知 設定手順書

## 概要
Webサイトのお問い合わせフォームから送信された内容を、自動的にSlackに通知する仕組みの構築手順です。

---

## 1. 必要なファイル構成

### api/slack.js (Netlify Function)
```javascript
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // CORS対応
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // プリフライトリクエスト(OPTIONS)への対応
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // POSTメソッド以外は拒否
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method Not Allowed' })
    };
  }

  try {
    // リクエストボディを解析
    const body = JSON.parse(event.body);
    const formData = body.formData || body;

    // Webhook URL - 環境変数から取得
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    
    if (!webhookUrl) {
      throw new Error('Webhook URL not configured');
    }

    // Slackメッセージのフォーマット（カスタマイズ可能）
    const message = {
      text: `🏥 新しいお問い合わせ - ${formData['last-name']} ${formData['first-name']}様`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '🏥 新しいお問い合わせ',
            emoji: true
          }
        },
        {
          type: 'section',
          fields: [
            { type: 'mrkdwn', text: `*お名前:*\n${formData['last-name']} ${formData['first-name']}` },
            { type: 'mrkdwn', text: `*メールアドレス:*\n${formData['email']}` }
          ]
        },
        {
          type: 'section',
          text: { type: 'mrkdwn', text: `*件名:*\n${formData['subject']}` }
        },
        {
          type: 'section',
          text: { type: 'mrkdwn', text: `*お問い合わせ内容:*\n\`\`\`${formData['message']}\`\`\`` }
        },
        {
          type: 'context',
          elements: [
            { type: 'mrkdwn', text: `📅 送信日時: ${new Date().toLocaleString('ja-JP')}` }
          ]
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: { type: 'plain_text', text: '📧 メール返信', emoji: true },
              url: `mailto:${formData['email']}?subject=Re: ${formData['subject']}`
            }
          ]
        }
      ]
    };

    // Slack APIへ送信
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });

    if (!response.ok) {
      throw new Error(`Slack responded with status ${response.status}`);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Slack通知エラー:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: error.message 
      })
    };
  }
};
```

### netlify.toml
```toml
[build]
  functions = "api"
  publish = "."
  command = "echo 'No build step required'"

[functions]
  node_bundler = "esbuild"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/api/slack"
  to = "/.netlify/functions/slack"
  status = 200
```

### package.json
```json
{
  "name": "website-with-slack-notifications",
  "version": "1.0.0",
  "description": "Website with Slack notifications",
  "scripts": {
    "dev": "netlify dev",
    "build": "echo 'Build complete'",
    "deploy": "netlify deploy --prod"
  },
  "dependencies": {
    "node-fetch": "^2.6.7"
  },
  "devDependencies": {
    "netlify-cli": "^15.0.0"
  }
}
```

---

## 2. HTMLフォームのJavaScript

フォームページに以下のスクリプトを追加：

```javascript
// Slack連携フォーム制御
async function sendToSlack(formData) {
    console.log('🔔 sendToSlack called with:', formData);

    try {
        // api/slack経由で送信
        const functionUrl = '/api/slack';
        
        console.log('🌐 Netlify Function経由で送信を試みます:', functionUrl);
        
        const response = await fetch(functionUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ formData })
        });

        if (!response.ok) {
            throw new Error(`Function呼び出しエラー: ${response.status}`);
        }

        let result;
        try {
            result = await response.json();
        } catch (e) {
            const text = await response.text();
            result = { success: response.ok, message: text };
        }

        console.log('📊 Slack送信結果:', result);

        if (result.success || response.ok) {
            return { success: true };
        } else {
            throw new Error(result.message || '不明なエラー');
        }
    } catch (error) {
        console.error('❌ Slack送信エラー:', error.message);
        return { success: false, message: error.message };
    }
}

// フォーム制御
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';
        submitBtn.disabled = true;
        
        try {
            // フォームデータを取得
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Slackに送信
            const result = await sendToSlack(data);
            
            if (result.success) {
                // 成功ページにリダイレクト
                window.location.href = '/pages/contact-success.html';
            } else {
                throw new Error(result.message || '送信に失敗しました');
            }
            
        } catch (error) {
            console.error('送信エラー:', error);
            alert('送信に失敗しました。しばらく時間をおいて再度お試しください。');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
});
```

---

## 3. Slack設定手順

### 3.1 Slack Appの作成
1. [https://api.slack.com/apps](https://api.slack.com/apps) にアクセス
2. 「Create New App」→「From scratch」を選択
3. App名と通知先ワークスペースを選択

### 3.2 Incoming Webhooksの設定
1. 左メニュー「Incoming Webhooks」をクリック
2. 「Activate Incoming Webhooks」をON
3. 「Add New Webhook to Workspace」をクリック
4. 通知先チャンネルを選択
5. 生成されたWebhook URLをコピー

---

## 4. Netlify設定手順

### 4.1 環境変数の設定
1. Netlifyサイトの管理画面にログイン
2. 対象サイトを選択
3. 「Project configuration」→「Environment variables」
4. 「Add a variable」をクリック
5. 以下を設定：
   - **Key**: `SLACK_WEBHOOK_URL`
   - **Value**: SlackのWebhook URL
   - **Scopes**: All deploys または Production

### 4.2 デプロイ
1. GitHubにコードをプッシュ（自動デプロイ）
2. または Netlifyの「Trigger deploy」から手動デプロイ

---

## 5. テスト手順

1. デプロイ完了後、お問い合わせフォームにアクセス
2. テストデータを入力して送信
3. Slackの指定チャンネルに通知が来ることを確認
4. 成功ページにリダイレクトされることを確認

---

## 6. トラブルシューティング

### よくあるエラー

| エラー | 原因 | 対処法 |
|--------|------|--------|
| `Webhook URL not configured` | 環境変数が未設定 | Netlifyで環境変数を再確認 |
| `Slack responded with status 404` | Webhook URLが無効 | SlackでWebhook URLを再生成 |
| `Function呼び出しエラー` | Netlify Functionの問題 | ログを確認、ファイル名を確認 |

### デバッグ方法
1. Netlify Functions のログを確認
2. ブラウザのコンソールでエラーを確認
3. Slackアプリの権限を確認

---

## 7. カスタマイズポイント

### メッセージフォーマット
`api/slack.js` の `message` オブジェクトを編集して、通知内容をカスタマイズ可能

### フォームフィールド
HTMLフォームのフィールド名に合わせて、Slack.jsのフィールド参照を変更

### 通知チャンネル
異なる種類の問い合わせを異なるチャンネルに送信することも可能

---

## 8. 作成日・更新日

- **作成日**: 2025-08-05
- **最終更新**: 2025-08-05
- **作成者**: Claude Code
- **プロジェクト**: 株式会社はるひメディカルサービス

---

## 9. 参考リンク

- [Slack API Documentation](https://api.slack.com/)
- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)