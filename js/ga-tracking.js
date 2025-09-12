// Google Analytics 4 トラッキングコード
// このファイルをすべてのHTMLページで読み込んでください

document.addEventListener('DOMContentLoaded', function() {
    
    // GA4が読み込まれているか確認
    if (typeof gtag === 'undefined') {
        console.warn('Google Analytics (gtag) is not loaded');
        return;
    }
    
    // 1. Medimatchボタンのクリックトラッキング
    const medimatchButtons = document.querySelectorAll('.medimatch-btn, a[href*="medimatch"]');
    medimatchButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            gtag('event', 'medimatch_click', {
                'event_category': 'external_link',
                'event_label': 'medimatch_service',
                'value': 1
            });
            console.log('GA4 Event: medimatch_click sent');
        });
    });
    
    // 2. 電話番号クリックのトラッキング
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(function(tel) {
        tel.addEventListener('click', function() {
            const phoneNumber = this.href.replace('tel:', '');
            gtag('event', 'phone_click', {
                'event_category': 'contact',
                'event_label': phoneNumber,
                'value': 1
            });
            console.log('GA4 Event: phone_click sent - ' + phoneNumber);
        });
    });
    
    // 3. メールアドレスクリックのトラッキング
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(function(email) {
        email.addEventListener('click', function() {
            const emailAddress = this.href.replace('mailto:', '');
            gtag('event', 'email_click', {
                'event_category': 'contact',
                'event_label': emailAddress,
                'value': 1
            });
            console.log('GA4 Event: email_click sent - ' + emailAddress);
        });
    });
    
    // 4. 外部リンクのトラッキング（Medimatch以外）
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
    externalLinks.forEach(function(link) {
        // Medimatchは既に別途トラッキングしているので除外
        if (!link.href.includes('medimatch')) {
            link.addEventListener('click', function() {
                gtag('event', 'external_link_click', {
                    'event_category': 'external_link',
                    'event_label': this.href,
                    'value': 1
                });
                console.log('GA4 Event: external_link_click sent - ' + this.href);
            });
        }
    });
    
    // 5. PDFダウンロードのトラッキング
    const pdfLinks = document.querySelectorAll('a[href$=".pdf"]');
    pdfLinks.forEach(function(pdf) {
        pdf.addEventListener('click', function() {
            const fileName = this.href.split('/').pop();
            gtag('event', 'pdf_download', {
                'event_category': 'download',
                'event_label': fileName,
                'value': 1
            });
            console.log('GA4 Event: pdf_download sent - ' + fileName);
        });
    });
    
    // 6. スクロール深度のトラッキング（25%, 50%, 75%, 90%）
    let scrollDepths = {25: false, 50: false, 75: false, 90: false};
    
    function checkScrollDepth() {
        const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
        
        Object.keys(scrollDepths).forEach(function(depth) {
            if (scrollPercent >= depth && !scrollDepths[depth]) {
                scrollDepths[depth] = true;
                gtag('event', 'scroll_depth', {
                    'event_category': 'engagement',
                    'event_label': depth + '%',
                    'value': depth
                });
                console.log('GA4 Event: scroll_depth sent - ' + depth + '%');
            }
        });
    }
    
    // スクロールイベントに throttle を適用
    let scrollTimer;
    window.addEventListener('scroll', function() {
        if (scrollTimer) clearTimeout(scrollTimer);
        scrollTimer = setTimeout(checkScrollDepth, 100);
    });
    
    // 7. ページ滞在時間のトラッキング（15秒、30秒、60秒、180秒）
    const timeEngagements = [
        {seconds: 15, sent: false},
        {seconds: 30, sent: false},
        {seconds: 60, sent: false},
        {seconds: 180, sent: false}
    ];
    
    timeEngagements.forEach(function(engagement) {
        setTimeout(function() {
            if (!engagement.sent) {
                engagement.sent = true;
                gtag('event', 'time_on_page', {
                    'event_category': 'engagement',
                    'event_label': engagement.seconds + ' seconds',
                    'value': engagement.seconds
                });
                console.log('GA4 Event: time_on_page sent - ' + engagement.seconds + ' seconds');
            }
        }, engagement.seconds * 1000);
    });
    
    console.log('GA4 Tracking initialized successfully');
});