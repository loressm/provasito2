document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById('hamburger');
    const menu = document.querySelector('nav ul');

    if (hamburger && menu) {
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
    }

    // -----------------------------
    // Sottomenu con effetto slide up/down
    // -----------------------------
    const dropdownLinks = document.querySelectorAll('.navbar .dropdown > a');

    dropdownLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const submenu = this.nextElementSibling;

            if (submenu && submenu.classList.contains('submenu')) {
                e.preventDefault();

                const isOpen = submenu.classList.contains('open');

                // Chiudi tutti gli altri sottomenu
                document.querySelectorAll('.submenu').forEach(menu => {
                    menu.classList.remove('open');
                    menu.style.maxHeight = null;
                    menu.style.paddingTop = '';
                    menu.style.paddingBottom = '';
                });

                // Se non era aperto, aprilo con effetto slide
                if (!isOpen) {
                    submenu.classList.add('open');
                    submenu.style.maxHeight = submenu.scrollHeight + "px";
                    submenu.style.paddingTop = "10px";
                    submenu.style.paddingBottom = "10px";
                }
            }
        });
    });

    // -----------------------------
    // Chiudi hamburger solo se clic su link senza submenu
    // -----------------------------
    const navLinks = document.querySelectorAll('nav ul li > a');

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            const submenu = this.nextElementSibling;

            if (!submenu || !submenu.classList.contains('submenu')) {
                if (menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    hamburger.classList.remove('active');
                    hamburger.style.position = 'absolute';
                    hamburger.style.top = '';
                    hamburger.style.right = '';
                }
            }
        });
    });

    // -----------------------------
    // Animazione "Chi siamo?" da sinistra al primo scroll
    // -----------------------------
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // -----------------------------
    // Animazione immagini "da basso verso l'alto" al primo scroll
    // -----------------------------
    const bottomToTopObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    const animateFromBottomElements = document.querySelectorAll('.animate-from-bottom');
    animateFromBottomElements.forEach(el => bottomToTopObserver.observe(el));

    // -----------------------------
    // Animazione da destra a sinistra e da su a giù
    // -----------------------------
    // Funzione per verificare se l'elemento è nel viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    }

    // Selezionare gli elementi che devono avere le animazioni
    const animatedFromRightElements = document.querySelectorAll('.animate-from-right');
    const animatedFromTopElements = document.querySelectorAll('.animate-from-top');

    // Aggiungere la classe "visible" quando l'elemento entra nel viewport
    window.addEventListener('scroll', function () {
        // Animazione da destra a sinistra
        animatedFromRightElements.forEach(el => {
            if (isInViewport(el)) {
                el.classList.add('visible'); // Aggiungi la classe "visible" per far partire l'animazione da destra
            }
        });

        // Animazione da su a giù
        animatedFromTopElements.forEach(el => {
            if (isInViewport(el)) {
                el.classList.add('visible'); // Aggiungi la classe "visible" per far partire l'animazione da su
            }
        });
    });

    // Esegui il controllo subito per eventuali elementi già visibili all'inizio
    animatedFromRightElements.forEach(el => {
        if (isInViewport(el)) {
            el.classList.add('visible');
        }
    });
    animatedFromTopElements.forEach(el => {
        if (isInViewport(el)) {
            el.classList.add('visible');
        }
    });
});

