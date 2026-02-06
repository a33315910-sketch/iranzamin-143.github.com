document.addEventListener("DOMContentLoaded", function () {
    console.log("صفحه بارگذاری شد");

    const showLoginLink = document.getElementById('show-login');
    const showSignupLink = document.getElementById('show-signup');
    const signupContainer = document.getElementById('signup-container');
    const loginContainer = document.getElementById('login-container');
    const welcomeBack = document.getElementById('welcome-back');
    const gameContainer = document.getElementById('game-container');
    const resultContainer = document.getElementById('result-container');
    const sidePanel = document.getElementById('side-panel');
    const lockIcon = document.getElementById('lock-icon');

    const savedUser = JSON.parse(localStorage.getItem('iranTourUser'));

    if (savedUser) {
        showWelcomeScreen(savedUser);
    } else {
        showSignupForm();
    }

    if (showLoginLink) {
        showLoginLink.addEventListener('click', function (e) {
            e.preventDefault();
            console.log("روی 'وارد شوید' کلیک شد");
            showLoginForm();
        });
    }
    if (showSignupLink) {
        showSignupLink.addEventListener('click', function (e) {
            e.preventDefault();
            console.log("روی 'ثبت‌نام کنید' کلیک شد");
            showSignupForm();
        });
    }

    function showSignupForm() {
        hideAllSections();
        signupContainer.classList.remove('hidden');
        sidePanel.classList.add('locked');
        lockIcon.innerHTML = '<i class="fas fa-lock"></i>';
    }

    function showLoginForm() {
        hideAllSections();
        loginContainer.classList.remove('hidden');
        sidePanel.classList.add('locked');
        lockIcon.innerHTML = '<i class="fas fa-lock"></i>';
    }
    function showWelcomeScreen(user) {
        hideAllSections();
        welcomeBack.classList.remove('hidden');

        document.getElementById('welcome-stats').textContent =
            `تعداد بازی‌های شما: ${user.gamesPlayed || 0}`;
        updateSidePanel(user);
        sidePanel.classList.remove('locked');
        lockIcon.innerHTML = '<i class="fas fa-unlock"></i>';
    }

    function updateSidePanel(user) {
        if (user) {
            document.getElementById('guest-info').style.display = 'none';
            const userStats = document.getElementById('user-stats');
            userStats.style.display = 'block';

            document.getElementById('user-name').textContent = user.name;
            document.getElementById('games-played').textContent = user.gamesPlayed || 0;
        } else {
            document.getElementById('guest-info').style.display = 'block';
            document.getElementById('user-stats').style.display = 'none';
        }
    }

    function hideAllSections() {
        signupContainer.classList.add('hidden');
        loginContainer.classList.add('hidden');
        welcomeBack.classList.add('hidden');
        gameContainer.classList.add('hidden');
        resultContainer.classList.add('hidden');
    }


    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            console.log("فرم ثبت‌نام ارسال شد");

            const name = document.getElementById('signup-name').value.trim();
            const email = document.getElementById('signup-email').value.trim();
            const password = document.getElementById('signup-password').value;

            if (!name || !email || !password) {
                showMessage("لطفاً همه فیلدها را پر کنید", "error");
                return;
            }

            if (password.length < 6) {
                showMessage("رمز عبور باید حداقل 6 کاراکتر باشد", "error");
                return;
            }

            const user = {
                name: name,
                email: email,
                password: password,
                gamesPlayed: 0,
                registeredAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };
            localStorage.setItem('iranTourUser', JSON.stringify(user));

            showMessage("ثبت‌نام موفق! در حال انتقال به بازی...", "success");

            setTimeout(() => {
                showWelcomeScreen(user);
                createStars();
                createConfetti();
            }, 1500);
        });
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            console.log("فرم ورود ارسال شد");

            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;

            if (!email || !password) {
                showMessage("لطفاً ایمیل و رمز عبور را وارد کنید", "error");
                return;
            }

            const savedUser = JSON.parse(localStorage.getItem('iranTourUser'));

            if (!savedUser) {
                showMessage("کاربری با این ایمیل یافت نشد. لطفاً ثبت‌نام کنید.", "error");
                setTimeout(() => showSignupLink.click(), 2000);
                return;
            }

            if (savedUser.email === email && savedUser.password === password) {
                savedUser.lastLogin = new Date().toISOString();
                localStorage.setItem('iranTourUser', JSON.stringify(savedUser));


                showMessage("ورود موفق! خوش آمدید", "success");


                setTimeout(() => {
                    showWelcomeScreen(savedUser);
                    createStars();
                }, 1500);
            } else {
                showMessage("ایمیل یا رمز عبور اشتباه است", "error");
            }
        });
    }

    const startGameBtn = document.getElementById('start-game-btn');
    if (startGameBtn) {
        startGameBtn.addEventListener('click', function () {
            hideAllSections();
            gameContainer.classList.remove('hidden');
            startNewGame();
        });
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            localStorage.removeItem('iranTourUser');

            showMessage("با موفقیت خارج شدید", "info");

            setTimeout(() => {
                showSignupForm();
            }, 1500);
        });
    }

    const profileBtn = document.getElementById('profile-btn');
    if (profileBtn) {
        profileBtn.addEventListener('click', function () {
            const user = JSON.parse(localStorage.getItem('iranTourUser'));
            if (user) {
                const regDate = user.registeredAt ? new Date(user.registeredAt).toLocaleDateString('fa-IR') : 'نامشخص';
                const lastLogin = user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('fa-IR') : 'نامشخص';

                let badge = "مسافر تازه‌کار";
                let badgeIcon = "fas fa-user";
                let badgeColor = "#4CAF50";

                if (user.highScore >= 100) {
                    badge = "ایران‌شناس برتر";
                    badgeIcon = "fas fa-crown";
                    badgeColor = "#FFD700";
                } else if (user.highScore >= 80) {
                    badge = "ایران‌شناس";
                    badgeIcon = "fas fa-award";
                    badgeColor = "#2196F3";
                } else if (user.highScore >= 60) {
                    badge = "مسافر حرفه‌ای";
                    badgeIcon = "fas fa-medal";
                    badgeColor = "#9C27B0";
                }

                const userName = user.name;
                const userInitial = userName.charAt(0);

                const levels = ["تازه‌کار", "مسافر", "جهانگرد", "ماجراجو", "اکتشاف‌گر", "ایران‌شناس"];
                const userLevel = levels[Math.min(Math.floor((user.gamesPlayed || 0) / 2), levels.length - 1)];

                const provincesVisited = Math.min(31, Math.floor((user.gamesPlayed || 0) * 6.2));

                const joinDate = user.registeredAt ? new Date(user.registeredAt) : new Date();
                const today = new Date();
                const daysActive = Math.floor((today - joinDate) / (1000 * 60 * 60 * 24));

                const socialScore = Math.floor(Math.random() * 100) + 50;

                const friendsCount = Math.min(999, Math.floor(daysActive * 1.5) + 5);

                const postsCount = (user.gamesPlayed || 0) * 3 + 10;

                const interests = {
                    'آ': ['آثار تاریخی', 'آشپزی', 'آهنگ‌های محلی'],
                    'ا': ['اماکن تفریحی', 'اصفهان‌گردی', 'اکوتوریسم'],
                    'ب': ['بناهای قدیمی', 'بازارهای سنتی', 'برنامه‌ریزی سفر'],
                    'ج': ['جاذبه‌های طبیعی', 'جشن‌های محلی', 'جهانگردی'],
                    'ح': ['حفاظت از محیط زیست', 'حرفه‌ای سفر کردن', 'حکایت‌های قدیمی'],
                    'خ': ['خلیج‌فارس', 'خوراکی‌های محلی', 'خاطره‌نویسی سفر'],
                    'د': ['دنیای ناشناخته', 'دوست‌یابی در سفر', 'دریاچه‌ها'],
                    'س': ['سفرنامه‌نویسی', 'سواحل جنوب', 'صنایع دستی'],
                    'ش': ['شهرهای تاریخی', 'شیرازگردی', 'شب‌بیداری در سفر'],
                    'ع': ['عکاسی', 'عشایر ایران', 'عجایب ایران'],
                    'ف': ['فرهنگ ایرانی', 'فلات ایران', 'فصل‌های سفر'],
                    'ک': ['کوهنوردی', 'کاروانسراها', 'کشف ناشناخته‌ها'],
                    'م': ['موزه‌گردی', 'معماری ایرانی', 'ماجراجویی'],
                    'ن': ['نقشه‌خوانی', 'نواحی مرزی', 'نوگرایی در سفر'],
                    'ه': ['هویت ایرانی', 'همسفر‌یابی', 'هنرهای سنتی'],
                    'ی': ['یادگیری زبان‌ها', 'ییلاق‌گردی', 'یادگاری‌های سفر']
                };


                Swal.fire({
                    title: `<div style="color: rgba(198, 218, 255, 0.95); font-size: 24px; margin-bottom: 10px;">
                          <i class="fas fa-user-circle"></i> پروفایل کاربری
                        </div>`,
                    html: `
                    <div style="text-align: center; padding: 20px;">
                        <div style="margin-bottom: 25px;">
                            <div style="width: 100px; height: 100px; background: linear-gradient(135deg, ${badgeColor}30, rgba(255, 255, 255, 0.2)); 
                                     border-radius: 50%; display: flex; align-items: center; justify-content: center; 
                                     margin: 0 auto 15px; border: 3px solid ${badgeColor}70; position: relative;">
                                <i class="${badgeIcon}" style="font-size: 42px; color: ${badgeColor};"></i>
                                <div style="position: absolute; bottom: -5px; right: -5px; background: ${badgeColor}; 
                                         color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; 
                                         align-items: center; justify-content: center; font-size: 14px; font-weight: bold;">
                                    ${userInitial}
                                </div>
                            </div>
                            <div style="font-size: 24px; color: rgba(198, 218, 255, 0.95); font-weight: bold; margin-bottom: 5px;">
                                ${user.name}
                            </div>
                            <div style="color: rgba(255, 255, 255, 0.7); font-size: 14px; margin-bottom: 15px;">
                                <i class="fas fa-envelope"></i> ${user.email}
                            </div>
                            <div style="display: flex; justify-content: center; gap: 10px; margin-bottom: 20px;">
                                <div style="display: inline-block; background: ${badgeColor}20; color: ${badgeColor}; 
                                         padding: 8px 18px; border-radius: 20px; font-size: 14px; font-weight: bold; 
                                         border: 1px solid ${badgeColor}40; backdrop-filter: blur(5px);">
                                    <i class="${badgeIcon}"></i> ${badge}
                                </div>
                                <div style="display: inline-block; background: rgba(255, 255, 255, 0.1); color: rgba(255, 255, 255, 0.9); 
                                         padding: 8px 18px; border-radius: 20px; font-size: 14px; font-weight: bold; 
                                         border: 1px solid rgba(255, 255, 255, 0.2); backdrop-filter: blur(5px);">
                                    <i class="fas fa-star"></i> سطح ${userLevel}
                                </div>
                            </div>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 25px;">
                            <div style="background: rgba(255, 255, 255, 0.08); border-radius: 15px; padding: 20px; 
                                        border: 1px solid rgba(255, 255, 255, 0.1); transition: all 0.3s;">
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div style="width: 45px; height: 45px; background: linear-gradient(135deg, #4CAF5030, #4CAF5010); 
                                             border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                                        <i class="fas fa-gamepad" style="color: #4CAF50; font-size: 20px;"></i>
                                    </div>
                                    <div style="flex: 1;">
                                        <div style="font-size: 17px; color: rgba(255, 255, 255, 0.7);">تعداد بازی‌ها</div>
                                        <div style="font-size: 22px; font-weight: bold; color: rgba(198, 218, 255, 0.95);">
                                            ${user.gamesPlayed || 0}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div style="background: rgba(255, 255, 255, 0.08); border-radius: 15px; padding: 20px; 
                                        border: 1px solid rgba(255, 255, 255, 0.1); transition: all 0.3s;">
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div style="width: 45px; height: 45px; background: linear-gradient(135deg, #2196F330, #2196F310); 
                                             border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                                        <i class="fas fa-map-marked-alt" style="color: #2196F3; font-size: 20px;"></i>
                                    </div>
                                    <div style="flex: 1;">
                                        <div style="font-size: 17px; color: rgba(255, 255, 255, 0.7);">استان‌های بازدید شده</div>
                                        <div style="font-size: 22px; font-weight: bold; color: rgba(198, 218, 255, 0.95);">
                                            ${provincesVisited}/31
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div style="background: rgba(255, 255, 255, 0.08); border-radius: 15px; padding: 20px; 
                                        border: 1px solid rgba(255, 255, 255, 0.1); transition: all 0.3s;">
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div style="width: 45px; height: 45px; background: linear-gradient(135deg, #9C27B030, #9C27B010); 
                                             border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                                        <i class="fas fa-calendar-alt" style="color: #9C27B0; font-size: 20px;"></i>
                                    </div>
                                    <div style="flex: 1;">
                                        <div style="font-size: 17px; color: rgba(255, 255, 255, 0.7);">روزهای فعالیت</div>
                                        <div style="font-size: 22px; font-weight: bold; color: rgba(198, 218, 255, 0.95);">
                                            ${daysActive > 0 ? daysActive : 'امروز'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div style="background: rgba(255, 255, 255, 0.08); border-radius: 15px; padding: 20px; 
                                        border: 1px solid rgba(255, 255, 255, 0.1); transition: all 0.3s;">
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div style="width: 45px; height: 45px; background: linear-gradient(135deg, #FF980030, #FF980010); 
                                             border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                                        <i class="fas fa-users" style="color: #FF9800; font-size: 20px;"></i>
                                    </div>
                                    <div style="flex: 1;">
                                        <div style="font-size: 17px; color: rgba(255, 255, 255, 0.7);">امتیاز اجتماعی</div>
                                        <div style="font-size: 22px; font-weight: bold; color: rgba(198, 218, 255, 0.95);">
                                            ${socialScore}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div style="background: rgba(255, 255, 255, 0.05); border-radius: 15px; padding: 20px; 
                                    margin-bottom: 20px; border: 1px solid rgba(255, 255, 255, 0.1);">
                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px;">
                                <div style="font-size: 16px; color: rgba(198, 218, 255, 0.95); font-weight: bold;">
                                    <i class="fas fa-info-circle" style="margin-left: 8px;"></i> اطلاعات حساب
                                </div>
                            </div>
                            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                                <div style="display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(255, 255, 255, 0.05); 
                                         border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.05);">
                                    <i class="fas fa-calendar-plus" style="color: rgba(255, 255, 255, 0.7); font-size: 16px;"></i>
                                    <div>
                                        <div style="font-size: 17px; color: rgba(255, 255, 255, 0.6);">عضویت از</div>
                                        <div style="font-size: 14px; color: rgba(255, 255, 255, 0.9); font-weight: bold;">${regDate}</div>
                                    </div>
                                </div>
                                
                                <div style="display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(255, 255, 255, 0.05); 
                                         border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.05);">
                                    <i class="fas fa-sign-in-alt" style="color: rgba(255, 255, 255, 0.7); font-size: 16px;"></i>
                                    <div>
                                        <div style="font-size: 17px; color: rgba(255, 255, 255, 0.6);">آخرین ورود</div>
                                        <div style="font-size: 14px; color: rgba(255, 255, 255, 0.9); font-weight: bold;">${lastLogin}</div>
                                    </div>
                                </div>
                                
                            
                `,
                    width: '600px',
                    background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.98), rgba(34, 34, 59, 0.98))',
                    color: 'white',
                    showCloseButton: true,
                    showConfirmButton: false,
                    customClass: {
                        popup: 'custom-swal-popup',
                        closeButton: 'custom-swal-close-btn'
                    },
                    didOpen: () => {
                        const closeBtn = document.querySelector('.swal2-close');
                        if (closeBtn) {
                            closeBtn.style.color = 'rgba(255, 255, 255, 0.8)';
                            closeBtn.style.fontSize = '24px';
                            closeBtn.style.transition = 'all 0.3s';
                            closeBtn.addEventListener('mouseover', () => {
                                closeBtn.style.color = 'white';
                                closeBtn.style.transform = 'rotate(90deg)';
                            });
                            closeBtn.addEventListener('mouseout', () => {
                                closeBtn.style.color = 'rgba(255, 255, 255, 0.8)';
                                closeBtn.style.transform = 'rotate(0deg)';
                            });
                        }

                        const cards = document.querySelectorAll('[style*="transition: all 0.3s"]');
                        cards.forEach(card => {
                            card.addEventListener('mouseenter', () => {
                                card.style.transform = 'translateY(-5px)';
                                card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
                            });
                            card.addEventListener('mouseleave', () => {
                                card.style.transform = 'translateY(0)';
                                card.style.boxShadow = 'none';
                            });
                        });
                    }
                });
            }
        });
    }

    function showMessage(text, type) {
        const oldMessage = document.querySelector('.message');
        if (oldMessage) oldMessage.remove();

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;

        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'error') icon = 'exclamation-circle';

        messageDiv.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${text}</span>
        `;

        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 300);
        }, 3000);
    }

    let currentGame = {
        score: 0,
        currentQuestion: 0,
        timeLeft: 30,
        timer: null,
        questions: [],
        answered: false
    };

    const gameQuestions = [
        {
            question: "تخت جمشید در کدام استان ایران قرار دارد؟",
            options: ["فارس", "اصفهان", "خراسان رضوی", "کرمان"],
            correct: 0,
            explanation: "تخت جمشید در استان فارس و شهر مرودشت قرار دارد."
        },
        {
            question: "بلندترین قله ایران چیست؟",
            options: ["دماوند", "سبلان", "سهند", "زردکوه"],
            correct: 0,
            explanation: "قله دماوند با ارتفاع ۵۶۱۰ متر بلندترین قله ایران است."
        },
        {
            question: "کدام شهر به شهر بادگیرها معروف است؟",
            options: ["یزد", "شیراز", "اصفهان", "تبریز"],
            correct: 0,
            explanation: "یزد به دلیل معماری خاص و بادگیرهای فراوان به این نام معروف است."
        },
        {
            question: "میدان نقش جهان در کدام شهر قرار دارد؟",
            options: ["اصفهان", "تهران", "مشهد", "شیراز"],
            correct: 0,
            explanation: "میدان نقش جهان یکی از میدان‌های تاریخی اصفهان است."
        },
        {
            question: "دریاچه ارومیه در کدام استان قرار دارد؟",
            options: ["آذربایجان غربی", "گیلان", "مازندران", "خراسان شمالی"],
            correct: 0,
            explanation: "دریاچه ارومیه در استان آذربایجان غربی قرار دارد."
        }
    ];

    function startNewGame() {
        console.log("شروع بازی جدید");

        currentGame = {
            score: 0,
            currentQuestion: 0,
            timeLeft: 30,
            timer: null,
            questions: [...gameQuestions],
            answered: false
        };

        document.getElementById('score').textContent = '0';
        document.getElementById('question-counter').textContent = '1/5';
        document.getElementById('current-question').textContent = '1';
        document.getElementById('timer').textContent = '30';

        document.getElementById('next-question-btn').classList.add('hidden');
        document.getElementById('finish-game-btn').classList.add('hidden');

        document.getElementById('game-feedback').classList.add('hidden');

        loadQuestion();

        startTimer();
    }

    function loadQuestion() {
        const question = currentGame.questions[currentGame.currentQuestion];
        document.getElementById('current-question').textContent = currentGame.currentQuestion + 1;
        document.getElementById('question-counter').textContent = `${currentGame.currentQuestion + 1}/5`;
        document.getElementById('question-text').textContent = question.question;

        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;

            button.addEventListener('click', () => selectAnswer(index));
            optionsContainer.appendChild(button);
        });

        currentGame.answered = false;
    }

    function selectAnswer(selectedIndex) {
        if (currentGame.answered) return;

        clearInterval(currentGame.timer);
        currentGame.answered = true;

        const question = currentGame.questions[currentGame.currentQuestion];
        const options = document.querySelectorAll('.option-btn');
        const feedback = document.getElementById('game-feedback');

        if (selectedIndex === question.correct) {
            options[selectedIndex].classList.add('correct');
            feedback.textContent = `✅ پاسخ صحیح! ${question.explanation}`;
            feedback.className = 'game-feedback correct';
            currentGame.score += 20;

            createStars(5);
        } else {
            options[selectedIndex].classList.add('incorrect');
            options[question.correct].classList.add('correct');
            feedback.textContent = `❌ پاسخ اشتباه. ${question.explanation}`;
            feedback.className = 'game-feedback incorrect';
        }

        document.getElementById('score').textContent = currentGame.score;

        feedback.classList.remove('hidden');

        document.getElementById('next-question-btn').classList.remove('hidden');
    }

    const nextQuestionBtn = document.getElementById('next-question-btn');
    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', function () {
            currentGame.currentQuestion++;

            if (currentGame.currentQuestion < currentGame.questions.length) {
                loadQuestion();
                currentGame.timeLeft = 30;
                document.getElementById('timer').textContent = currentGame.timeLeft;
                startTimer();
                document.getElementById('game-feedback').classList.add('hidden');
                document.getElementById('next-question-btn').classList.add('hidden');
            } else {

                endGame();
            }
        });
    }


    function startTimer() {
        clearInterval(currentGame.timer);
        currentGame.timeLeft = 30;
        document.getElementById('timer').textContent = currentGame.timeLeft;

        currentGame.timer = setInterval(() => {
            currentGame.timeLeft--;
            document.getElementById('timer').textContent = currentGame.timeLeft;

            if (currentGame.timeLeft <= 0) {
                clearInterval(currentGame.timer);
                if (!currentGame.answered) {
                    // زمان تمام شد
                    currentGame.currentQuestion++;

                    if (currentGame.currentQuestion < currentGame.questions.length) {
                        loadQuestion();
                        currentGame.timeLeft = 30;
                        document.getElementById('timer').textContent = currentGame.timeLeft;
                        startTimer();
                    } else {
                        endGame();
                    }
                }
            }
        }, 1000);
    }

    function endGame() {
        clearInterval(currentGame.timer);

        gameContainer.classList.add('hidden');

        resultContainer.classList.remove('hidden');

        let badge = "مسافر تازه‌کار";
        let title = "بازی به پایان رسید!";
        let message = `شما ${currentGame.score} امتیاز کسب کردید.`;

        if (currentGame.score === 100) {
            badge = "ایران‌شناس برتر";
            title = "تبریک! شما یک ایران‌شناس برتر هستید!";
            message = "شما به تمام سوالات پاسخ صحیح دادید!";
            createConfetti();
        } else if (currentGame.score >= 80) {
            badge = "ایران‌شناس";
            title = "آفرین! شما ایران‌شناس هستید";
            message = "دانش بسیار خوبی درباره ایران دارید!";
        } else if (currentGame.score >= 60) {
            badge = "مسافر حرفه‌ای";
            title = "خوب است! با ایران آشنا هستید";
            message = "آشنایی نسبتاً خوبی با ایران دارید!";
        }

        document.getElementById('result-badge').textContent = badge;
        document.getElementById('result-title').textContent = title;
        document.getElementById('result-score').textContent = currentGame.score;
        document.getElementById('result-message').textContent = message;

        const savedUser = JSON.parse(localStorage.getItem('iranTourUser'));
        if (savedUser) {

            savedUser.gamesPlayed = (savedUser.gamesPlayed || 0) + 1;

            localStorage.setItem('iranTourUser', JSON.stringify(savedUser));

            updateSidePanel(savedUser);
        }
    }

    const playAgainBtn = document.getElementById('play-again-btn');
    if (playAgainBtn) {
        playAgainBtn.addEventListener('click', function () {
            resultContainer.classList.add('hidden');
            gameContainer.classList.remove('hidden');
            startNewGame();
        });
    }

    const cancelGameBtn = document.getElementById('cancel-game-btn');
    if (cancelGameBtn) {
        cancelGameBtn.addEventListener('click', function () {
            clearInterval(currentGame.timer);

            const savedUser = JSON.parse(localStorage.getItem('iranTourUser'));
            if (savedUser) {
                showWelcomeScreen(savedUser);
            } else {
                showSignupForm();
            }
        });
    }

    function createStars(count = 50) {
        const container = document.getElementById('stars-container');
        if (!container) return;

        container.innerHTML = '';

        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.classList.add('star');

            const x = Math.random() * 100;
            const y = Math.random() * 100;

            const size = Math.random() * 3 + 1;

            const duration = Math.random() * 3 + 2;

            star.style.left = `${x}vw`;
            star.style.top = `${y}vh`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.animationDuration = `${duration}s`;
            star.style.animationDelay = `${Math.random() * 2}s`;

            container.appendChild(star);
        }
    }

    function createConfetti(count = 150) {
        const container = document.getElementById('confetti-container');
        if (!container) return;

        container.innerHTML = '';

        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];

        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');

            const color = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.backgroundColor = color;


            const x = Math.random() * 100;


            const duration = Math.random() * 1 + 0.5;

            const delay = Math.random() * 0.5;

            confetti.style.left = `${x}vw`;
            confetti.style.top = '100vh';
            confetti.style.animationDuration = `${duration}s`;
            confetti.style.animationDelay = `${delay}s`;

            container.appendChild(confetti);
        }

        setTimeout(() => {
            container.innerHTML = '';
        }, 2000);
    }

    createStars();

    if (savedUser) {
        showWelcomeScreen(savedUser);
    } else {
        showSignupForm();
    }

    console.log("سیستم آماده است");
});


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
// افزودن انیمیشن‌های تعاملی برای تصویر برج میلاد
function initMilanTower() {
    const milanTower = document.getElementById('milan-tower');
    const container = document.querySelector('.milan-tower-container');
    
    if (!milanTower) return;
    
    // انیمیشن هنگام هاور روی تصویر
    container.addEventListener('mouseenter', function() {
        milanTower.style.animation = 'towerGlow 1s ease-in-out infinite alternate';
        container.style.animation = 'floatTower 3s ease-in-out infinite';
        
        // اضافه کردن جرقه‌های بیشتر
        for (let i = 0; i < 5; i++) {
            createSparkle();
        }
    });
    
    container.addEventListener('mouseleave', function() {
        milanTower.style.animation = 'towerGlow 3s ease-in-out infinite alternate';
        container.style.animation = 'floatTower 6s ease-in-out infinite';
    });
    
    // ایجاد جرقه‌های تصادفی
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'milan-tower-sparkle';
        
        const left = Math.random() * 80 + 10;
        const size = Math.random() * 6 + 2;
        
        sparkle.style.left = `${left}%`;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.animationDelay = `${Math.random() * 2}s`;
        sparkle.style.background = `rgba(${Math.random() * 100 + 155}, 
                                         ${Math.random() * 100 + 155}, 
                                         255, 0.9)`;
        
        container.appendChild(sparkle);
        
        // حذف جرقه بعد از انیمیشن
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.remove();
            }
        }, 3000);
    }
    
    // ایجاد جرقه‌های دوره‌ای
    setInterval(() => {
        if (Math.random() > 0.7) {
            createSparkle();
        }
    }, 2000);
    
    // پالس‌های نورانی دوره‌ای
    setInterval(() => {
        const glow = document.querySelector('.milan-tower-glow');
        if (glow) {
            glow.style.animation = 'none';
            setTimeout(() => {
                glow.style.animation = 'glowPulse 4s ease-in-out infinite';
            }, 10);
        }
    }, 8000);
}

// فراخوانی تابع بعد از لود صفحه
document.addEventListener('DOMContentLoaded', function() {
    initMilanTower();
});