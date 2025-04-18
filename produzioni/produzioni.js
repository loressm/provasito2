document.addEventListener("DOMContentLoaded", function() {
    // Funzione per caricare le produzioni da Google Sheets
    async function loadProductions() {
        const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1VnZ-VHd85ajhAQWwxZOSSyry6HBoYoHiVyvlJdlPhyj8l3m8s55UJaUv6w7YMgbTL52zjxT1_vdQ/pub?gid=0&single=true&output=csv"; // URL del foglio Google
        const response = await fetch(sheetUrl);
        const csvData = await response.text();
        const parsedData = parseCSV(csvData); // Parsing del CSV
        renderProductions(parsedData); // Rendering delle produzioni
    }

    // Funzione per parsare il CSV
    function parseCSV(csvData) {
        const rows = csvData.split('\n');
        const data = rows.map(row => row.split(','));
        const headers = data.shift(); // Rimuove gli headers
        return data.map(row => {
            const production = {};
            headers.forEach((header, index) => {
                production[header.trim()] = row[index]?.trim();
            });
            return production;
        });
    }

    // Funzione per visualizzare le produzioni sulla pagina
    function renderProductions(productions) {
        const productionList = document.getElementById('production-list');
        productionList.innerHTML = ''; // Pulisce prima i dati esistenti

        productions.forEach(production => {
            const productionDiv = document.createElement('div');
            productionDiv.classList.add('production');
            productionDiv.onclick = () => toggleProductionDetails(production.Nome);

            const productionHTML = `
                <h3>${production.Nome}</h3>
                <div class="production-details" id="${production.Nome}" style="display: none;">
                    <div class="production-image">
                        <img src="produzioni/${production.Foto}" alt="${production.Nome}">
                    </div>
                    <h2 class="production-name">${production.Nome}</h2>
                    <div class="production-description">
                        <p><strong>Descrizione:</strong> ${production.Descrizione}</p>
                    </div>
                    <a href="eventi.html?produzione=${encodeURIComponent(production.Nome)}">
                        <button class="events-button">Scopri i prossimi spettacoli</button>
                    </a>
                </div>
            `;

            productionDiv.innerHTML = productionHTML;
            productionList.appendChild(productionDiv);
        });
    }

    // Funzione per mostrare/nascondere i dettagli della produzione
    function toggleProductionDetails(productionName) {
        const details = document.getElementById(productionName);
        details.style.display = (details.style.display === 'none' || details.style.display === '') ? 'block' : 'none';
    }

    // Carica le produzioni al caricamento della pagina
    loadProductions();
});
