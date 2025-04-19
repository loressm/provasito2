// -----------------------------
// Menu Hamburger per mobile
// -----------------------------
const hamburger = document.getElementById('hamburger');
const menu = document.querySelector('nav ul');

hamburger.addEventListener('click', function () {
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');

    if (menu.classList.contains('active')) {
        hamburger.style.position = 'fixed';
        hamburger.style.top = '10px';
        hamburger.style.right = '10px';
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        hamburger.style.position = 'absolute';
        hamburger.style.top = '';
        hamburger.style.right = '';
    }
});

// -----------------------------
// Sottomenu a tendina (mobile)
// -----------------------------
const dropdownLinks = document.querySelectorAll('.navbar .dropdown > a');

dropdownLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        if (window.innerWidth <= 1280) { // 👈 aggiornato da 768 a 1280
            e.preventDefault();

            const submenu = this.nextElementSibling;
            const isOpen = submenu.classList.contains('open');

            // Chiude tutti i sottomenu
            document.querySelectorAll('.navbar .submenu.open').forEach(openMenu => {
                openMenu.classList.remove('open');
            });

            // Riapre solo se non era già aperto
            if (!isOpen) {
                submenu.classList.add('open');
            }
        }
    });
});
