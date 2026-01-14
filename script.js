document.addEventListener('DOMContentLoaded', function () {
    const removeLoading = () => {
        document.body.classList.remove('loading');
    };

    if (document.readyState === 'complete') {
        removeLoading();
    } else {
        window.addEventListener('load', removeLoading);
    }

    // Check if we're on the home page (has multiple sections)
    const contentSections = document.querySelectorAll('.content-section');
    const isHomePage = contentSections.length > 1;

    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            const targetSection = item.getAttribute('data-section');

            // Close mobile menu first
            const hamburger = document.getElementById('hamburger-menu');
            const sidebarNav = document.querySelector('.sidebar-nav');
            if (sidebarNav && sidebarNav.classList.contains('open')) {
                sidebarNav.classList.remove('open');
                hamburger.classList.remove('active');
            }

            // If on home page and clicking home, handle locally
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

            // For other sections or navigation, let the browser handle the link
            // The href will navigate to the appropriate route
        });
    });

    const hamburger = document.getElementById('hamburger-menu');
    const sidebarNav = document.querySelector('.sidebar-nav');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            sidebarNav.classList.toggle('open');
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

    // Theme toggle with localStorage persistence
    const themeBtn = document.getElementById('theme-toggle-btn');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    const body = document.body;

    // Load saved theme
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
