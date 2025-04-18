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
  const headers = data.shift(); // La prima riga contiene gli header
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
  memberList.innerHTML = ''; // Pulisce i dati esistenti

  members.forEach((member, index) => {
    const memberDiv = document.createElement('div');
    memberDiv.classList.add('member');
    memberDiv.onclick = () => toggleMemberDetails(member.Nome);

    // Assegna un colore casuale dall'array colori
    memberDiv.style.backgroundColor = colori[index % colori.length];
    memberDiv.style.padding = '15px';
    memberDiv.style.borderRadius = '8px';
    memberDiv.style.marginBottom = '15px';
    memberDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

    // URL per la foto del socio, ora caricato da Cloudinary
    const imgUrl = member.Foto;  // Assumiamo che 'Foto' contenga già l'URL di Cloudinary

    memberDiv.innerHTML = `
      <h3>${member.Nome}</h3>
      <div class="member-details" id="${member.Nome}" style="display: none;">
        <div class="member-image">
          <img src="${imgUrl}" alt="${member.Nome}">
        </div>
        <h2 class="member-name">${member.Nome}</h2>
        <div class="contact-info">
          <p><strong>Email:</strong> ${member.Contatti}</p>
        </div>
        <div class="member-description">
          <p><strong>Un po' di storia:</strong> ${member.Descrizione}</p>
        </div>
        <a href="eventi.html?socio=${member.Nome}">
          <button class="events-button">Scopri i miei spettacoli</button>
        </a>
      </div>
    `;

    memberList.appendChild(memberDiv);
  });
}

function toggleMemberDetails(member) {
  const memberDetails = document.getElementById(member);
  memberDetails.style.display = memberDetails.style.display === 'block' ? 'none' : 'block';
}

loadMembers();
