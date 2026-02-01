// ==========================================================================
// モバイルメニュー
// ==========================================================================

const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// メニュー開閉
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// リンククリック時にメニューを閉じる
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ==========================================================================
// スクロール時のヘッダー効果
// ==========================================================================

const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ==========================================================================
// スムーススクロール
// ==========================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // ハッシュのみのリンク（#）は無視
        if (href === '#') {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================================================
// FAQアコーディオン
// ==========================================================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // クリックされたアイテムが既に開いているか確認
        const isActive = item.classList.contains('active');
        
        // 全てのFAQアイテムを閉じる
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });
        
        // クリックされたアイテムが開いていなければ開く
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ==========================================================================
// スクロールアニメーション（オプション）
// ==========================================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象の要素を選択
const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .use-case-card, .testimonial-card');

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==========================================================================
// ページ読み込み時のアニメーション
// ==========================================================================

window.addEventListener('load', () => {
    // ヒーローセクションのアニメーション
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
    
    if (heroImage) {
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'scale(0.95)';
        heroImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'scale(1)';
        }, 300);
    }
});

// ==========================================================================
// 外部リンクを新しいタブで開く
// ==========================================================================

document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.getAttribute('target')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// ==========================================================================
// スクロール位置の復元を防ぐ（リロード時に常にトップから）
// ==========================================================================

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// ==========================================================================
// ローディング完了後のスムーズな表示
// ==========================================================================

document.documentElement.style.scrollBehavior = 'smooth';

// ==========================================================================
// カスタムカーソル効果（オプション - デスクトップのみ）
// ==========================================================================

if (window.innerWidth > 768) {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
}

// ==========================================================================
// 現在のセクションをハイライト（ナビゲーション）
// ==========================================================================

const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            // 全てのナビリンクから active クラスを削除
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active-section');
            });
            
            // 現在のセクションに対応するナビリンクに active クラスを追加
            if (navLink) {
                navLink.classList.add('active-section');
            }
        }
    });
}

// スクロールイベントでナビゲーションをハイライト
window.addEventListener('scroll', highlightNavigation);

// ページ読み込み時にもハイライトを適用
document.addEventListener('DOMContentLoaded', highlightNavigation);

// ==========================================================================
// パフォーマンス最適化: スクロールイベントのデバウンス
// ==========================================================================

function debounce(func, wait = 10) {
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

// デバウンスされたスクロールハンドラー
const debouncedScrollHandler = debounce(() => {
    highlightNavigation();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ==========================================================================
// コンソールメッセージ
// ==========================================================================

console.log('%c在庫管理システム', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%c開発者の方へ: このサイトをご覧いただきありがとうございます！', 'color: #764ba2; font-size: 14px;');
console.log('%cお問い合わせ: https://note.com/webapp0104', 'color: #6b7280; font-size: 12px;');
