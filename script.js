document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('content').classList.add('loaded');
    }, 500);

    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

});