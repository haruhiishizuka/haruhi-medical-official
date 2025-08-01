// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
    
    // ハンバーガーメニューの処理
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
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

    // 外部リンクの処理
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
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
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
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