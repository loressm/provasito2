/* Import dei font */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Lora:wght@400&display=swap');

/* Generale */
body {
    font-family: 'Lora', serif;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow-x: hidden;
    background-color: #000000;
}

/* Header */
header {
    background-color: #FFDD57;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    height: 80px; /* ✅ Altezza compatta come da richiesta */
    position: relative;
}

header .logo {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
}

header .logo img {
    height: 70px; /* ✅ Ridotto per stare bene con header più compatto */
    width: auto;
}

nav {
    position: absolute;
    right: 20px;
}

nav ul {
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 0;
}

nav ul li {
    margin-left: 20px;
    position: relative;
}

nav ul li a {
    color: #000;
    text-decoration: none;
    font-size: 20px;
    font-weight: bold;
    position: relative;
    padding: 10px;
}

/* Icona telefono riflessa + animazione */
.fa-phone-alt {
    display: inline-block;
    transform: scaleX(-1);
    transform-origin: center;
    transition: transform 0.3s ease;
}

nav ul li a:hover .fa-phone-alt {
    transform: scaleX(-1) scale(1.2);
}

/* Submenu */
nav ul li ul.submenu {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease, padding 0.3s ease;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #FFDD57;
    list-style: none;
    padding: 0;
    margin: 0;
    box-shadow: 0px 4px 8px rgba(0,0,0,0.2);
    z-index: 999;
    min-width: 200px;
}

nav ul li ul.submenu.open {
    max-height: 500px;
    padding: 10px 0;
}

nav ul li ul.submenu li a:hover {
    background-color: #f1c40f;
}

main {
    padding: 20px;
    background-color: #f4f4f4;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
}

.intro h2 {
    font-family: 'Playfair Display', serif;
    font-size: 32px;
    margin: 0;
    padding-bottom: 10px;
}

.intro p {
    font-family: 'Lora', serif;
    font-size: 20px;
}

/* Footer */
footer {
    background-color: #FFDD57;
    color: black;
    padding: 10px 20px;
    position: relative;
    width: 100%;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

/* Social */
.social-links {
    margin-top: 10px;
}

.social-links a {
    margin: 0 15px;
    display: inline-block;
}

.social-links img {
    width: 30px;
    height: 30px;
    transition: transform 0.3s ease-in-out;
}

.social-links img:hover {
    transform: scale(1.1);
}

/* -------------------
   Mobile Navbar
------------------- */
@media (max-width: 1280px) {
    header {
        height: 70px; /* ✅ Altezza mobile compatta */
    }

    header .logo {
        justify-content: center;
    }

    header .logo img {
        height: 70px; /* ✅ Altezza coerente anche qui */
    }

    nav ul {
        position: fixed;
        top: -100%;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: #FFDD57;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: top 0.3s ease-in-out;
        z-index: 1000;
        overflow-y: auto;
        padding: 60px 20px 20px;
        box-sizing: border-box;
    }

    nav ul.active {
        top: 0;
    }

    nav ul li {
        margin: 15px 0;
        text-align: center;
    }

    nav ul li a {
        font-size: 24px;
    }

    nav ul li ul.submenu {
        position: static;
        box-shadow: none;
        background-color: transparent;
        min-width: unset;
    }

    nav ul li ul.submenu li a {
        font-size: 20px;
        padding: 8px 10px;
    }

    .hamburger {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        width: 30px;
        height: 25px;
        z-index: 1001;
        position: absolute;
        top: 20px;
        right: 20px;
    }

    .hamburger div {
        height: 5px;
        background-color: #000;
        width: 100%;
        transition: transform 0.3s ease;
    }

    .hamburger.active div:nth-child(1) {
        transform: rotate(45deg);
        transform-origin: 5% 5%;
    }

    .hamburger.active div:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active div:nth-child(3) {
        transform: rotate(-45deg);
        transform-origin: 5% 95%;
    }

    footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        z-index: 10;
    }

    html, body {
        overflow-x: hidden;
        width: 100%;
    }
}

/* -------------------
   Submenu - Desktop versione
------------------- */
@media (min-width: 1281px) {
    nav ul li ul.submenu {
        position: absolute;
        top: 100%;
        left: 0;
        background-color: #FFDD57;
        list-style: none;
        padding: 0;
        margin: 0;
        box-shadow: 0px 4px 8px rgba(0,0,0,0.2);
        z-index: 999;
        min-width: 200px;
    }

    nav ul li ul.submenu.open {
        max-height: none;
        padding: 10px 0;
    }

    nav ul li ul.submenu li a {
        padding: 10px 20px;
        font-size: 16px;
        color: #000;
        display: block;
        white-space: nowrap;
    }

    nav ul li ul.submenu li a:hover {
        background-color: #f1c40f;
    }
}
