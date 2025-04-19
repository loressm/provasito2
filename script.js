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
const dropdowns = document.querySelectorAll('.navbar .dropdown > a');

dropdowns.forEach(link => {
    link.addEventListener('click', function (e) {
        // Solo su mobile
        if (window.innerWidth <= 768) {
            e.preventDefault(); // Impedisce il normale comportamento del link

            const submenu = this.nextElementSibling; // Seleziona il sottomenu associato

            // Controlla se il sottomenu è già aperto
            if (submenu.classList.contains('open')) {
                submenu.classList.remove('open'); // Chiude il sottomenu se è già aperto
            } else {
                submenu.classList.add('open'); // Apre il sottomenu se non è già aperto
            }
        }
    });
});
