// Funzione per caricare i dati dei soci da Google Sheets
async function loadMembers() {
    const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1VnZ-VHd85ajhAQWwxZOSSyry6HBoYoHiVyvlJdlPhyj8l3m8s55UJaUv6w7YMgbTL52zjxT1_vdQ/pub?gid=0&single=true&output=csv";
    const response = await fetch(sheetUrl);
    const csvData = await response.text();
    const parsedData = parseCSV(csvData);
    renderMembers(parsedData);
}

// Funzione per parsare i dati CSV
function parseCSV(csvData) {
    const rows = csvData.split('\n');
    const data = rows.map(row => row.split(','));
    const headers = data.shift(); // Prima riga contiene gli headers
    return data.map(row => {
        const member = {};
        headers.forEach((header, index) => {
            member[header.trim()] = row[index]?.trim();
        });
        return member;
    });
}

// Funzione per visualizzare i membri sulla pagina
function renderMembers(members) {
    const memberList = document.getElementById('member-list');
    memberList.innerHTML = ''; // Pulisce prima i dati esistenti

    // Array di colori allegri
    const colori = [
        '#FFDDC1', '#FFABAB', '#FFC3A0', '#FF677D', '#D4A5A5', '#392F5A',
        '#31A2AC', '#61C0BF', '#6B4226', '#D9BF77', '#ACD8AA', '#F6D02F'
    ];

    members.forEach((member, index) => {
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('member');
        memberDiv.onclick = () => toggleMemberDetails(member.Nome);

        // Applica un colore ciclico alla scheda
        const coloreCasuale = colori[index % colori.length];
        memberDiv.style.backgroundColor = coloreCasuale;
        memberDiv.style.padding = "15px";
        memberDiv.style.marginBottom = "20px";
        memberDiv.style.borderRadius = "8px";
        memberDiv.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";

        const imgUrl = `https://drive.google.com/uc?export=view&id=${member.Foto}`;

        const memberHTML = `
            <h3>${member.Nome}</h3>
            <div class="member-details" id="${member.Nome}" style="display: none; margin-top: 10px;">
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
                <a href="eventi.html?socio=${encodeURIComponent(member.Nome)}">
                    <button class="events-button">Scopri i miei spettacoli</button>
                </a>
            </div>
        `;

        memberDiv.innerHTML = memberHTML;
        memberList.appendChild(memberDiv);
    });
}

// Funzione per mostrare/nascondere i dettagli del socio
function toggleMemberDetails(member) {
    const memberDetails = document.getElementById(member);

    if (memberDetails.style.display === 'none' || memberDetails.style.display === '') {
        memberDetails.style.display = 'block';
    } else {
        memberDetails.style.display = 'none';
    }
}

// Carica i soci all'avvio della pagina
loadMembers();
