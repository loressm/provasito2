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
// Sottomenu a tendina (mobile fino a 1280px)
// -----------------------------
const dropdownLinks = document.querySelectorAll('.navbar .dropdown > a');

dropdownLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        if (window.innerWidth <= 1280) {
            e.preventDefault();

            const submenu = this.nextElementSibling;

            // Se è già aperto, lo chiude
            if (submenu.classList.contains('open')) {
                submenu.classList.remove('open');
            } else {
                // Chiude tutti gli altri sottomenu
                document.querySelectorAll('.navbar .submenu.open').forEach(openMenu => {
                    openMenu.classList.remove('open');
                });

                // Apre solo quello cliccato
                submenu.classList.add('open');
            }
        }
    });
});
