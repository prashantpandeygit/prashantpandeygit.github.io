document.addEventListener('DOMContentLoaded', function () {
    const removeLoading = () => {
        document.body.classList.remove('loading');
    };

    if (document.readyState === 'complete') {
        removeLoading();
    } else {
        window.addEventListener('load', removeLoading);
    }


    const contentSections = document.querySelectorAll('.content-section');
    const isHomePage = contentSections.length > 1;

    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            const targetSection = item.getAttribute('data-section');


            const hamburger = document.getElementById('hamburger-menu');
            const navLinks = document.querySelector('.nav-links');
            if (navLinks && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
            }


            if (isHomePage && targetSection === 'home') {
                e.preventDefault();
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');

                contentSections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === 'home') {
                        section.classList.add('active');
                    }
                });
                return;
            }



        });
    });

    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
    }


    const ageCounter = document.getElementById('age-counter');
    const birthDate = new Date('2005-02-26T00:00:00');

    function updateAge() {
        const now = new Date();
        const diffInMs = now - birthDate;
        const ageInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
        ageCounter.textContent = ageInYears.toFixed(9);
    }

    if (ageCounter) {
        setInterval(updateAge, 50);
        updateAge();
    }


    const themeBtn = document.getElementById('theme-toggle-btn');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    const body = document.body;


    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.setAttribute('data-theme', 'light');
        if (moonIcon) moonIcon.style.display = 'none';
        if (sunIcon) sunIcon.style.display = 'block';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            if (body.hasAttribute('data-theme')) {
                body.removeAttribute('data-theme');
                localStorage.removeItem('theme');
                moonIcon.style.display = 'block';
                sunIcon.style.display = 'none';
            } else {
                body.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                moonIcon.style.display = 'none';
                sunIcon.style.display = 'block';
            }
        });
    }


});
