const colori = [
  '#FFDDC1', '#FFABAB', '#FFC3A0', '#FF677D',
  '#D4A5A5', '#31A2AC', '#61C0BF', '#D9BF77',
  '#ACD8AA', '#F6D02F', '#A0D995', '#A2D4F4'
];

// Sostituisce '123' con una virgola in ogni stringa
function replace123WithComma(str) {
  return str?.replace(/123/g, ',') || '';
}

async function loadSpaces() {
  const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTKGFoqjEzpP7-_q9j79iYmTI7D9aoIKs2x0J4suQ19XiVCqG-GFPll9E8dOar4A5TBKawjLikIUWxu/pub?gid=0&single=true&output=csv";
  const response = await fetch(sheetUrl);
  const csvData = await response.text();
  const parsedData = parseCSV(csvData);
  renderSpaces(parsedData);
}

function parseCSV(csvData) {
  const rows = csvData.split('\n');
  const data = rows.map(row => row.split(','));
  const headers = data.shift();

  return data.map(row => {
    const space = {};
    headers.forEach((header, index) => {
      const key = header.trim();
      const value = row[index]?.trim();
      space[key] = replace123WithComma(value); // Applica la sostituzione a tutti i campi
    });
    return space;
  });
}

function renderSpaces(spaces) {
  const spaceList = document.getElementById('space-list');
  spaceList.innerHTML = '';

  spaces.forEach((space, index) => {
    const spaceDiv = document.createElement('div');
    spaceDiv.classList.add('space');
    spaceDiv.onclick = () => toggleSpaceDetails(space);

    spaceDiv.style.backgroundColor = colori[index % colori.length];
    spaceDiv.style.padding = '15px';
    spaceDiv.style.borderRadius = '8px';
    spaceDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

    spaceDiv.innerHTML = `<h3>${space.Nome}</h3>`;
    spaceList.appendChild(spaceDiv);
  });
}

function toggleSpaceDetails(space) {
  const overlay = document.getElementById('overlay');
  const overlayDetails = document.getElementById('overlay-details');

  overlayDetails.innerHTML = `
    <span id="close-btn" class="close-btn">&times;</span>
    <div class="space-image">
      <img src="${space.Foto}" alt="${space.Nome}">
    </div>
    <h2 class="space-name">${space.Nome}</h2>
    <div class="contact-info">
      <p><strong>Indirizzo:</strong> ${space.Contatti}</p>
    </div>
    <div class="space-description">
      <p><strong>Un po' di storia:</strong> ${space.Descrizione}</p>
    </div>
    <a href="eventi.html?spazio=${encodeURIComponent(space.Nome)}">
      <button class="events-button">Scopri gli spettacoli</button>
    </a>
  `;

  overlay.style.display = 'flex';

  document.getElementById('close-btn').onclick = () => {
    overlay.style.display = 'none';
  };
}

// Avvio del caricamento spazi
loadSpaces();
