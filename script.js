// -----------------------------
// Menu Hamburger per mobile
// -----------------------------
const hamburger = document.getElementById('hamburger');
const menu = document.querySelector('nav ul');

hamburger.addEventListener('click', function () {
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');

    // Gestire la posizione dell'hamburger solo quando il menu è aperto
    if (menu.classList.contains('active')) {
        hamburger.style.position = 'fixed';
        hamburger.style.top = '10px';
        hamburger.style.right = '10px';
    } else {
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
            e.preventDefault();  // Impediamo il comportamento di default del link

            const submenu = this.nextElementSibling;
            submenu.classList.toggle('open');  // Alterna la visibilità del sottomenu

            // Chiudere gli altri sottomenu se solo uno deve essere visibile alla volta
            dropdowns.forEach(otherLink => {
                if (otherLink !== link) {
                    const otherSubmenu = otherLink.nextElementSibling;
                    if (otherSubmenu.classList.contains('open')) {
                        otherSubmenu.classList.remove('open');
                    }
                }
            });
        }
    });
});
