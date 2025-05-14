const slides = document.querySelectorAll('.slide');
const slideText = document.getElementById('slideText');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const playPauseBtn = document.getElementById('playPauseBtn');
let current = 0;
let playing = true;
let interval = null;

const slideDescriptions = [
    "Questo è un testo di prova dell'immagine1",
    "Questo è un testo di prova dell'immagine2",
    "Questo è un testo di prova dell'immagine3"
];

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });

    // Aggiorna il testo
    slideText.textContent = slideDescriptions[index];
}

function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
}

function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
}

function togglePlayPause() {
    playing = !playing;
    playPauseBtn.innerHTML = playing ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    if (playing) {
        startAutoSlide();
    } else {
        clearInterval(interval);
    }
}

function startAutoSlide() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 5000);
}

window.addEventListener('resize', () => showSlide(current));
prev.addEventListener('click', prevSlide);
next.addEventListener('click', nextSlide);
playPauseBtn.addEventListener('click', togglePlayPause);

// Init
showSlide(current);
startAutoSlide();
