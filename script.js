document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            const targetSectionId = item.getAttribute('data-section');
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSectionId) {
                    section.classList.add('active');
                }
            });

            const hamburger = document.getElementById('hamburger-menu');
            const sidebarNav = document.querySelector('.sidebar-nav');
            if (sidebarNav.classList.contains('open')) {
                sidebarNav.classList.remove('open');
                hamburger.classList.remove('active');
            }
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

    const themeBtn = document.getElementById('theme-toggle-btn');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    const body = document.body;

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            if (body.hasAttribute('data-theme')) {
                body.removeAttribute('data-theme');
                moonIcon.style.display = 'block';
                sunIcon.style.display = 'none';
            } else {
                body.setAttribute('data-theme', 'light');
                moonIcon.style.display = 'none';
                sunIcon.style.display = 'block';
            }
        });
    }
});
