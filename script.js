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
const dropdowns = document.querySelectorAll('nav ul li > a');

dropdowns.forEach(link => {
    link.addEventListener('click', function (e) {
        // Solo su mobile
        if (window.innerWidth <= 1280) {
            const submenu = this.nextElementSibling;

            // Se c'è un sottomenu
            if (submenu && submenu.classList.contains('submenu')) {
                e.preventDefault(); // Impedisce di navigare al link, se presente

                // Toggle della classe 'open' per mostrare o nascondere il sottomenu
                submenu.classList.toggle('open');
            }
        }
    });
});

// -----------------------------
// Chiudi tutti i sottomenu se clicchi fuori dal menu
// -----------------------------
document.addEventListener('click', function (e) {
    if (!e.target.closest('nav')) {
        document.querySelectorAll('nav ul li ul.submenu').forEach(submenu => {
            submenu.classList.remove('open');
        });
    }
});

// -----------------------------
// Rimuovi l'apertura dei sottomenu se l'utente clicca di nuovo sulla voce (per chiuderlo)
// -----------------------------
const menuItems = document.querySelectorAll('nav ul li');

menuItems.forEach(item => {
    item.addEventListener('click', function (e) {
        const submenu = item.querySelector('ul.submenu');
        if (submenu) {
            if (submenu.classList.contains('open')) {
                submenu.classList.remove('open');
            } else {
                submenu.classList.add('open');
            }
        }
    });
});
