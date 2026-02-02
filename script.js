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


    const codeBlocks = document.querySelectorAll('.blog-post-content pre');
    codeBlocks.forEach(pre => {

        const button = document.createElement('button');
        button.className = 'copy-code-btn';
        button.setAttribute('aria-label', 'Copy code');
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-copy">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
        `;


        pre.appendChild(button);


        button.addEventListener('click', () => {
            const code = pre.querySelector('code');
            const textToCopy = code ? code.innerText : pre.innerText;

            navigator.clipboard.writeText(textToCopy).then(() => {

                const originalIcon = button.innerHTML;
                button.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-check">
                        <path d="M20 6 9 17l-5-5" />
                    </svg>
                `;
                button.style.color = '#4ade80';

                setTimeout(() => {
                    button.innerHTML = originalIcon;
                    button.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy code: ', err);
            });
        });
    });


    function addLightModeNote() {
        if (!window.location.pathname.includes('/blogs/')) return;

        const header = document.querySelector('.blog-post-header');
        if (header) {
            const note = document.createElement('div');
            note.className = 'light-mode-note';
            note.textContent = 'Recommended: Read in Light Mode';
            header.insertBefore(note, header.firstChild);
        }
    }

    addLightModeNote();
});
