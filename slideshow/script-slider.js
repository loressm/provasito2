let slidesData = []; // Array che conterrà i dati delle slide
const slideText = document.getElementById('slideText');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const playPauseBtn = document.getElementById('playPauseBtn');
let current = 0;
let playing = true;
let interval = null;

// Funzione per sostituire '123' con una virgola
function replace123WithComma(str) {
    return str.replace(/123/g, ','); // Sostituisce '123' con ','
}

// Funzione per caricare i dati dinamici dal CSV
async function loadSlides() {
    const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQMgG9UeVL1HF1cA7jxgiyHOkwfG0vXInmrOahPMVjQxLpzalsM6Cc2l8b-InjvYNrHpyxAOO2nq1sP/pub?gid=0&single=true&output=csv";
    const response = await fetch(sheetUrl);
    const csvData = await response.text();
    const parsedData = parseCSV(csvData);
    slidesData = parsedData;
    renderSlides();
    showSlide(current);
    startAutoSlide();
}

// Funzione per analizzare i dati CSV
function parseCSV(csvData) {
    const rows = csvData.split('\n');
    const data = rows.map(row => row.split(','));
    const headers = data.shift(); // Prende la prima riga come intestazione
    return data.map(row => {
        const slide = {};
        headers.forEach((header, index) => {
            slide[header.trim()] = row[index]?.trim();
        });
        return slide;
    });
}

// Funzione per mostrare la slide attuale
function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });

    // Aggiorna il testo dinamicamente
    const testo = slidesData[index]?.Testo || 'Testo non disponibile';
    slideText.textContent = replace123WithComma(testo); // Usa la funzione per sostituire '123' con la virgola
}

// Funzione per passare alla slide successiva
function nextSlide() {
    current = (current + 1) % slidesData.length;
    showSlide(current);
}

// Funzione per passare alla slide precedente
function prevSlide() {
    current = (current - 1 + slidesData.length) % slidesData.length;
    showSlide(current);
}

// Funzione per alternare play e pause
function togglePlayPause() {
    playing = !playing;
    playPauseBtn.innerHTML = playing ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    if (playing) {
        startAutoSlide();
    } else {
        clearInterval(interval);
    }
}

// Funzione per avviare la slideshow automatica
function startAutoSlide() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 5000);
}

// Ascolta gli eventi di resize per ricalcolare la slide
window.addEventListener('resize', () => showSlide(current));
prev.addEventListener('click', prevSlide);
next.addEventListener('click', nextSlide);
playPauseBtn.addEventListener('click', togglePlayPause);

// Funzione per renderizzare le immagini nella slideshow
function renderSlides() {
    const sliderContainer = document.getElementById('slider');
    sliderContainer.innerHTML = ''; // Pulisce la slideshow prima di riempirla con i nuovi dati

    slidesData.forEach((slide, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.classList.add('slide');
        if (index === 0) slideDiv.classList.add('active'); // Prima slide visibile

        const imgElement = document.createElement('img');
        imgElement.src = slide.Foto; // Aggiunge l'URL dell'immagine
        imgElement.alt = `Slide ${index + 1}`;
        slideDiv.appendChild(imgElement);

        sliderContainer.appendChild(slideDiv);
    });
}

// Inizializza la slideshow
loadSlides();
