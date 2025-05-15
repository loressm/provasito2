const colori = [
  '#FFDDC1', '#FFABAB', '#FFC3A0', '#FF677D',
  '#D4A5A5', '#31A2AC', '#61C0BF', '#D9BF77',
  '#ACD8AA', '#F6D02F', '#A0D995', '#A2D4F4'
];

// Funzione per sostituire '123' con una virgola
function replace123WithComma(str) {
  return str?.replace(/123/g, ',') || ''; // Gestione sicura per valori null o undefined
}

async function loadProductions() {
  const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSxdW9IopS1n3eo77ORvCvIa6ZylXfl8-XqkbRKzPRViBawgymAUoD4_vAVRTxfhEKUAL6FOLJ_t4Ge/pub?gid=0&single=true&output=csv";
  const response = await fetch(sheetUrl);
  const csvData = await response.text();
  const parsedData = parseCSV(csvData);
  renderProductions(parsedData);
}

function parseCSV(csvData) {
  const rows = csvData.split('\n');
  const data = rows.map(row => row.split(','));
  const headers = data.shift();
  return data.map(row => {
    const production = {};
    headers.forEach((header, index) => {
      production[header.trim()] = row[index]?.trim();
    });
    return production;
  });
}

function renderProductions(productions) {
  const productionList = document.getElementById('production-list');
  productionList.innerHTML = ''; // Pulisce la lista prima di aggiungere nuovi elementi

  productions.forEach((production, index) => {
    const productionDiv = document.createElement('div');
    productionDiv.classList.add('production');
    productionDiv.onclick = () => toggleProductionDetails(production); // Aggiunge il toggle

    productionDiv.style.backgroundColor = colori[index % colori.length];
    productionDiv.style.padding = '15px';
    productionDiv.style.borderRadius = '8px';
    productionDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

    productionDiv.innerHTML = `<h3>${production.Nome}</h3>`;
    productionList.appendChild(productionDiv);
  });
}

function toggleProductionDetails(production) {
  const overlay = document.getElementById('overlay');
  const overlayDetails = document.getElementById('overlay-details');

  // Applica la sostituzione nella descrizione
  const updatedDescription = replace123WithComma(production.Descrizione);

  overlayDetails.innerHTML = `
    <span id="close-btn" class="close-btn">&times;</span>
    <div class="production-image">
      <img src="${production.Foto}" alt="${production.Nome}">
    </div>
    <h2 class="production-name">${production.Nome}</h2>
    <div class="production-description">
      <p><strong>Descrizione:</strong> ${updatedDescription}</p>
    </div>
    <a href="eventi.html?produzione=${encodeURIComponent(production.Nome)}">
      <button class="events-button">Scopri gli spettacoli</button>
    </a>
  `;

  overlay.style.display = 'flex';

  document.getElementById('close-btn').onclick = () => {
    overlay.style.display = 'none';
  };
}

// Carica le produzioni al caricamento della pagina
loadProductions();
