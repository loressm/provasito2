// Funzione per caricare i dati degli spazi da Google Sheets (CSV)
async function loadSpaces() {
    const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTKGFoqjEzpP7-_q9j79iYmTI7D9aoIKs2x0J4suQ19XiVCqG-GFPll9E8dOar4A5TBKawjLikIUWxu/pub?gid=0&single=true&output=csv";
    const response = await fetch(sheetUrl);
    const csvData = await response.text();
    const parsedData = parseCSV(csvData);
    renderSpaces(parsedData);
}

// Funzione per parsare i dati CSV
function parseCSV(csvData) {
    const rows = csvData.split('\n');
    const data = rows.map(row => row.split(','));
    const headers = data.shift(); // Prima riga contiene gli headers
    return data.map(row => {
        const space = {};
        headers.forEach((header, index) => {
            space[header.trim()] = row[index]?.trim();
        });
        return space;
    });
}

// Funzione per visualizzare gli spazi sulla pagina
function renderSpaces(spaces) {
    const spaceList = document.querySelector('.space-list');
    spaceList.innerHTML = ''; // Pulisce prima i dati esistenti

    // Colori allegri ciclici
    const colori = [
        '#FFDDC1', '#FFABAB', '#FFC3A0', '#FF677D', '#D4A5A5', '#392F5A',
        '#31A2AC', '#61C0BF', '#6B4226', '#D9BF77', '#ACD8AA', '#F6D02F'
    ];

    spaces.forEach((space, index) => {
        const spaceDiv = document.createElement('div');
        spaceDiv.classList.add('space');
        spaceDiv.onclick = () => toggleSpaceDetails(space.Nome);

        // Colore di sfondo ciclico
        const colore = colori[index % colori.length];
        spaceDiv.style.backgroundColor = colore;
        spaceDiv.style.padding = "15px";
        spaceDiv.style.marginBottom = "20px";
        spaceDiv.style.borderRadius = "8px";
        spaceDiv.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";

        const imgUrl = space.Foto;

        const spaceHTML = `
            <h3>${space.Nome}</h3>
            <div class="space-details" id="${space.Nome}" style="display: none; margin-top: 10px;">
                <div class="space-image">
                    <img src="${imgUrl}" alt="${space.Nome}">
                </div>
                <h2 class="space-name">${space.Nome}</h2>
                <div class="contact-info">
                    <p><strong>Contatti:</strong> ${space.Contatti}</p>
                </div>
                <div class="space-history">
                    <p><strong>Descrizione:</strong> ${space.Descrizione}</p>
                </div>
                <a href="eventi.html?spazio=${encodeURIComponent(space.Nome)}">
                    <button class="events-button">Scopri tutti gli eventi in programma</button>
                </a>
            </div>
        `;

        spaceDiv.innerHTML = spaceHTML;
        spaceList.appendChild(spaceDiv);
    });
}

// Funzione per mostrare/nascondere i dettagli di uno spazio
function toggleSpaceDetails(spaceName) {
    const spaceDetails = document.getElementById(spaceName);

    if (spaceDetails.style.display === 'none' || spaceDetails.style.display === '') {
        spaceDetails.style.display = 'block';
    } else {
        spaceDetails.style.display = 'none';
    }
}

// Carica gli spazi all'avvio della pagina
loadSpaces();
