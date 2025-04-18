const slides = document.querySelectorAll('.slide');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const playPauseBtn = document.getElementById('playPauseBtn');
let current = 0;
let playing = true;
let interval = null;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (window.innerWidth >= 769) {
            // Carousel: always show all, but mark center
            if (i === index) {
                slide.classList.add('active');
            }
        } else {
            // Mobile: show only one at a time
            if (i === index) {
                slide.classList.add('active');
            }
        }
    });
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
    interval = setInterval(() => {
        nextSlide();
    }, 5000);
}

window.addEventListener('resize', () => showSlide(current));
prev.addEventListener('click', prevSlide);
next.addEventListener('click', nextSlide);
playPauseBtn.addEventListener('click', togglePlayPause);

// Init
showSlide(current);
startAutoSlide();
