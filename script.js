
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

function closeAllMenus() {
    const menus = document.querySelectorAll('.menu.active, .menu1.active, .menu2.active');
    menus.forEach(menu => {
        menu.classList.remove('active');
    });
    

    const hamburgerBtn = document.getElementById('hamburgerBtn');
    if (hamburgerBtn) {
        hamburgerBtn.classList.remove('active');
    }
    
    const dropdowns = document.querySelectorAll('.dropdown-content.show, .dropdown-content2.show');
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('show');
    });
    
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
}


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
    

    allMenus.forEach(menu => {
        if (menu.contains(event.target) || menu === event.target) {
            isClickInsideMenu = true;
        }
    });
    

    dropdownContents.forEach(dropdown => {
        if (dropdown.contains(event.target) || dropdown === event.target) {
            isClickInsideDropdown = true;
        }
    });
    
  
    dropButtons.forEach(button => {
        if (button.contains(event.target) || button === event.target) {
            isClickOnDropdownButton = true;
        }
    });
    
    mobileTextLinks.forEach(link => {
        if (link.contains(event.target) || link === event.target) {
            isClickOnMobileLink = true;
        }
    });
    

    if (hamburger && hamburger.contains(event.target)) {
        return; 
    }
    

    if (!isClickInsideMenu && !isClickInsideDropdown && !isClickOnDropdownButton && !isClickOnMobileLink) {
        closeAllMenus();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            
    
            const mainMenu = document.getElementById('mainMenu');

            const mainMenu1 = document.getElementById('mainMenu1');
    
            const mainMenu2 = document.getElementById('mainMenu2');
            

            let activeMenu = null;
            if (mainMenu && document.body.contains(mainMenu)) {
                activeMenu = mainMenu;
            } else if (mainMenu1 && document.body.contains(mainMenu1)) {
                activeMenu = mainMenu1;
            } else if (mainMenu2 && document.body.contains(mainMenu2)) {
                activeMenu = mainMenu2;
            }
            
            if (activeMenu) {

                const isMenuOpen = activeMenu.classList.contains('active');
                closeAllMenus(); 
                
                if (!isMenuOpen) {
     
                    activeMenu.classList.add('active');
                    this.classList.add('active');
                    document.body.classList.add('menu-open');
                    document.body.style.overflow = 'hidden';
                } else {
     
                    document.body.classList.remove('menu-open');
                    document.body.style.overflow = '';
                }
            }
        });
    }
});

function toggleMenu() {
    const dropdown = document.getElementById("myDropdown");
    if (dropdown) {
        dropdown.classList.toggle("show");
    }
    
    const otherDropdowns = document.querySelectorAll('.dropdown-content2.show');
    otherDropdowns.forEach(other => {
        if (other !== dropdown) {
            other.classList.remove('show');
        }
    });
    
    if (event) event.stopPropagation();
}

function toggleMenu2() {
    const dropdown2 = document.getElementById("myDropdown2");
    if (dropdown2) {
        dropdown2.classList.toggle("show");
    }
    

    const otherDropdowns = document.querySelectorAll('.dropdown-content.show');
    otherDropdowns.forEach(other => {
        if (other !== dropdown2) {
            other.classList.remove('show');
        }
    });
    

    if (event) event.stopPropagation();
}
document.addEventListener('click', function(event) {
    if (window.innerWidth <= 1024) {
        const clickedLink = event.target.closest('.menu a, .menu1 a, .menu2 a, .dropdown-content a, .dropdown-content2 a');
        
        if (clickedLink) {

            if (clickedLink.getAttribute('href') && !clickedLink.getAttribute('href').startsWith('#')) {
    
                setTimeout(() => {
                    closeAllMenus();
                }, 300);
            } else if (clickedLink.getAttribute('href') && clickedLink.getAttribute('href').startsWith('#')) {
        
                setTimeout(() => {
                    closeAllMenus();
                }, 300);
            }
        }
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeAllMenus();
    }
});

let scrollTimeout;
window.addEventListener('scroll', function() {
    if (window.innerWidth <= 1024) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            closeAllMenus();
        }, 100);
    }
});

window.addEventListener('resize', function() {

    if (window.innerWidth > 1024) {
        closeAllMenus();
    }

    reveal();
});

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

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', reveal);
} else {
    reveal();
}

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

document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('.fade-in-up');

    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('active');
        }, index * 150);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchinput');
    const searchIcon = document.getElementById('search-icon');

    if (!searchInput || !searchIcon) return; 
    
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

document.addEventListener('DOMContentLoaded', function() {

    closeAllMenus();
});

class MusicPlayer {
    constructor() {
        this.playlist = [
            {
                id: 1,
                name: "سرود ملی",
                artist: "ساعد باقری",
                file: "musics/31.mp3",
                duration: "5:15"
            },
            {
                id: 2,
                name: "ایران جوان",
                artist: "سالار عقیلی",
                file: "musics/Salar Aghili - Irane Javan (320).mp3",
                duration: "4:30"
            },
            {
                id: 3,
                name: "وطنم",
                artist: "حجت اشرف‌زاده",
                file: "musics/Hojat Ashrafzade - Vatanam (128).mp3",
                duration: "3:45"
            },
         
            {
                 id: 4,
                name: "سپیده",
                artist: "محمدرضا شجریان",
                 file: "musics/MohammadReza Shajaryan - Sepide (128).mp3",
                 duration: "4:00"
             }
        ];
        
        this.currentIndex = 0;
        this.audio = new Audio();
        this.isPlaying = false;
        this.volume = 0.7;
        
        this.init();
    }
    
