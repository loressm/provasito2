document.addEventListener('DOMContentLoaded', function () {
    // Trova l'elemento della barra di progresso e il numero della percentuale
    const progress = document.querySelector('.progress');
    const progressNumber = document.querySelector('.progress-number');
    
    // Imposta inizialmente la larghezza della barra e il numero percentuale a 0
    let width = 0;
    progress.style.width = `${width}%`;
    progressNumber.textContent = `${width}%`;

    // Aggiungi un piccolo ritardo per far partire l'animazione
    setTimeout(function() {
        // Anima la barra di progresso
        const interval = setInterval(function() {
            if (width < 10) {
                width++;
                progress.style.width = `${width}%`;  // Aggiorna la larghezza della barra
                progressNumber.textContent = `${width}%`;  // Aggiorna il numero percentuale
            } else {
                clearInterval(interval);  // Ferma l'animazione quando raggiunge il 10%
            }
        }, 20); // Aggiorna ogni 20 millisecondi (regolabile per velocizzare/lentare l'animazione)
    }, 100); // Ritardo iniziale di 100 millisecondi
});
