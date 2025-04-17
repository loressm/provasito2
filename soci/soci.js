// Eventi associati ai soci
const eventsByMember = {
    'minnie': [
        { date: '2025-06-10', description: 'Evento speciale di Minnie' },
        { date: '2025-06-15', description: 'Spettacolo di arte di Minnie' }
    ],
    'orazio': [
        { date: '2025-07-12', description: 'Discussione culturale con Orazio' },
        { date: '2025-07-05', description: 'Seminario di attivismo con Orazio' }
    ],
    'paperina': [
        { date: '2025-08-20', description: 'Musical con Paperina' },
        { date: '2025-08-10', description: 'Concerto di musica con Paperina' }
    ]
};

// Funzione per visualizzare gli eventi di un socio
function filterEvents(member) {
    const events = eventsByMember[member] || [];
    const eventBox = document.getElementById('event-box');
    eventBox.style.display = 'block';
    
    if (events.length === 0) {
        eventBox.innerHTML = 'Non ci sono eventi disponibili per questo socio.';
    } else {
        eventBox.innerHTML = events.map(event => 
            `<p><strong>${event.date}</strong>: ${event.description}</p>`
        ).join('');
    }
}

// Funzione per mostrare/nascondere i dettagli dei soci
function toggleMemberDetails(member) {
    const memberDetails = document.getElementById(member);
    
    // Controlla lo stato della visibilità e toggle
    if (memberDetails.style.display === 'none' || memberDetails.style.display === '') {
        memberDetails.style.display = 'block';
    } else {
        memberDetails.style.display = 'none';
    }
}
