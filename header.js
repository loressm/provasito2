// header.js
document.addEventListener('DOMContentLoaded', function () {
    // Carica il contenuto dell'header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;

            // Aggiungi la funzionalità dell'hamburger menu
            const hamburger = document.getElementById('hamburger');
            const navLinks = document.querySelector('.navbar ul');

            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('open'); // Aggiungi o rimuovi la classe 'open'
            });
        })
        .catch(error => console.error('Errore nel caricamento dell\'header:', error));
});
