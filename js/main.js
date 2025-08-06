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
    
    console.log('Hamburger:', hamburger);
    console.log('NavMenu:', navMenu);
    
    if (hamburger && navMenu) {
        console.log('ハンバーガーメニューの要素が見つかりました');
        
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('ハンバーガーメニューがクリックされました');
            
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            console.log('Nav menu active:', navMenu.classList.contains('active'));
            console.log('Hamburger active:', hamburger.classList.contains('active'));
        });

        // メニュー項目クリック時にメニューを閉じる
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                console.log('メニューリンクがクリックされました');
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    } else {
        console.log('ハンバーガーメニューの要素が見つかりません');
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

    // ヒーローセクションのタブ切り替え
    const heroTabs = document.querySelectorAll('.hero-tab');

    heroTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // タブのアクティブ状態を切り替え
            heroTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
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

    // 数字カウントアップアニメーション
    function countUp(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCount() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = target;
            }
        }
        updateCount();
    }

    // 実績セクションのカウントアップ
    const achievementNumbers = document.querySelectorAll('.achievement-number');
    const achievementsSection = document.querySelector('.achievements');
    
    if (achievementsSection) {
        const achievementsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    achievementNumbers.forEach(number => {
                        const target = parseInt(number.getAttribute('data-target'));
                        countUp(number, target);
                    });
                    achievementsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        achievementsObserver.observe(achievementsSection);
    }

    // お客様の声スライダー
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    function showSlide(index) {
        testimonialItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialItems.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonialItems.length) % testimonialItems.length;
        showSlide(currentSlide);
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // 自動スライド（5秒間隔）
    setInterval(nextSlide, 5000);

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

    // スクロール時のアニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // アニメーション対象要素を監視
    const animateElements = document.querySelectorAll(
        '.service-category, .news-card, .achievement-item, .testimonial-content'
    );
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // ヘッダーのスクロール時の背景変更
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });

    // カードホバーエフェクト
    const cards = document.querySelectorAll('.service-category, .news-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
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

    // ユーティリティ関数
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // リサイズ時の処理
    const handleResize = debounce(function() {
        // モバイル表示時にメニューを閉じる
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }, 250);

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

        // フェードアウトアニメーション追加
        const fadeOutStyle = document.createElement('style');
        fadeOutStyle.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(fadeOutStyle);
    }

    // 外部リンクの処理（MediMatch以外）
    const otherExternalLinks = document.querySelectorAll('a[target="_blank"]:not(.medimatch-btn):not([href*="medimatch.jp"])');
    otherExternalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 外部リンクの確認
            if (this.hostname !== window.location.hostname) {
                e.preventDefault();
                if (confirm('外部サイトに移動します。よろしいですか？')) {
                    window.open(this.href, '_blank', 'noopener,noreferrer');
                }
            }
        });
    });

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

    // パフォーマンス最適化：画像の遅延読み込み
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                    }
                    if (img.loading === 'lazy') {
                        img.classList.add('loaded');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        // data-src を使う遅延読み込み画像
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
        
        // loading="lazy" を使う画像
        const lazyLoadingImages = document.querySelectorAll('img[loading="lazy"]');
        lazyLoadingImages.forEach(img => imageObserver.observe(img));
    } else {
        // IntersectionObserverをサポートしていない場合のフォールバック
        const lazyLoadingImages = document.querySelectorAll('img[loading="lazy"]');
        lazyLoadingImages.forEach(img => img.classList.add('loaded'));
    }

    // スクロールトップボタン（必要に応じて追加）
    function createScrollTopButton() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollBtn.className = 'scroll-top-btn';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            z-index: 1000;
            opacity: 0;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        document.body.appendChild(scrollBtn);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // スクロールトップボタンを有効にする場合はコメントアウト
    // createScrollTopButton();
});