// Funzione per renderizzare il calendario
function renderCalendar() {
    const eventBox = document.getElementById('event-box');
    const expandButton = document.getElementById('expand-button');
    eventBox.style.display = 'none';
    
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const monthName = monthNames[currentMonth];
    document.getElementById('calendar-title').textContent = `Scopri gli eventi di ${monthName} ${currentYear}`;
    const numDays = lastDay.getDate();
    let calendarHtml = '';

    // Intestazione giorni della settimana
    for (let i = 0; i < weekdays.length; i++) {
        calendarHtml += `<div class="day">${weekdays[i].slice(0, 3)}</div>`;
    }

    const firstDayOfWeek = (firstDay.getDay() + 6) % 7;
    for (let i = 0; i < firstDayOfWeek; i++) {
        calendarHtml += `<div class="day"></div>`;
    }

    let hasManyEvents = false;

    for (let day = 1; day <= numDays; day++) {
        const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const hasEvent = events[dateStr] ? 'highlighted' : '';
        
        if (events[dateStr] && events[dateStr].description.length > 200) {
            hasManyEvents = true;
        }

        calendarHtml += `<div class="day ${hasEvent}" data-date="${dateStr}">${day}</div>`;
    }

    const lastDayOfWeek = (firstDay.getDay() + numDays) % 7;
    for (let i = lastDayOfWeek; i < 6; i++) {
        calendarHtml += `<div class="day"></div>`;
    }

    document.getElementById('calendar').innerHTML = calendarHtml;

    if (hasManyEvents) {
        expandButton.style.display = 'inline-block';
    }

    // Logica per disabilitare i bottoni di navigazione
    const prevButton = document.getElementById('prev-month');
    const nextButton = document.getElementById('next-month');

    // Ottieni la data attuale
    const now = new Date();
    
    // Se siamo nel mese corrente, disabilitiamo il bottone "prev"
    if (currentYear === now.getFullYear() && currentMonth === now.getMonth()) {
        prevButton.disabled = true;  // Non si può andare indietro nel mese corrente
    } else {
        prevButton.disabled = false; // Si può andare indietro se non siamo nel mese corrente
    }

    // Se siamo nell'anno corrente e a dicembre, disabilitiamo il bottone "next"
    if (currentYear === now.getFullYear() && currentMonth === 11) {
        nextButton.disabled = true;  // Non si può andare avanti oltre dicembre
    } else {
        nextButton.disabled = false; // Si può andare avanti se non siamo a dicembre
    }
}

// Funzione per andare al mese precedente
document.getElementById('prev-month').addEventListener('click', function () {
    const now = new Date();
    if (currentYear === now.getFullYear() && currentMonth > now.getMonth()) {
        currentMonth--;
        renderCalendar();
    }
});

// Funzione per andare al mese successivo
document.getElementById('next-month').addEventListener('click', function () {
    const now = new Date();
    if (currentYear === now.getFullYear() && currentMonth < 11) {
        currentMonth++;
        renderCalendar();
    }
});
