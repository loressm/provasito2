document.addEventListener("DOMContentLoaded", function() {
    // Funzione per ottenere il parametro dalla URL
    function getUrlParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Controlliamo se l'elemento #events-list esiste
    const listaEventi = document.getElementById("events-list");
    if (!listaEventi) {
        console.error("Elemento #events-list non trovato.");
        return; // Se non troviamo l'elemento, fermiamo l'esecuzione del codice
    }

    // Otteniamo i parametri dalla URL
    const socio = getUrlParam('socio');
    const produzione = getUrlParam('produzione');
    const spazio = getUrlParam('spazio');

    // Array di colori allegri per gli eventi (colori aggiornati)
    const colori = [
        '#FFDDC1', '#FFABAB', '#FFC3A0', '#FF677D', '#D4A5A5', '#A0D995', // verde prato
        '#A2D4F4', '#31A2AC', '#61C0BF', '#D9BF77', '#ACD8AA', '#F6D02F'
    ];

    // URL del file Google Sheets CSV
    const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRqZXO73F9VZzUCOY3yCvwqRsTiWyoNJfi6P3qsKDiytQzw_VezIIuMNCyVq7thA8mt0Y5vQJiFx-tP/pub?gid=0&single=true&output=csv";
    
    // Carica il CSV con PapaParse
    Papa.parse(sheetUrl, { // Usa il link raw di Google Sheets
        download: true,
        complete: function(results) {
            // Logghiamo i dati per vedere se sono caricati correttamente
            console.log("Dati CSV caricati correttamente:", results.data);

            let eventi = results.data;

            // Filtriamo le righe vuote se necessario
            eventi = eventi.filter(evento => evento[0] && evento[1] && evento[2] && evento[3] && evento[4]);

            // Se c'è il parametro socio, filtra gli eventi per socio
            if (socio) {
                eventi = eventi.filter(evento => evento[2].toLowerCase() === socio.toLowerCase());
            }

            // Se c'è il parametro produzione, filtra gli eventi per produzione
            if (produzione) {
                eventi = eventi.filter(evento => evento[1].toLowerCase() === produzione.toLowerCase());
            }

            // Se c'è il parametro spazio, filtra gli eventi per spazio
            if (spazio) {
                eventi = eventi.filter(evento => evento[3].toLowerCase() === spazio.toLowerCase());
            }

            // Visualizza gli eventi
            if (eventi.length === 0) {
                listaEventi.innerHTML = "<p>Non ci sono eventi per questi filtri.</p>";
            } else {
                eventi.forEach((evento, index) => {
                    let eventoDiv = document.createElement("div");
                    eventoDiv.classList.add("evento");

                    // Assegna un colore casuale dall'array colori
                    const coloreCasuale = colori[index % colori.length];
                    eventoDiv.style.backgroundColor = coloreCasuale;
                    eventoDiv.style.padding = "15px";
                    eventoDiv.style.marginBottom = "20px";
                    eventoDiv.style.borderRadius = "8px";
                    eventoDiv.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"; // Ombra per il risultato

                    eventoDiv.innerHTML = `
                        <h4>${evento[1] || 'Produzione non disponibile'}</h4>
                        <p><strong>Data:</strong> ${evento[0] || 'Data non disponibile'}</p>
                        <p><strong>Socio:</strong> ${evento[2] || 'Socio non disponibile'}</p>
                        <p><strong>Spazio:</strong> ${evento[3] || 'Spazio non disponibile'}</p>
                        <p><strong>Descrizione:</strong> ${evento[4] || 'Descrizione non disponibile'}</p>
                    `;
                    listaEventi.appendChild(eventoDiv);
                });
            }
        },
        error: function(error) {
            console.error("Errore nel caricamento del CSV:", error);
        }
    });
});
