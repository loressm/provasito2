const colori = [
  '#FFDDC1', '#FFABAB', '#FFC3A0', '#FF677D',
  '#D4A5A5', '#31A2AC', '#61C0BF', '#D9BF77',
  '#ACD8AA', '#F6D02F', '#A0D995', '#A2D4F4'
];

// Funzione per escapare virgole e altri caratteri speciali
function escapeCommasAndSpecialChars(str) {
  return str.replace(/,/g, '&#44;') // Escapare la virgola con &#44;
            .replace(/[&<>"']/g, function(match) { // Escapare anche altri caratteri speciali
              const escapeMap = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#x27;'
              };
              return escapeMap[match];
            });
}

// Funzione per decodificare le entità HTML
function decodeHtmlEntities(str) {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

async function loadMembers() {
  const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1VnZ-VHd85ajhAQWwxZOSSyry6HBoYoHiVyvlJdlPhyj8l3m8s55UJaUv6w7YMgbTL52zjxT1_vdQ/pub?gid=0&single=true&output=csv";
  const response = await fetch(sheetUrl);
  const csvData = await response.text();
  const parsedData = parseCSV(csvData);
  renderMembers(parsedData);
}

function parseCSV(csvData) {
  const rows = csvData.split('\n');
  const data = rows.map(row => row.split(','));
  const headers = data.shift();
  return data.map(row => {
    const member = {};
    headers.forEach((header, index) => {
      member[header.trim()] = row[index]?.trim();
    });
    return member;
  });
}

function renderMembers(members) {
  const memberList = document.getElementById('member-list');
  memberList.innerHTML = '';

  members.forEach((member, index) => {
    const memberDiv = document.createElement('div');
    memberDiv.classList.add('member');
    memberDiv.onclick = () => toggleMemberDetails(member);

    memberDiv.style.backgroundColor = colori[index % colori.length];
    memberDiv.style.padding = '15px';
    memberDiv.style.borderRadius = '8px';
    memberDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

    memberDiv.innerHTML = `<h3>${member.Nome}</h3>`;

    memberList.appendChild(memberDiv);
  });
}

function toggleMemberDetails(member) {
  const overlay = document.getElementById('overlay');
  const overlayDetails = document.getElementById('overlay-details');

  // Escapa la descrizione prima di inserirla nell'HTML
  const escapedDescription = escapeCommasAndSpecialChars(member.Descrizione);

  // Decodifica la descrizione per evitare che le entità HTML siano visibili come testo
  const decodedDescription = decodeHtmlEntities(escapedDescription);

  // Usa la descrizione escapata e decodificata
  overlayDetails.innerHTML = `
    <span id="close-btn" class="close-btn">&times;</span>
    <div class="member-image">
      <img src="${member.Foto}" alt="${member.Nome}">
    </div>
    <h2 class="member-name">${member.Nome}</h2>
    <div class="contact-info">
      <p><strong>Email:</strong> ${member.Contatti}</p>
    </div>
    <div class="member-description">
      <p><strong>Un po' di storia:</strong> ${decodedDescription}</p>
    </div>
    <a href="eventi.html?socio=${encodeURIComponent(member.Nome)}">
      <button class="events-button">Scopri i miei spettacoli</button>
    </a>
  `;

  overlay.style.display = 'flex';

  // Solo la X chiude l'overlay
  document.getElementById('close-btn').onclick = () => {
    overlay.style.display = 'none';
  };
}

loadMembers();
