// تابع اسلاید برای کارت‌ها
function slide(buttonElement, direction) {
    const wrapper = buttonElement.closest('.slider-wrapper');
    if (!wrapper) return;

    const slider = wrapper.querySelector('.card-container');
    if (!slider) return;
    
    const CARD_SCROLL_AMOUNT = 294;
    const scrollAmount = direction * CARD_SCROLL_AMOUNT;

    slider.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
    });
}

// Intersection Observer برای انیمیشن‌ها
document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.anim-base');
    animatedElements.forEach((el) => observer.observe(el));
});

// ---------- مدیریت منوها ----------
// تابع برای بستن همه منوهای باز
function closeAllMenus() {
    // بستن منوهای اصلی (همه صفحات)
    const menus = document.querySelectorAll('.menu.active, .menu1.active, .menu2.active');
    menus.forEach(menu => {
        menu.classList.remove('active');
    });
    
    // بستن هامبورگر
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    if (hamburgerBtn) {
        hamburgerBtn.classList.remove('active');
    }
    
    // بستن دراپ‌داون‌ها (دسکتاپ)
    const dropdowns = document.querySelectorAll('.dropdown-content.show, .dropdown-content2.show');
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('show');
    });
    
    // حذف کلاس menu-open از body و بازگرداندن اسکرول
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
}

// مدیریت کلیک بیرون از منو برای همه دستگاه‌ها
document.addEventListener('click', function(event) {
    const hamburger = document.querySelector('.hamburger');
    const allMenus = document.querySelectorAll('.menu, .menu1, .menu2');
    const dropdownContents = document.querySelectorAll('.dropdown-content, .dropdown-content2');
    const dropButtons = document.querySelectorAll('.dropbtn, .dropbtn2');
    const mobileTextLinks = document.querySelectorAll('.mobile-text a');
    
    let isClickInsideMenu = false;
    let isClickInsideDropdown = false;
    let isClickOnDropdownButton = false;
    let isClickOnMobileLink = false;
    
    // بررسی کلیک روی منوهای موبایل (همه انواع منو)
    allMenus.forEach(menu => {
        if (menu.contains(event.target) || menu === event.target) {
            isClickInsideMenu = true;
        }
    });
    
    // بررسی کلیک روی دراپ‌داون‌ها
    dropdownContents.forEach(dropdown => {
        if (dropdown.contains(event.target) || dropdown === event.target) {
            isClickInsideDropdown = true;
        }
    });
    
    // بررسی کلیک روی دکمه‌های دراپ‌داون
    dropButtons.forEach(button => {
        if (button.contains(event.target) || button === event.target) {
            isClickOnDropdownButton = true;
        }
    });
    
    // بررسی کلیک روی لینک‌های داخل mobile-text
    mobileTextLinks.forEach(link => {
        if (link.contains(event.target) || link === event.target) {
            isClickOnMobileLink = true;
        }
    });
    
    // بررسی کلیک روی هامبورگر
    if (hamburger && hamburger.contains(event.target)) {
        return; // اگر روی هامبورگر کلیک شده، کاری نکن
    }
    
    // اگر کلیک بیرون از همه منوها و دراپ‌داون‌ها و لینک‌های mobile-text بود
    if (!isClickInsideMenu && !isClickInsideDropdown && !isClickOnDropdownButton && !isClickOnMobileLink) {
        closeAllMenus();
    }
});

// مدیریت کلیک روی هامبورگر (برای همه صفحات)
document.addEventListener('DOMContentLoaded', function () {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            
            // برای صفحه اصلی
            const mainMenu = document.getElementById('mainMenu');
            // برای صفحه about
            const mainMenu1 = document.getElementById('mainMenu1');
            // برای سایر صفحات
            const mainMenu2 = document.getElementById('mainMenu2');
            
            // پیدا کردن منوی فعال در این صفحه
            let activeMenu = null;
            if (mainMenu && document.body.contains(mainMenu)) {
                activeMenu = mainMenu;
            } else if (mainMenu1 && document.body.contains(mainMenu1)) {
                activeMenu = mainMenu1;
            } else if (mainMenu2 && document.body.contains(mainMenu2)) {
                activeMenu = mainMenu2;
            }
            
            if (activeMenu) {
                // اگر منو باز است، ببندیم؛ اگر بسته است، باز کنیم
                const isMenuOpen = activeMenu.classList.contains('active');
                closeAllMenus(); // ابتدا همه منوها را ببندیم
                
                if (!isMenuOpen) {
                    // اگر منو بسته بود، آن را باز کنیم
                    activeMenu.classList.add('active');
                    this.classList.add('active');
                    document.body.classList.add('menu-open');
                    document.body.style.overflow = 'hidden';
                } else {
                    // اگر منو باز بود، قبلاً با closeAllMenus بسته شده است
                    document.body.classList.remove('menu-open');
                    document.body.style.overflow = '';
                }
            }
        });
    }
});

