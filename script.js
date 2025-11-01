document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('loaded');

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.filter = 'blur(0)';
        }, 150 * index);
    });

    const spotifyToggleLogo = document.getElementById('spotify-toggle-logo');
    const spotifyPlayerPopup = document.getElementById('spotify-player-popup');
    const spotifyPopupContainer = document.getElementById('spotify-popup-container');

    spotifyToggleLogo.addEventListener('click', () => {
        spotifyPlayerPopup.classList.toggle('open');
    });
});
