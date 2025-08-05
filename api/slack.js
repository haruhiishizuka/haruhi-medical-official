// api/slack.js - medimatch-quiz-newと同じ仕組み
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

    // お問い合わせ種別のマッピング
    const inquiryTypeMap = {
      'recruitment': '人材紹介について',
      'consulting': '経営コンサルティングについて',
      'succession': '事業承継について',
      'career': '転職・キャリア相談',
      'partnership': '業務提携について',
      'other': 'その他'
    };

    const clientType = formData['client-type'] === 'corporate' ? '法人・医療機関' : '個人（求職者）';

    // Slackメッセージのフォーマット
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
            { type: 'mrkdwn', text: `*お問い合わせ種別:*\n${inquiryTypeMap[formData['inquiry-type']] || formData['inquiry-type']}` },
            { type: 'mrkdwn', text: `*お立場:*\n${clientType}` }
          ]
        },
        {
          type: 'section',
          fields: [
            { type: 'mrkdwn', text: `*お名前:*\n${formData['last-name']} ${formData['first-name']}` },
            { type: 'mrkdwn', text: `*フリガナ:*\n${formData['last-name-kana']} ${formData['first-name-kana']}` }
          ]
        },
        {
          type: 'section',
          fields: [
            { type: 'mrkdwn', text: `*メールアドレス:*\n${formData['email']}` },
            { type: 'mrkdwn', text: `*都道府県:*\n${formData['prefecture']}` }
          ]
        }
      ]
    };

    // 法人情報を追加
    if (formData['client-type'] === 'corporate' && formData['company-name']) {
      message.blocks.push({
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*法人・医療機関名:*\n${formData['company-name']}` },
          { type: 'mrkdwn', text: `*部署・役職:*\n${formData['department'] || '未入力'}` }
        ]
      });
    }

    // 件名とメッセージ
    message.blocks.push({
      type: 'section',
      text: { type: 'mrkdwn', text: `*件名:*\n${formData['subject']}` }
    });

    message.blocks.push({
      type: 'section',
      text: { type: 'mrkdwn', text: `*お問い合わせ内容:*\n\`\`\`${formData['message']}\`\`\`` }
    });

    // 連絡希望時間帯
    if (formData['contact-time']) {
      const timeMap = {
        'morning': '午前中（9:00～12:00）',
        'afternoon': '午後（13:00～17:00）',
        'evening': '夕方（17:00～19:00）'
      };
      message.blocks.push({
        type: 'section',
        text: { type: 'mrkdwn', text: `*ご連絡希望時間:*\n${timeMap[formData['contact-time']] || '指定なし'}` }
      });
    }

    // 送信日時
    message.blocks.push({
      type: 'context',
      elements: [
        { type: 'mrkdwn', text: `📅 送信日時: ${new Date().toLocaleString('ja-JP')}` }
      ]
    });

    // メール返信ボタン
    message.blocks.push({
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: { type: 'plain_text', text: '📧 メール返信', emoji: true },
          url: `mailto:${formData['email']}?subject=Re: ${formData['subject']}`
        }
      ]
    });

    // Slack APIへ送信
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });

    // レスポンスの確認
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