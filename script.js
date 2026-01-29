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
//تابع باز و بسته کردن منو 
function toggleMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
}
function toggleMenu2() {
    document.getElementById("myDropdown2").classList.toggle("show");
}

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
reveal();

document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('stars-container');
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
document.addEventListener('DOMContentLoaded', function () {

    const elements = document.querySelectorAll('.fade-in-up');

    elements.forEach((element, index) => {

        setTimeout(() => {
            element.classList.add('active');
        }, index * 150);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('mainContainer');
    const formSection = document.getElementById('formSection');
    const successSection = document.getElementById('successSection');
    const form = document.getElementById('registerForm');

    // انیمیشن ورود صفحه
    setTimeout(() => {
        container.classList.add('active');
    }, 100);

    // مدیریت ارسال فرم
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        formSection.style.opacity = '0';
        formSection.style.transition = 'opacity 0.3s ease';

        setTimeout(() => {
            // نمایش پیام موفقیت
            formSection.classList.add('hidden');
            successSection.style.display = 'flex';

            successSection.animate([
                { transform: 'scale(0.8)', opacity: 0 },
                { transform: 'scale(1)', opacity: 1 }
            ], {
                duration: 400,
                easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            });

        }, 300);
    });
});

//ورود
document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('mainContainer');
    const formSection = document.getElementById('formSection');
    const successSection = document.getElementById('successSection');
    const form = document.getElementById('loginForm');

    // انیمیشن ورود صفحه
    setTimeout(() => {
        container.classList.add('active');
    }, 100);

    // مدیریت ارسال فرم
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        formSection.style.opacity = '0';
        formSection.style.transition = 'opacity 0.3s ease';

        setTimeout(() => {
            // نمایش پیام موفقیت
            formSection.classList.add('hidden');
            successSection.style.display = 'flex';

            successSection.animate([
                { transform: 'scale(0.8)', opacity: 0 },
                { transform: 'scale(1)', opacity: 1 }
            ], {
                duration: 400,
                easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            });

        }, 300);
    });
});

//ثبت نام
document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('mainContainer');
    const formSection = document.getElementById('formSection');
    const successSection = document.getElementById('successSection');
    const form = document.getElementById('registerForm');
    setTimeout(() => {
        container.classList.add('active');
    }, 100);

    // مدیریت ارسال فرم
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        formSection.style.opacity = '0';
        formSection.style.transition = 'opacity 0.3s ease';

        setTimeout(() => {
            formSection.classList.add('hidden');
            successSection.style.display = 'flex';

            successSection.animate([
                { transform: 'scale(0.8)', opacity: 0 },
                { transform: 'scale(1)', opacity: 1 }
            ], {
                duration: 400,
                easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            });

        }, 300);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const hamburgerBtn = document.getElementById('hamburgerBtn');

    const mainMenu = document.getElementById('mainMenu');
    const mainMenu1 = document.getElementById('mainMenu1');
    const mainMenu2 = document.getElementById('mainMenu2');

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function (e) {
            e.preventDefault();

            if (mainMenu) {
                mainMenu.classList.toggle('active');
            }
            if (mainMenu1) {
                mainMenu1.classList.toggle('active');
            }
            if (mainMenu2) {
                mainMenu2.classList.toggle('active');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchinput');
    const searchIcon = document.getElementById('search-icon');

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
