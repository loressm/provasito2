const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const playPauseBtn = document.getElementById('playPauseBtn');

let currentIndex = 0;
let playing = true;
let interval = null;

function getVisibleSlidesCount() {
    const width = window.innerWidth;
    if (width >= 1401) return 4;
    if (width >= 1001) return 3;
    if (width >= 601) return 2;
    return 1;
}

function updateSlidePosition() {
    const slideWidth = slides[0].offsetWidth;
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function nextSlide() {
    const visible = getVisibleSlidesCount();
    if (currentIndex < slides.length - visible) {
        currentIndex++;
        updateSlidePosition();
    } else {
        currentIndex = 0;
        updateSlidePosition();
    }
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlidePosition();
    } else {
        currentIndex = Math.max(0, slides.length - getVisibleSlidesCount());
        updateSlidePosition();
    }
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

window.addEventListener('resize', () => {
    updateSlidePosition();
});
prev.addEventListener('click', prevSlide);
next.addEventListener('click', nextSlide);
playPauseBtn.addEventListener('click', togglePlayPause);

// Init
updateSlidePosition();
startAutoSlide();
