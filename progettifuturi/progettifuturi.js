document.addEventListener('DOMContentLoaded', function () {
    const progress = document.querySelector('.progress');
    const progressNumber = document.querySelector('.progress-number');
    
    // Imposta inizialmente la larghezza della barra e il numero percentuale a 0
    let width = 0;
    progress.style.width = `${width}%`;
    progressNumber.textContent = `${width}%`;

    // Funzione per avviare l'animazione
    function startAnimation() {
        setTimeout(function() {
            const interval = setInterval(function() {
                if (width < 10) {  // Cambiato da 100% a 10%
                    width++;  // Incrementa fino al 10%
                    progress.style.width = `${width}%`;  // Sincronizza la barra

                    // Riduci la velocità dell'aggiornamento del numero rispetto alla barra
                    if (width % 2 === 0) {  // Aggiorna il numero ogni 2 incrementi
                        progressNumber.textContent = `${width}%`;  // Sincronizza i numeri
                    }
                } else {
                    clearInterval(interval);  // Ferma l'animazione al 100%
                }
            }, 20);  // Velocità della progress bar (ogni 20ms)
        }, 100);  // Ritardo iniziale di 100 millisecondi
    }

    // Configura l'IntersectionObserver
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAnimation();  // Avvia l'animazione quando l'elemento è visibile
                observer.unobserve(entry.target); // Rimuove l'osservazione per non avviare più l'animazione
            }
        });
    });

    // Osserva l'elemento con la barra di progresso
    const progressContainer = document.querySelector('.progress-container');
    observer.observe(progressContainer);  // Inizia l'osservazione
});
