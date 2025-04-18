// Funzione per caricare i dati delle produzioni da Google Sheets (CSV)
async function loadProductions() {
    const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSxdW9IopS1n3eo77ORvCvIa6ZylXfl8-XqkbRKzPRViBawgymAUoD4_vAVRTxfhEKUAL6FOLJ_t4Ge/pub?gid=0&single=true&output=csv";
    const response = await fetch(sheetUrl);
    const csvData = await response.text();
    const parsedData = parseCSV(csvData);
    renderProductions(parsedData);
}

// Funzione per parsare i dati CSV
function parseCSV(csvData) {
    const rows = csvData.split('\n');
    const data = rows.map(row => row.split(','));
    const headers = data.shift(); // Prima riga contiene gli headers
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
    const productionList = document.querySelector('.production-list');
    productionList.innerHTML = ''; // Pulisce prima i dati esistenti

    productions.forEach(production => {
        const productionDiv = document.createElement('div');
        productionDiv.classList.add('production');
        productionDiv.onclick = () => toggleProductionDetails(production.Nome);

        // URL per la foto della produzione
        const imgUrl = production.Foto; // Assumiamo che 'Foto' contenga il link dell'immagine

        const productionHTML = `
            <h3>${production.Nome}</h3>
        `;

        productionDiv.innerHTML = productionHTML;
        productionList.appendChild(productionDiv);

        // Dettagli della produzione
        const productionDetails = `
            <div class="production-details" id="${production.Nome}" style="display: none;">
                <div class="production-image">
                    <img src="${imgUrl}" alt="${production.Nome}">
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
        productionDiv.innerHTML += productionDetails;
    });
}

// Funzione per mostrare/nascondere i dettagli di una produzione
function toggleProductionDetails(productionName) {
    const productionDetails = document.getElementById(productionName);

    if (productionDetails.style.display === 'none' || productionDetails.style.display === '') {
        productionDetails.style.display = 'block';
    } else {
        productionDetails.style.display = 'none';
    }
}

// Carica le produzioni all'avvio della pagina
loadProductions();