// توابع باز و بسته کردن منوهای دراپ‌داون (دسکتاپ)
function toggleMenu() {
    const dropdown = document.getElementById("myDropdown");
    if (dropdown) {
        dropdown.classList.toggle("show");
    }
    
    // بستن سایر دراپ‌داون‌های باز
    const otherDropdowns = document.querySelectorAll('.dropdown-content2.show');
    otherDropdowns.forEach(other => {
        if (other !== dropdown) {
            other.classList.remove('show');
        }
    });
    
    // جلوگیری از انتشار رویداد (برای mobile-text)
    if (event) event.stopPropagation();
}

function toggleMenu2() {
    const dropdown2 = document.getElementById("myDropdown2");
    if (dropdown2) {
        dropdown2.classList.toggle("show");
    }
    
    // بستن سایر دراپ‌داون‌های باز
    const otherDropdowns = document.querySelectorAll('.dropdown-content.show');
    otherDropdowns.forEach(other => {
        if (other !== dropdown2) {
            other.classList.remove('show');
        }
    });
    
    // جلوگیری از انتشار رویداد (برای mobile-text)
    if (event) event.stopPropagation();
}

// مدیریت کلیک روی لینک‌های داخل منو در موبایل
document.addEventListener('click', function(event) {
    // اگر روی لینک داخل منو کلیک شد و در موبایل هستیم
    if (window.innerWidth <= 1024) {
        // بررسی کلیک روی هر نوع لینک داخل منوها
        const clickedLink = event.target.closest('.menu a, .menu1 a, .menu2 a, .dropdown-content a, .dropdown-content2 a');
        
        if (clickedLink) {
            // فقط اگر لینک href معتبر دارد
            if (clickedLink.getAttribute('href') && !clickedLink.getAttribute('href').startsWith('#')) {
                // تاخیر کوتاه برای نمایش انیمیشن بسته شدن
                setTimeout(() => {
                    closeAllMenus();
                }, 300);
            } else if (clickedLink.getAttribute('href') && clickedLink.getAttribute('href').startsWith('#')) {
                // اگر لینک داخلی (به قسمت‌های همان صفحه) است
                setTimeout(() => {
                    closeAllMenus();
                }, 300);
            }
        }
    }
});

// بستن منوها با کلید Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeAllMenus();
    }
});

// بستن منو هنگام اسکرول (برای موبایل)
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (window.innerWidth <= 1024) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            closeAllMenus();
        }, 100);
    }
});

// مدیریت تغییر اندازه ویندو
window.addEventListener('resize', function() {
    // اگر از موبایل به دسکتاپ تغییر اندازه دادیم، منوهای موبایل را ببندیم
    if (window.innerWidth > 1024) {
        closeAllMenus();
    }
    
    // اجرای مجدد تابع reveal برای تنظیم مجدد انیمیشن‌ها
    reveal();
});

// ---------- انیمیشن reveal ----------
window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++) {
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}
// اجرای اولیه
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', reveal);
} else {
    reveal();
}

// ---------- ستاره‌های متحرک ----------
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('stars-container');
    if (!container) return;
    
    const starCount = 90;

    for (let i = 0; i < starCount; i++) {
        createStar();
    }

    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');

        const size = Math.random() * 2 + 2;
        star.style.width = size + 'px';
        star.style.height = size + 'px';

        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';

        const delay = Math.random() * 5;
        star.style.animationDelay = delay + 's';

        const duration = Math.random() * 3 + 3;
        star.style.animationDuration = duration + 's';

        container.appendChild(star);
    }
});

// ---------- انیمیشن fade-in-up ----------
document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('.fade-in-up');

    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('active');
        }, index * 150);
    });
});

