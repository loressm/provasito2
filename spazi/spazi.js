// Array di colori da utilizzare per i diversi spazi
const colori = [
  '#FFDDC1', '#FFABAB', '#FFC3A0', '#FF677D',
  '#D4A5A5', '#31A2AC', '#61C0BF', '#D9BF77',
  '#ACD8AA', '#F6D02F', '#A0D995', '#A2D4F4'
];

// Funzione per caricare gli spazi dalla Google Sheets
async function loadSpaces() {
  const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTKGFoqjEzpP7-_q9j79iYmTI7D9aoIKs2x0J4suQ19XiVCqG-GFPll9E8dOar4A5TBKawjLikIUWxu/pub?gid=0&single=true&output=csv";
  const response = await fetch(sheetUrl);
  const csvData = await response.text();
  const parsedData = parseCSV(csvData);
  renderSpaces(parsedData);
}

// Funzione per analizzare il CSV in formato array di oggetti
function parseCSV(csvData) {
  const rows = csvData.split('\n');
  const data = rows.map(row => row.split(','));
  const headers = data.shift();
  return data.map(row => {
    const space = {};
    headers.forEach((header, index) => {
      space[header.trim()] = row[index]?.trim();
    });
    return space;
  });
}

// Funzione per renderizzare gli spazi sulla pagina
function renderSpaces(spaces) {
  const spaceList = document.querySelector('.space-list');
  spaceList.innerHTML = '';

  spaces.forEach((space, index) => {
    const spaceDiv = document.createElement('div');
    spaceDiv.classList.add('space');
    spaceDiv.onclick = () => openSpaceDetails(space.Nome);  // Aggiunge il click per aprire i dettagli

    spaceDiv.style.backgroundColor = colori[index % colori.length];

    // Crea la struttura per ogni spazio
    const spaceDetails = `
      <div class="space-details" id="${space.Nome}" style="display: none;">
        <div class="space-image">
          <img src="${space.Foto}" alt="${space.Nome}">
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
        <div class="map-container">
          <iframe src="${space.Mappa}" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        </div>
        <button class="close-btn" onclick="closeSpaceDetails('${space.Nome}')">&times;</button> <!-- Tasto di chiusura -->
      </div>
    `;
    
    spaceDiv.innerHTML = `<h3>${space.Nome}</h3>` + spaceDetails;
    spaceList.appendChild(spaceDiv);
  });
}

// Funzione per aprire i dettagli dello spazio
function openSpaceDetails(spaceName) {
  // Mostra l'overlay e il dettaglio dello spazio
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.appendChild(overlay);

  const spaceDetails = document.getElementById(spaceName);
  spaceDetails.style.display = 'block';

  // Centra la finestra modale con l'overlay
  const spaceDetailsRect = spaceDetails.getBoundingClientRect();
  spaceDetails.style.top = `50%`;
  spaceDetails.style.left = `50%`;
  spaceDetails.style.transform = `translate(-50%, -50%)`;

  // Mostra l'overlay
  overlay.onclick = () => closeSpaceDetails(spaceName);  // Chiude anche quando clicchi sull'overlay
}

// Funzione per chiudere i dettagli dello spazio
function closeSpaceDetails(spaceName) {
  const spaceDetails = document.getElementById(spaceName);
  spaceDetails.style.display = 'none';

  // Rimuovi l'overlay
  const overlay = document.querySelector('.overlay');
  if (overlay) {
    overlay.remove();
  }
}

// Carica gli spazi quando la pagina è pronta
loadSpaces();
