const colori = [
  '#FFDDC1', '#FFABAB', '#FFC3A0', '#FF677D',
  '#D4A5A5', '#31A2AC', '#61C0BF', '#D9BF77',
  '#ACD8AA', '#F6D02F', '#A0D995', '#A2D4F4'
];

// Funzione per sostituire '123' con una virgola
function replace123WithComma(str) {
  return str.replace(/123/g, ','); // Sostituisce '123' con ','
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

  // Sostituisce '123' con la virgola nella descrizione prima di inserirla nell'HTML
  const updatedDescription = replace123WithComma(member.Descrizione);

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
      <p><strong>Un po' di storia:</strong> ${updatedDescription}</p>
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
