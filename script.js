document.addEventListener('DOMContentLoaded', function () {
    // Trigger full-page blur + fade-in
    document.body.classList.add('loaded');

    // Project cards staggered animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.filter = 'blur(0)';
        }, 150 * index);
    });
});
