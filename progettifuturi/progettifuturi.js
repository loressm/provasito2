document.addEventListener('DOMContentLoaded', function () {
    // Trova l'elemento della barra di progresso
    const progress = document.querySelector('.progress');
    
    // Imposta inizialmente la larghezza della barra a 0%
    progress.style.width = '0%';
    
    // Aggiungi un piccolo ritardo per far partire l'animazione in modo visibile
    setTimeout(function() {
        // Imposta la larghezza finale della barra di progresso al 10%
        progress.style.width = '10%';
    }, 100); // Ritardo di 100 millisecondi (puoi regolare questo valore)
});
