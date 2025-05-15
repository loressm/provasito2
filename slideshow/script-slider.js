// Selezioniamo gli elementi necessari
const slidesContainer = document.getElementById('slider');
const slideText = document.getElementById('slideText');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const playPauseBtn = document.getElementById('playPauseBtn');
let current = 0;
let playing = true;
let interval = null;

// Funzione per ottenere i dati dal CSV su Google Sheets
async function fetchCSVData() {
    const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQMgG9UeVL1HF1cA7jxgiyHOkwfG0vXInmrOahPMVjQxLpzalsM6Cc2l8b-InjvYNrHpyxAOO2nq1sP/pub?gid=0&single=true&output=csv');
    const data = await response.text();
    const parsedData = parseCSV(data);
    return parsedData;
}

// Funzione per parsare il CSV
function parseCSV(data) {
    const lines = data.split('\n');
    const result = [];
    lines.forEach(line => {
        const [text, image] = line.split(',');
        if (text && image) {
            result.push({ text: text.trim(), image: image.trim() });
        }
    });
    return result;
}

// Funzione per mostrare la slide
function showSlide(index, slides) {
    const slide = slides[index];
    // Aggiungi l'immagine
    const imgElement = document.createElement('img');
    imgElement.src = slide.image;
    imgElement.alt = `Slide ${index + 1}`;
    imgElement.classList.add('slide');
    
    slidesContainer.innerHTML = ''; // Svuotiamo la sezione slider per la nuova immagine
    slidesContainer.appendChild(imgElement);

    // Aggiorniamo il testo
    slideText.textContent = slide.text;
}

// Funzione per la slide successiva
function nextSlide(slides) {
    current = (current + 1) % slides.length;
    showSlide(current, slides);
}

// Funzione per la slide precedente
function prevSlide(slides) {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current, slides);
}

// Funzione per alternare play/pause
function togglePlayPause(slides) {
    playing = !playing;
    playPauseBtn.innerHTML = playing ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    if (playing) {
        startAutoSlide(slides);
    } else {
        clearInterval(interval);
    }
}

// Funzione per far partire lo slideshow automaticamente
function startAutoSlide(slides) {
    clearInterval(interval);
    interval = setInterval(() => nextSlide(slides), 5000);
}

// Inizializziamo lo slideshow
async function initSlider() {
    const slides = await fetchCSVData(); // Otteniamo i dati
    showSlide(current, slides); // Mostra la prima slide

    prev.addEventListener('click', () => prevSlide(slides));
    next.addEventListener('click', () => nextSlide(slides));
    playPauseBtn.addEventListener('click', () => togglePlayPause(slides));

    startAutoSlide(slides); // Avvia lo slideshow automatico
}

// Carica lo slideshow
initSlider();
