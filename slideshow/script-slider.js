const slides = document.querySelectorAll('.slide');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const playPauseBtn = document.getElementById('playPauseBtn');
let current = 0;
let playing = true;
let interval = null;
let slidesToShow = 3; // Numero di slide da mostrare

function updateSlidesToShow() {
    const width = window.innerWidth;
    if (width >= 1200) {
        slidesToShow = 4;
    } else if (width >= 992) {
        slidesToShow = 3;
    } else if (width >= 768) {
        slidesToShow = 2;
    } else {
       
::contentReference[oaicite:0]{index=0}
 