// ---------- جستجو ----------
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchinput');
    const searchIcon = document.getElementById('search-icon');

    if (!searchInput || !searchIcon) return; // اگر در صفحه about نباشیم
    
    const bookmarks = {
        "تخت جمشید": "city.html#takht",
        "چغازنبیل": "city.html#chogazanbil",
        "آسیاب های آبی شوش": "city.html#asyab",
        "میدان نقش جهان": "city.html#nahshjahan",
        "تخت سلیمان": "city.html#takhtsolyman",
        "ارگ بم": "city.html#bam",
        "پاسارگاد": "city.html#pasargad",
        "رجب و نقش رستم": "city.html#rajab",
        "گنبد سلطانیه": "city.html#soltaniyeh",
        "بیستون": "city.html#biston",
        "آرامگاه شیخ صفی": "city.html#safi",
        "باغ شازده ماهان": "city.html#bagshazdeh",
        "مسجد جامع اصفهان": "city.html#masjedjame",
        "برج گنبد کاووس": "city.html#kavos",
        "کاخ گلستان": "city.html#googleapis",
        "فیروز آباد فارس": "city.html#firozabad",
        "جنگل های هیرکانی": "city.html#jangel",
        "اورامانت": "city.html#oramant",
        "شهر سوخته": "city.html#sokhte",
        "میمند ": "city.html#mimand"
    };

    function performSearch() {
        const query = searchInput.value.trim();
        if (!query) return;

        let foundLink = null;

        for (let key in bookmarks) {
            if (query.includes(key)) {
                foundLink = bookmarks[key];
                break;
            }
        }

        if (foundLink) {
            window.location.href = foundLink;
        } else {
            alert("موردی یافت نشد.");
        }
    }

    if (searchIcon) {
        searchIcon.addEventListener('click', performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
});

// ---------- اسلایدشوی درباره ما ----------
document.addEventListener('DOMContentLoaded', function () {
    const slideshowContainer = document.querySelector('.mission .slideshow-container');

    if (slideshowContainer) {
        let slideIndex = 0;
        const slides = slideshowContainer.getElementsByClassName('about-slide');
        const dots = slideshowContainer.getElementsByClassName('dot');

        function showSlides() {
            for (let i = 0; i < slides.length; i++) {
                if (slides[i]) {
                    slides[i].style.display = 'none';
                }
            }

            slideIndex++;
            if (slideIndex > slides.length) {
                slideIndex = 1;
            }

            for (let i = 0; i < dots.length; i++) {
                if (dots[i]) {
                    dots[i].className = dots[i].className.replace(' active', '');
                }
            }

            if (slides[slideIndex - 1]) {
                slides[slideIndex - 1].style.display = 'block';
                if (dots[slideIndex - 1]) {
                    dots[slideIndex - 1].className += ' active';
                }
            }

            setTimeout(showSlides, 4000);
        }

        if (slides.length > 0) {
            showSlides();
        }

        window.currentSlide = function (n) {
            slideIndex = n - 1;
            showSlides();
        };
    }
});

// ---------- فرم نظر سنجی ----------
document.addEventListener('DOMContentLoaded', function () {
    const surveyBtn = document.getElementById("surveyBtn");
    const surveyModal = document.getElementById("surveyModal");
    const closeBtn = document.querySelector(".close-btn");
    const toast = document.getElementById("thankYouToast");

    if (surveyBtn && surveyModal) {
        surveyBtn.onclick = (e) => {
            e.preventDefault();
            surveyModal.style.display = "block";
        };
    }

    if (closeBtn) {
        closeBtn.onclick = () => {
            if (surveyModal) surveyModal.style.display = "none";
        };
    }

    window.onclick = e => {
        if (e.target === surveyModal) {
            surveyModal.style.display = "none";
        }
    };

    const surveyForm = document.getElementById("surveyForm");
    if (surveyForm) {
        surveyForm.onsubmit = e => {
            e.preventDefault();
            if (surveyModal) surveyModal.style.display = "none";

            if (toast) {
                toast.classList.add("show");
                setTimeout(() => toast.classList.remove("show"), 3000);
            }

            e.target.reset();
        };
    }
});

// مقداردهی اولیه
document.addEventListener('DOMContentLoaded', function() {
    // بستن منوها در ابتدا
    closeAllMenus();
});