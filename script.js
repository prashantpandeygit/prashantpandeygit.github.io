document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('loaded');

    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            navItems.forEach(nav => nav.classList.remove('active'));
            
            item.classList.add('active');
            
            const targetSection = item.getAttribute('data-section');
            
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
                
                if (targetSection === 'work-highlights') {
                    const hiddenCards = targetElement.querySelectorAll('.project-card.initially-hidden');
                    const showMoreBtn = document.getElementById('show-more-btn');
                    hiddenCards.forEach(card => {
                        card.classList.remove('visible');
                        card.style.opacity = '0';
                    });
                    
                    if (showMoreBtn) {
                        showMoreBtn.style.display = 'block';
                        showMoreBtn.textContent = 'Show More Projects ';
                        showMoreBtn.dataset.expanded = 'false';
                    }
                }
            }
        });
    });

    const animateProjectCards = (section) => {
        const projectCards = section.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.filter = 'blur(0)';
            }, 150 * index);
        });
    };

    const activeSection = document.querySelector('.content-section.active');
    if (activeSection) {
        animateProjectCards(activeSection);
    }

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.classList.contains('active')) {
                    animateProjectCards(target);
                }
            }
        });
    });

    contentSections.forEach(section => {
        observer.observe(section, { attributes: true });
    });

    const workHighlightsSection = document.getElementById('work-highlights');
    if (workHighlightsSection) {
        const showMoreBtn = document.getElementById('show-more-btn');
        const hiddenCards = workHighlightsSection.querySelectorAll('.project-card.initially-hidden');
        
        const areAllProjectsShown = () => {
            if (showMoreBtn && showMoreBtn.dataset.expanded === 'true') {
                return true;
            }
            return Array.from(hiddenCards).some(card => card.classList.contains('visible'));
        };
        
        const initializeProjects = () => {
            hiddenCards.forEach(card => {
                card.classList.remove('visible');
                card.style.opacity = '0';
            });
            if (showMoreBtn) {
                showMoreBtn.textContent = 'Show More Projects ';
                showMoreBtn.dataset.expanded = 'false';
            }
        };
        
        const showAllProjects = () => {
            hiddenCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.display = 'block';
                    requestAnimationFrame(() => {
                        card.classList.add('visible');
                        card.style.opacity = '1';
                    });
                }, index * 50);
            });
            if (showMoreBtn) {
                showMoreBtn.textContent = 'Show Less Projects ';
                showMoreBtn.dataset.expanded = 'true';
            }
        };
        
        const hideAdditionalProjects = () => {
            const cardsArray = Array.from(hiddenCards).reverse();
            cardsArray.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.classList.remove('visible');
                        card.style.display = '';
                    }, 400);
                }, index * 30);
            });
            if (showMoreBtn) {
                showMoreBtn.textContent = 'Show More Projects ';
                showMoreBtn.dataset.expanded = 'false';
            }
        };
        
        const toggleProjects = () => {
            if (areAllProjectsShown()) {
                hideAdditionalProjects();
            } else {
                showAllProjects();
            }
        };
        
        initializeProjects();
        
        if (showMoreBtn) {
            showMoreBtn.addEventListener('click', () => {
                toggleProjects();
            });
        }
    }

    const spotifyToggleLogo = document.getElementById('spotify-toggle-logo');
    const spotifyPlayerPopup = document.getElementById('spotify-player-popup');
    const spotifyPopupContainer = document.getElementById('spotify-popup-container');

    spotifyToggleLogo.addEventListener('click', () => {
        spotifyPlayerPopup.classList.toggle('open');
    });
});
