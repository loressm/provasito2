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
  const spaceList = document.querySelector('.space-list');
  spaceList.innerHTML = '';

  spaces.forEach((space, index) => {
    const spaceDiv = document.createElement('div');
    spaceDiv.classList.add('space');
    spaceDiv.onclick = () => toggleSpaceDetails(space.Nome);

    spaceDiv.style.backgroundColor = colori[index % colori.length];
    spaceDiv.style.padding = '15px';
    spaceDiv.style.borderRadius = '8px';
    spaceDiv.style.marginBottom = '15px';
    spaceDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

    // Usa direttamente l'URL completo da Cloudinary (inserito nella tabella)
    const imgUrl = space.Foto;

    spaceDiv.innerHTML = `<h3>${space.Nome}</h3>`;

    const spaceDetails = `
      <div class="space-details" id="${space.Nome}" style="display: none;">
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
    spaceDiv.innerHTML += spaceDetails;
    spaceList.appendChild(spaceDiv);
  });
}

function toggleSpaceDetails(spaceName) {
  const spaceDetails = document.getElementById(spaceName);
  spaceDetails.style.display = spaceDetails.style.display === 'block' ? 'none' : 'block';
}

loadSpaces();
