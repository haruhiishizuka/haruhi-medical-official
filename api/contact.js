// Netlify Functions用のSlack App実装
const { WebClient } = require('@slack/web-api');

// 環境変数から取得
const slack = new WebClient(process.env.SLACK_BOT_TOKEN);
const SLACK_CHANNEL = process.env.SLACK_CHANNEL_ID; // チャンネルID (例: C1234567890)

exports.handler = async (event, context) => {
  // CORS設定
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // プリフライトリクエスト対応
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const formData = JSON.parse(event.body);
    
    // フォームデータの検証
    if (!formData['last-name'] || !formData['email'] || !formData['message']) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: '必須項目が入力されていません' })
      };
    }

    // Slackメッセージの作成
    const message = createSlackMessage(formData);

    // Slackに送信
    const result = await slack.chat.postMessage({
      channel: SLACK_CHANNEL,
      ...message
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'お問い合わせを送信しました',
        timestamp: result.ts 
      })
    };

  } catch (error) {
    console.error('Error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: '送信に失敗しました',
        details: error.message 
      })
    };
  }
};

function createSlackMessage(formData) {
  const inquiryTypeMap = {
    'recruitment': '人材紹介について',
    'consulting': '経営コンサルティングについて',
    'succession': '事業承継について',
    'career': '転職・キャリア相談',
    'partnership': '業務提携について',
    'other': 'その他'
  };

  const clientTypeText = formData['client-type'] === 'corporate' ? '法人・医療機関' : '個人（求職者）';
  
  const contactTimeMap = {
    'morning': '午前中（9:00～12:00）',
    'afternoon': '午後（13:00～17:00）',
    'evening': '夕方（17:00～19:00）',
    '': '指定なし'
  };

  // Slack Blocks APIを使用したリッチな表示
  const blocks = [
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "🏥 新しいお問い合わせ",
        "emoji": true
      }
    },
    {
      "type": "section",
      "fields": [
        {
          "type": "mrkdwn",
          "text": `*お問い合わせ種別:*\n${inquiryTypeMap[formData['inquiry-type']] || formData['inquiry-type']}`
        },
        {
          "type": "mrkdwn",
          "text": `*お立場:*\n${clientTypeText}`
        },
        {
          "type": "mrkdwn",
          "text": `*お名前:*\n${formData['last-name']} ${formData['first-name']}\n（${formData['last-name-kana']} ${formData['first-name-kana']}）`
        },
        {
          "type": "mrkdwn",
          "text": `*メールアドレス:*\n${formData['email']}`
        }
      ]
    }
  ];

  // 法人情報を追加
  if (formData['client-type'] === 'corporate' && formData['company-name']) {
    blocks[1].fields.push({
      "type": "mrkdwn",
      "text": `*法人・医療機関名:*\n${formData['company-name']}`
    });
    
    if (formData['department']) {
      blocks[1].fields.push({
        "type": "mrkdwn",
        "text": `*部署・役職:*\n${formData['department']}`
      });
    }
  }

  // 詳細情報
  blocks.push({
    "type": "section",
    "fields": [
      {
        "type": "mrkdwn",
        "text": `*都道府県:*\n${formData['prefecture']}`
      },
      {
        "type": "mrkdwn",
        "text": `*件名:*\n${formData['subject']}`
      },
      {
        "type": "mrkdwn",
        "text": `*ご連絡希望時間:*\n${contactTimeMap[formData['contact-time']] || '指定なし'}`
      },
      {
        "type": "mrkdwn",
        "text": `*送信日時:*\n${new Date().toLocaleString('ja-JP')}`
      }
    ]
  });

  // お問い合わせ内容
  blocks.push({
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": `*お問い合わせ内容:*\n\`\`\`${formData['message']}\`\`\``
    }
  });

  // アクションボタン
  blocks.push({
    "type": "actions",
    "elements": [
      {
        "type": "button",
        "text": {
          "type": "plain_text",
          "text": "📧 メール返信",
          "emoji": true
        },
        "url": `mailto:${formData['email']}?subject=Re: ${formData['subject']}`
      }
    ]
  });

  return {
    text: `新しいお問い合わせ: ${formData['last-name']} ${formData['first-name']}様`,
    blocks: blocks,
    username: "はるひメディカル",
    icon_emoji: ":hospital:"
  };
}