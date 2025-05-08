function toggleSpaceDetails(spaceName) {
    const overlay = document.getElementById("overlay");
    const overlayDetails = document.getElementById("overlayDetails");

    // Trovo i dettagli della scheda selezionata
    const space = document.querySelector(`#${spaceName}`);
    const detailsHTML = space.querySelector('.space-details').innerHTML;

    // Aggiungi i dettagli della scheda all'overlay
    overlayDetails.innerHTML = detailsHTML;

    // Mostra l'overlay
    overlay.style.display = 'flex';

    // Impedisci la chiusura cliccando sull'overlay (solamente il tasto X può chiudere)
    overlay.onclick = (e) => {
        if (e.target === overlay) {
            closeOverlay();
        }
    };
}

// Funzione per chiudere l'overlay
function closeOverlay() {
    const overlay = document.getElementById("overlay");
    overlay.style.display = 'none';
}

// Aggiungi il listener per il tasto X
document.getElementById("closeBtn").addEventListener("click", closeOverlay);