    init() {
        this.setupElements();
        this.setupEvents();
        this.renderPlaylist();
        this.updateSongCount();
    }
    
    setupElements() {
        this.elements = {
            musicToggle: document.getElementById('musicToggle'),
            musicPanel: document.getElementById('musicPanel'),
            panelClose: document.getElementById('panelClose'),
            trackTitle: document.getElementById('trackTitle'),
            trackArtist: document.getElementById('trackArtist'),
            playBtn: document.getElementById('playBtn'),
            prevBtn: document.getElementById('prevBtn'),
            nextBtn: document.getElementById('nextBtn'),
            playlist: document.getElementById('playlist'),
            songCount: document.getElementById('songCount'),
            volumeSlider: document.getElementById('volumeSlider'),
            volumeValue: document.getElementById('volumeValue'),
            volumeIcon: document.getElementById('volumeIcon')
        };
    }
    
    setupEvents() {

        this.elements.musicToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.togglePanel();
        });
        
        this.elements.panelClose.addEventListener('click', () => {
            this.hidePanel();
        });
        
        document.addEventListener('click', (e) => {
            if (!this.elements.musicPanel.contains(e.target) && 
                !this.elements.musicToggle.contains(e.target)) {
                this.hidePanel();
            }
        });
        
        this.elements.playBtn.addEventListener('click', () => this.togglePlay());
        this.elements.prevBtn.addEventListener('click', () => this.prevSong());
        this.elements.nextBtn.addEventListener('click', () => this.nextSong());
 
        this.elements.volumeSlider.addEventListener('input', (e) => {
            this.setVolume(e.target.value);
        });

        this.audio.addEventListener('play', () => this.onPlay());
        this.audio.addEventListener('pause', () => this.onPause());
        this.audio.addEventListener('ended', () => this.nextSong());
        this.audio.addEventListener('volumechange', () => this.updateVolumeIcon());
    }
    
    togglePanel() {
        this.elements.musicPanel.classList.toggle('show');
    }
    
    hidePanel() {
        this.elements.musicPanel.classList.remove('show');
    }
    
    renderPlaylist() {
        this.elements.playlist.innerHTML = '';
        
        this.playlist.forEach((song, index) => {
            const songItem = document.createElement('div');
            songItem.className = `song-item ${index === this.currentIndex ? 'playing' : ''}`;
            songItem.innerHTML = `
                <div class="song-index">${index + 1}</div>
                <div class="song-info">
                    <div class="song-name">${song.name}</div>
                    <div class="song-singer">${song.artist}</div>
                </div>
                <div class="song-duration">${song.duration}</div>
            `;
            
            songItem.addEventListener('click', () => this.playSong(index));
            this.elements.playlist.appendChild(songItem);
        });
    }
    
    updateSongCount() {
        this.elements.songCount.textContent = `${this.playlist.length} آهنگ`;
    }
    
    playSong(index) {
        if (index < 0 || index >= this.playlist.length) return;
        
        this.currentIndex = index;
        const song = this.playlist[index];
        
        this.elements.trackTitle.textContent = song.name;
        this.elements.trackArtist.textContent = song.artist;
        
        this.audio.src = song.file;
        this.audio.volume = this.volume;
        
        this.audio.play()
            .then(() => {
                this.isPlaying = true;
                this.updatePlayButton();
                this.renderPlaylist();
            })
            .catch(error => {
                console.error('خطا در پخش موسیقی:', error);
                alert(`خطا در پخش آهنگ:\n${song.file}\n\nمطمئن شوید فایل وجود دارد.`);
            });
    }
    
    togglePlay() {
        if (!this.audio.src) {

            this.playSong(0);
            return;
        }
        
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            this.audio.play();
        }
    }
    
    onPlay() {
        this.isPlaying = true;
        this.updatePlayButton();
    }
    
    onPause() {
        this.isPlaying = false;
        this.updatePlayButton();
    }
    
    updatePlayButton() {
        const playIcon = this.elements.playBtn.querySelector('.play-icon');
        const pauseIcon = this.elements.playBtn.querySelector('.pause-icon');
        
        if (this.isPlaying) {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }
    
    prevSong() {
        const prevIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
        this.playSong(prevIndex);
    }
    
    nextSong() {
        const nextIndex = (this.currentIndex + 1) % this.playlist.length;
        this.playSong(nextIndex);
    }
    
    setVolume(value) {
        this.volume = parseFloat(value);
        this.audio.volume = this.volume;
        this.elements.volumeValue.textContent = `${Math.round(this.volume * 100)}%`;
        this.updateVolumeIcon();
    }
    
    updateVolumeIcon() {
        if (this.volume === 0) {
            this.elements.volumeIcon.textContent = '🔇';
        } else if (this.volume < 0.3) {
            this.elements.volumeIcon.textContent = '🔈';
        } else if (this.volume < 0.7) {
            this.elements.volumeIcon.textContent = '🔉';
        } else {
            this.elements.volumeIcon.textContent = '🔊';
        }
    }
    
    addSong(name, artist, filePath, duration = "3:00") {
        const newSong = {
            id: this.playlist.length + 1,
            name: name,
            artist: artist,
            file: filePath,
            duration: duration
        };
        
        this.playlist.push(newSong);
        this.renderPlaylist();
        this.updateSongCount();
        
        console.log(`✅ آهنگ "${name}" اضافه شد`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.musicPlayer = new MusicPlayer();
  
});