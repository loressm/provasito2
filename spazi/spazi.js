const colori = [
  '#FFDDC1', '#FFABAB', '#FFC3A0', '#FF677D',
  '#D4A5A5', '#31A2AC', '#61C0BF', '#D9BF77',
  '#ACD8AA', '#F6D02F', '#A0D995', '#A2D4F4'
];

async function loadSpaces() {
  const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTKGFoqjEzpP7-_q9j79iYmTI7D9aoIKs2x0J4suQ19XiVCqG-GFPll9E8dOar4A5TBKawjLikIUWxu/pub?gid=0&single=true&output=csv";
  const response = await fetch(sheetUrl);
  const csvData = await response.text();
  const parsedData = parseCSV(csvData);
  renderSpaces(parsedData);
}

function parseCSV(csvData) {
  const rows = csvData.trim().split('\n');
  const data = rows.map(row => row.split(','));
  const headers = data.shift();
  return data.map(row => {
    const space = {};
    headers.forEach((header, index) => {
      space[header.trim()] = row[index]?.trim() || '';
    });
    return space;
  });
}

function renderSpaces(spaces) {
  const spaceList = document.querySelector('.space-list');
  spaceList.innerHTML = '';

  spaces.forEach((space, index) => {
    const spaceDiv = document.createElement('div');
    spaceDiv.classList.add('space');
    spaceDiv.style.backgroundColor = colori[index % colori.length];
    spaceDiv.innerHTML = `<h3>${space.Nome}</h3>`;
    spaceDiv.onclick = () => openSpaceOverlay(space);
    spaceList.appendChild(spaceDiv);
  });
}

function openSpaceOverlay(space) {
  const overlay = document.getElementById('overlay');
  const overlayDetails = document.getElementById('overlay-details');

  overlayDetails.innerHTML = `
    <div class="space-image">
      <img src="${space.Foto}" alt="${space.Nome}">
    </div>
    <h2 class="space-name">${space.Nome}</h2>
    <div class="contact-info">
      <p><strong>Contatti:</strong> ${space.Contatti}</p>
    </div>
    <div class="space-description">
      <p><strong>Descrizione:</strong> ${space.Descrizione}</p>
    </div>
    <a href="eventi.html?spazio=${encodeURIComponent(space.Nome)}">
      <button class="events-button">Scopri tutti gli eventi in programma</button>
    </a>
  `;

  overlay.style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', () => {
  loadSpaces();

  const closeBtn = document.getElementById('close-btn');
  if (closeBtn) {
    closeBtn.onclick = () => {
      document.getElementById('overlay').style.display = 'none';
    };
  }
});
