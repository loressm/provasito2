// Funzione per caricare i dati dei soci da Google Sheets
async function loadMembers() {
    const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1VnZ-VHd85ajhAQWwxZOSSyry6HBoYoHiVyvlJdlPhyj8l3m8s55UJaUv6w7YMgbTL52zjxT1_vdQ/pub?gid=0&single=true&output=csv";
    
    // Mostra la clessidra
    document.getElementById('loading').style.display = 'block';
    
    const minLoadingTime = 1000; // 1 secondo di durata minima per la clessidra
    const loadingStartTime = Date.now(); // Tempo di inizio del caricamento

    try {
        const response = await fetch(sheetUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const csvData = await response.text();
        const parsedData = parseCSV(csvData);
        renderMembers(parsedData);
    } catch (error) {
        console.error("Errore durante il caricamento dei soci:", error);
    } finally {
        // Verifica il tempo di durata minima per la clessidra
        const loadingTime = Date.now() - loadingStartTime;
        const delay = Math.max(minLoadingTime - loadingTime, 0); // Calcola il tempo rimanente per raggiungere 1 secondo
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
        }, delay);
    }
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

    members.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('member');
        memberDiv.onclick = () => toggleMemberDetails(member.Nome);

        const memberHTML = `
            <h3>${member.Nome}</h3>
            <div class="member-details" id="${member.Nome}" style="display: none;">
                <div class="member-image">
                    <img src="soci/${member.Immagine}" alt="${member.Nome}">
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
