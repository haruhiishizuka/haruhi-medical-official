// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
    
    // 英語テキストの一文字ずつアニメーション
    function animateText() {
        const quoteElement = document.getElementById('animated-quote');
        if (quoteElement) {
            const text = quoteElement.textContent;
            quoteElement.innerHTML = '';
            
            // 各文字を span で囲む
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.classList.add('char');
                span.textContent = char;
                span.style.animationDelay = `${index * 0.05}s`;
                quoteElement.appendChild(span);
            });
        }
    }
    
    // ページ読み込み後少し遅らせてアニメーション開始
    setTimeout(animateText, 1000);
    
    // ハンバーガーメニューの処理
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // メニュー項目クリック時にメニューを閉じる
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // スムーススクロール
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // サービスタブ切り替え
    const serviceTabs = document.querySelectorAll('.service-tab');
    const serviceContents = document.querySelectorAll('.service-content');

    serviceTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetContent = this.getAttribute('data-target');
            
            // タブのアクティブ状態を切り替え
            serviceTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // コンテンツの表示を切り替え
            serviceContents.forEach(content => {
                content.classList.toggle('active', content.id === targetContent);
            });
        });
    });

    // ニュースタブ切り替え
    const tabBtns = document.querySelectorAll('.tab-btn');
    const newsTabs = document.querySelectorAll('.news-tab');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // タブボタンのアクティブ状態を切り替え
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // タブコンテンツの表示を切り替え
            newsTabs.forEach(tab => {
                tab.classList.toggle('active', tab.id === targetTab);
            });
        });
    });

    // ヘッダーのスクロール時の背景変更
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.backdropFilter = 'blur(15px)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            }
        });
    }

    // リサイズ時の処理
    function handleResize() {
        // モバイル表示時にメニューを閉じる
        if (window.innerWidth > 768 && navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }

    window.addEventListener('resize', handleResize);

    // MediMatchリンクの準備中ポップアップ処理
    const medimatchLinks = document.querySelectorAll('.medimatch-btn, a[href*="medimatch.jp"]');
    medimatchLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showComingSoonModal();
        });
    });

    // 準備中モーダルを表示する関数
    function showComingSoonModal() {
        // モーダルHTML作成
        const modal = document.createElement('div');
        modal.className = 'coming-soon-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>MediMatch</h3>
                        <button class="modal-close" aria-label="閉じる">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-icon">
                            <i class="fas fa-tools"></i>
                        </div>
                        <h4>準備中です</h4>
                        <p>転職支援サービス「MediMatch」は現在準備中です。<br>
                        サービス開始まで今しばらくお待ちください。</p>
                        <p class="coming-soon-note">
                            <i class="fas fa-info-circle"></i>
                            ご質問・ご相談は<a href="pages/contact.html">お問い合わせ</a>からお気軽にどうぞ
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary modal-ok">了解しました</button>
                    </div>
                </div>
            </div>
        `;

        // モーダルスタイル追加
        const style = document.createElement('style');
        style.textContent = `
            .coming-soon-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.6);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1rem;
            }
            
            .modal-content {
                background: white;
                border-radius: 12px;
                max-width: 480px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: slideIn 0.3s ease;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem 2rem 1rem;
                border-bottom: 1px solid #e2e8f0;
            }
            
            .modal-header h3 {
                margin: 0;
                color: #675032;
                font-size: 1.5rem;
                font-weight: 600;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #666;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s ease;
            }
            
            .modal-close:hover {
                background: #f7fafc;
                color: #333;
            }
            
            .modal-body {
                padding: 2rem;
                text-align: center;
            }
            
            .modal-icon {
                font-size: 3rem;
                color: #f39c12;
                margin-bottom: 1.5rem;
            }
            
            .modal-body h4 {
                margin: 0 0 1rem;
                color: #333;
                font-size: 1.3rem;
                font-weight: 600;
            }
            
            .modal-body p {
                margin: 0 0 1.5rem;
                color: #666;
                line-height: 1.6;
            }
            
            .coming-soon-note {
                background: #f8f9fa;
                padding: 1rem;
                border-radius: 8px;
                border-left: 4px solid #675032;
                font-size: 0.9rem;
            }
            
            .coming-soon-note i {
                color: #675032;
                margin-right: 0.5rem;
            }
            
            .coming-soon-note a {
                color: #675032;
                text-decoration: none;
                font-weight: 600;
            }
            
            .coming-soon-note a:hover {
                text-decoration: underline;
            }
            
            .modal-footer {
                padding: 1rem 2rem 2rem;
                text-align: center;
            }
            
            .modal-ok {
                padding: 0.75rem 2rem;
                font-size: 1rem;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideIn {
                from { 
                    opacity: 0;
                    transform: translateY(-50px) scale(0.9);
                }
                to { 
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            @media (max-width: 640px) {
                .modal-content {
                    margin: 1rem;
                    max-width: calc(100% - 2rem);
                }
                
                .modal-header, .modal-body, .modal-footer {
                    padding-left: 1.5rem;
                    padding-right: 1.5rem;
                }
            }
        `;

        // スタイルとモーダルを追加
        document.head.appendChild(style);
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // モーダルを閉じる処理
        function closeModal() {
            modal.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.head.removeChild(style);
                document.body.style.overflow = '';
            }, 300);
        }

        // イベントリスナー設定
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-ok').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', function(e) {
            if (e.target === this) closeModal();
        });

        // Escキーで閉じる
        const escKeyHandler = function(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escKeyHandler);
            }
        };
        document.addEventListener('keydown', escKeyHandler);
    }

    // フォームの基本バリデーション（Contactページ用）
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e53e3e';
                } else {
                    field.style.borderColor = '#e2e8f0';
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('必須項目を入力してください。');
            }
        });
    });

    // ページ読み込み時のアニメーション
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // ヒーローコンテンツのアニメーション
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'all 1.2s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
    });
});