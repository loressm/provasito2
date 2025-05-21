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

    // Disabilita il bottone "prev" se siamo nel mese corrente
    const prevButton = document.getElementById('prev-month');
    const nextButton = document.getElementById('next-month');
    
    // Se siamo nel mese corrente, disabilitiamo la freccia indietro
    const now = new Date();
    if (currentYear === now.getFullYear() && currentMonth === now.getMonth()) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }

    // Disabilita il bottone "next" se siamo all'ultimo mese dell'anno corrente
    if (currentYear === now.getFullYear() && currentMonth === 11) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
}

document.getElementById('prev-month').addEventListener('click', function () {
    if (currentMonth > 0) {
        currentMonth--;
        renderCalendar();
    }
});

document.getElementById('next-month').addEventListener('click', function () {
    if (currentMonth < 11) {
        currentMonth++;
        renderCalendar();
    }
});
