const colori = [
  '#FFDDC1', '#FFABAB', '#FFC3A0', '#FF677D',
  '#D4A5A5', '#31A2AC', '#61C0BF', '#D9BF77',
  '#ACD8AA', '#F6D02F', '#A0D995', '#A2D4F4'
];

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
    memberDiv.onclick = () => openMemberDetails(member); // Pass the entire member object

    memberDiv.style.backgroundColor = colori[index % colori.length];
    memberDiv.style.padding = '15px';
    memberDiv.style.borderRadius = '8px';
    memberDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

    memberDiv.innerHTML = `
      <h3>${member.Nome}</h3>
    `;

    memberList.appendChild(memberDiv);
  });
}

function openMemberDetails(member) {
  // Mostra l'overlay e la scheda del membro
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.appendChild(overlay);

  const memberDetails = document.createElement('div');
  memberDetails.classList.add('member-details');

  // Crea il contenuto della scheda
  memberDetails.innerHTML = `
    <button class="close-btn">×</button>
    <h2>${member.Nome}</h2>
    <div class="member-image">
      <img src="${member.Foto}" alt="${member.Nome}">
    </div>
    <div class="contact-info">
      <p><strong>Email:</strong> ${member.Contatti}</p>
    </div>
    <div class="member-description">
      <p><strong>Un po' di storia:</strong> ${member.Descrizione}</p>
    </div>
    <a href="eventi.html?socio=${encodeURIComponent(member.Nome)}">
      <button class="events-button">Scopri i miei spettacoli</button>
    </a>
  `;

  // Aggiungi la scheda al body
  document.body.appendChild(memberDetails);

  // Mostra la scheda e l'overlay con un'animazione
  overlay.style.display = 'block';
  memberDetails.classList.add('show');

  // Funzionalità di chiusura
  document.querySelector('.close-btn').addEventListener('click', () => closeMemberDetails(overlay, memberDetails));
  overlay.addEventListener('click', () => closeMemberDetails(overlay, memberDetails));
}

function closeMemberDetails(overlay, memberDetails) {
  // Rimuovi la scheda e l'overlay con transizione
  overlay.style.display = 'none';
  memberDetails.classList.remove('show');
  setTimeout(() => {
    document.body.removeChild(overlay);
    document.body.removeChild(memberDetails);
  }, 300); // Tempo per animare la chiusura
}

loadMembers();
