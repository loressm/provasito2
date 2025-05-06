window.onload = function() {
    fetch('footer.html')  // Carica il file footer.html dalla root
        .then(response => response.text())
        .then(data => {
            document.querySelector('footer').innerHTML = data;  // Inietta il contenuto nel footer
        })
        .catch(error => console.error('Errore nel caricare il footer:', error));
};
