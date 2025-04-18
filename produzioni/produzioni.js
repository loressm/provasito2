const colori = [
  '#FFDDC1', '#FFABAB', '#FFC3A0', '#FF677D',
  '#D4A5A5', '#31A2AC', '#61C0BF', '#D9BF77',
  '#ACD8AA', '#F6D02F', '#A0D995', '#A2D4F4'
];

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
  const productionList = document.querySelector('.production-list');
  productionList.innerHTML = '';

  productions.forEach((production, index) => {
    const productionDiv = document.createElement('div');
    productionDiv.classList.add('production');
    productionDiv.onclick = () => toggleProductionDetails(production.Nome);

    productionDiv.style.backgroundColor = colori[index % colori.length];
    productionDiv.style.padding = '15px';
    productionDiv.style.borderRadius = '8px';
    productionDiv.style.marginBottom = '15px';
    productionDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

    // Usa direttamente il link completo Cloudinary dalla colonna Foto
    const imgUrl = production.Foto;

    productionDiv.innerHTML = `<h3>${production.Nome}</h3>`;

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
    productionList.appendChild(productionDiv);
  });
}

function toggleProductionDetails(productionName) {
  const productionDetails = document.getElementById(productionName);
  productionDetails.style.display = productionDetails.style.display === 'block' ? 'none' : 'block';
}

loadProductions();
