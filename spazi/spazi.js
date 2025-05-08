// Array di colori per personalizzare l'aspetto degli spazi
const colori = [
  '#FFDDC1', '#FFABAB', '#FFC3A0', '#FF677D',
  '#D4A5A5', '#31A2AC', '#61C0BF', '#D9BF77',
  '#ACD8AA', '#F6D02F', '#A0D995', '#A2D4F4'
];

// Funzione per caricare i dati da un foglio di Google Sheets (CSV)
async function loadSpaces() {
  const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTKGFoqjEzpP7-_q9j79iYmTI7D9aoIKs2x0J4suQ19XiVCqG-GFPll9E8dOar4A5TBKawjLikIUWxu/pub?gid=0&single=true&output=csv";
  
  try {
    // Fetch dei dati CSV
    const response = await fetch(sheetUrl);
    if (!response.ok) throw new Error("Errore nel caricamento dei dati");

    const csvData = await response.text();
    const parsedData = parseCSV(csvData);
    renderSpaces(parsedData);
  } catch (error) {
    console.error("Errore nel caricamento degli spazi:", error);
    // In caso di errore, si potrebbe mostrare un messaggio all'utente
    alert("Impossibile caricare i dati degli spazi.");
  }
}

// Funzione per fare il parsing del CSV
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

// Funzione per rendere dinamicamente gli spazi sulla pagina
function renderSpaces(spaces) {
  const spaceList = document.querySelector('.space-list');
  spaceList.innerHTML = ''; // Pulisce la lista esistente

  spaces.forEach((space, index) => {
    // Creazione del div per ogni spazio
    const spaceDiv = document.createElement('div');
    spaceDiv.classList.add('space');
    spaceDiv.onclick = () => toggleSpaceDetails(space.Nome);

    // Impostazione del colore di sfondo per ogni spazio
    spaceDiv.style.backgroundColor = colori[index % colori.length];
    spaceDiv.style.padding = '15px';
    spaceDiv.style.borderRadius = '8px';
    spaceDiv.style.marginBottom = '15px';
    spaceDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

    // URL dell'immagine (da Cloudinary)
    const imgUrl = space.Foto;

    // Impostazione del contenuto del div
    spaceDiv.innerHTML = `<h3>${space.Nome}</h3>`;

    // Dettagli aggiuntivi dello spazio
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

// Funzione per attivare o disattivare la visibilità dei dettagli dello spazio
function toggleSpaceDetails(spaceName) {
  const spaceDetails = document.getElementById(spaceName);
  spaceDetails.style.display = spaceDetails.style.display === 'block' ? 'none' : 'block';
}

// Carica gli spazi quando la pagina è pronta
loadSpaces();
