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

function renderSpaces(spaces) {
  const spaceGrid = document.querySelector('.space-grid');
  spaceGrid.innerHTML = '';

  spaces.forEach((space, index) => {
    const spaceDiv = document.createElement('div');
    spaceDiv.classList.add('space-card');
    spaceDiv.onclick = () => openSpaceDetails(space);

    spaceDiv.style.backgroundColor = colori[index % colori.length];

    const imgUrl = space.Foto;

    spaceDiv.innerHTML = `
      <h3>${space.Nome}</h3>
      <div class="space-image">
        <img src="${imgUrl}" alt="${space.Nome}">
      </div>
    `;
    spaceGrid.appendChild(spaceDiv);
  });
}

function openSpaceDetails(space) {
  const modalOverlay = document.getElementById('modalOverlay');
  const modalContent = document.getElementById('modalContent');
  const modalBody = modalContent.querySelector('.modal-body');

  modalBody.innerHTML = `
    <h2>${space.Nome}</h2>
    <div class="space-image">
      <img src="${space.Foto}" alt="${space.Nome}">
    </div>
    <p><strong>Indirizzo:</strong> ${space.Indirizzo}</p>
    <p><strong>Telefono:</strong> ${space.Telefono}</p>
    <p><strong>Email:</strong> ${space.Email}</p>
    <p><strong>Descrizione:</strong> ${space.Descrizione}</p>
    <a href="eventi.html?spazio=${encodeURIComponent(space.Nome)}">
      <button class="events-button">Scopri tutti gli eventi in programma</button>
    </a>
  `;

  modalOverlay.style.display = 'flex';
}

document.getElementById('modalClose').onclick = () => {
  document.getElementById('modalOverlay').style.display = 'none';
};

loadSpaces();
