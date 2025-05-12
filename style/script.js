// Choisissez la langue par défaut (ici 'en' pour anglais)
let currentLanguage = 'fr';

const translations = {
    fr: {
        days: {
            0: "Dimanche",
            1: "Lundi",
            2: "Mardi",
            3: "Mercredi",
            4: "Jeudi",
            5: "Vendredi",
            6: "Samedi"
        },
        months: {
            0: "Janvier",
            1: "Février",
            2: "Mars",
            3: "Avril",
            4: "Mai",
            5: "Juin",
            6: "Juillet",
            7: "Août",
            8: "Septembre",
            9: "Octobre",
            10: "Novembre",
            11: "Décembre"
        },
        content: {
            pressA: "Appuyez sur A",
            pressB: "Appuyez sur B",
            defaut: "~/3ds/defauts",
            error: "ERREUR 404"
        },
        loading: {
            text: "Nintendo 3DS",
            status: "Chargement en cours..."
        },
        boot: {
            healthWarning: "WARNING\n\nLIRE LA NOTICE D'UTILISATION",
        }
    },
    en: {
        days: {
            0: "Sunday",
            1: "Monday",
            2: "Tuesday",
            3: "Wednesday",
            4: "Thursday",
            5: "Friday",
            6: "Saturday"
        },
        months: {
            0: "January",
            1: "February",
            2: "March",
            3: "April",
            4: "May",
            5: "June",
            6: "July",
            7: "August",
            8: "September",
            9: "October",
            10: "November",
            11: "December"
        },
        content: {
            pressA: "Press A",
            pressB: "Press B",
            defaut: "~/3ds/defaults",
            error: "ERROR 404"
        },
        loading: {
            text: "Nintendo 3DS",
            status: "Loading..."
        },
        boot: {
            healthWarning: "WARNING\n\nREAD THE PRECAUTIONS BOOKLET"
        }
    }
};

// Gestion du changement de langue (assurez-vous d'avoir un élément avec l'id "languageSelect")
document.getElementById('languageSelect').addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    displayDay();
    updateTopScreenContent(swiper.realIndex);
});

// Animation de démarrage lorsque la DS "boot"
document.addEventListener('DOMContentLoaded', function() {
    if (!sessionStorage.getItem('dsBooted')) {
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="ds-boot-sequence">
                <img src="./image/nintendo-ds-vector-logo.png" class="nintendo-logo-image" alt="Nintendo DS Logo">
                <div class="health-warning">
                    ${translations[currentLanguage].boot.healthWarning}
                </div>
                <div class="boot-loading">
                    <div class="boot-bar"></div>
                </div>
            </div>
        `;
        
        setTimeout(() => {
            updateTopScreenContent(swiper.realIndex);
            sessionStorage.setItem('dsBooted', 'true');
        }, 1800);
    }
});

// Action du bouton A (exemple)
function selectAction() {
    const content = document.getElementById('content');
    content.innerHTML = "<p>Action 'OK' sélectionnée.</p>";
}

// Action du bouton B (exemple)
function goBack() {
    const content = document.getElementById('content');
    content.innerHTML = "<p>Retour à la section précédente.</p>";
}

// Configuration de Swiper pour la navigation (assurez-vous que Swiper est correctement importé)
const swiper = new Swiper('.card-wrapper', {
    loop: true,
    spaceBetween: 30,
    navigation: {
        nextEl: '.arrow-right',
        prevEl: '.arrow-left',
    },
    centeredSlides: true,
    breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
    },
    on: {
        slideChangeTransitionEnd: function () {
            updateTopScreenContent(this.realIndex); 
        },
    },
});

// Fonction retournant une courbe d'animation aléatoire
function getRandomCubicBezier() {
    const randomPoint = () => Math.random().toFixed(2);
    return `cubic-bezier(${randomPoint()}, ${randomPoint()}, ${randomPoint()}, ${randomPoint()})`;
}

let canLoadContent = false;

// Affiche l'écran "Press A"
function showPressAScreen() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="press-a-screen">
            <div class="press-a-text" id="pressa">
                ${translations[currentLanguage].content.pressA}
            </div>
        </div>
    `;
    pressA();
}

// Permet de déclencher l'action (exemple)
function selectAction() {
    if (!canLoadContent) {
        canLoadContent = true;
        updateTopScreenContent(swiper.realIndex);
    }
}

// Mise à jour du contenu du top screen en fonction de l'index
function updateTopScreenContent(index) {
    const content = document.getElementById('content');
    const topScreen = document.getElementById('topScreen');
    topScreen.classList.add('trois-ds');
    
    if (index === 3) {
        topScreen.classList.add('top-screen-expanded');
        topScreen.classList.remove('top-screen-default');
    } else {
        topScreen.classList.add('top-screen-default');
        topScreen.classList.remove('top-screen-expanded');
    }

    if (!canLoadContent) {
        showPressAScreen();
        return;
    }

    content.innerHTML = `
        <div class="ds-loading">
            <div class="loading-text">${translations[currentLanguage].loading.text}</div>
            <div class="loading-bar-container">
                <div class="loading-bar" style="animation: loadingProgress 2s ${getRandomCubicBezier()} forwards;"></div>
            </div>
            <div class="loading-status">${translations[currentLanguage].loading.status}</div>
        </div>
    `;

    setTimeout(() => {
        switch (index) {
            case 0:
                var img = document.createElement("img");
                img.src = "image/cv_noah.png";
                img.style.width = "530px";
                img.style.marginBottom = "-10px";
                content.innerHTML = "";
                content.appendChild(img);
                
                var downloadButton = document.createElement("div");
                downloadButton.className = "cv-download-button";
                downloadButton.innerHTML = `
                    <div class="sm-mg-top sm-mg-bot">
                        <a href="./stage/cv_2025_LEJOLIVET_Noah.pdf" download class="download-cv-link">
                            <button type="button" class="nes-btn is-success">Télécharger</button>
                        </a>
                    </div>
                `;
                content.appendChild(downloadButton);
                
                canLoadContent = false;
                break;

            case 1:
                content.innerHTML = `
                    <div class="error-404-ds">
                        <div class="error-header" id="error">
                            ${translations[currentLanguage].content.error}
                        </div>
                        <img src="./image/warning.png" alt="warning icon" class="warning-icon">
                        <div class="error-message" id="defaut"></div>
                        <div class="error-footer">
                            <br>
                            <div id="pressB"></div>
                        </div>
                    </div>
                `;
                errorPageContentLanguage();
                canLoadContent = false;
                break;

            case 2:
                content.innerHTML = `
                    <div class="skills-page">
                        <h2>SKILLS.NES</h2>
                        <div class="skill-item">
                            <img src="./image/js-icon.png" class="skill-icon">
                            <span class="skill-name">JavaScript</span>
                            <div class="skill-level">
                                <div class="skill-progress" data-level="60"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <img src="./image/react-icon.png" class="skill-icon">
                            <span class="skill-name">React</span>
                            <div class="skill-level">
                                <div class="skill-progress" data-level="80"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <img src="./image/css.png" class="skill-icon">
                            <span class="skill-name">CSS</span>
                            <div class="skill-level">
                                <div class="skill-progress" data-level="60"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <img src="./image/php.png" class="skill-icon">
                            <span class="skill-name">PHP</span>
                            <div class="skill-level">
                                <div class="skill-progress" data-level="50"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <img src="./image/python.png" class="skill-icon">
                            <span class="skill-name">PYTHON</span>
                            <div class="skill-level">
                                <div class="skill-progress" data-level="80"></div>
                            </div>
                        </div>
                    </div>
                `;
                canLoadContent = false;
                break;

            case 3:
                content.innerHTML = `
                    <div class="stage-container">
                        <div class="stage-content-wrapper">
                            <div id="stageContent" class="stage-content">
                                <div class="stage-buttons">
                                    <button id="stageSN1" class="nes-btn is-primary">Stage SN1</button>
                                    <button id="stageSN2" class="nes-btn is-warning">Stage SN2</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                document.getElementById('stageSN1').addEventListener('click', () => {
                    showStageReport('sn1');
                });
                
                document.getElementById('stageSN2').addEventListener('click', () => {
                    showStageReport('sn2');
                });
                
                canLoadContent = false;
                break;

            case 4:
                content.innerHTML = `
                    <div class="projects-container">
                        <div class="project-card">
                            <img src="./image/projects_image/laptop.png" alt="Projet 1" class="project-image">
                            <h3 class="project-title">Portfolio</h3>
                            <p class="project-description">
                                Portfolio personnel avec un style type Nintendo DS, oui celui-là...
                            </p>
                            <a href="https://gitlab.com/noah_ljvt/myportfolio" target="_blank" class="project-link nes-btn is-primary">
                                Voir sur GitLab
                            </a>
                        </div>
                        <div class="project-card">
                            <img src="./image/projects_image/burger.png" alt="Projet 2" class="project-image">
                            <h3 class="project-title">Crazy Burger</h3>
                            <p class="project-description">
                                Projet BTS, application de terminal de fastfood en ReactJS.
                            </p>
                            <a href="https://gitlab.com/noah_ljvt/crazy-burger" target="_blank" class="project-link nes-btn is-primary">
                                Voir sur GitLab
                            </a>
                        </div>
                        <div class="project-card">
                            <img src="./image/projects_image/trading.png" alt="Projet 3" class="project-image">
                            <h3 class="project-title">Trading Indicators App</h3>
                            <p class="project-description">
                                Projet BTS, application d'indicateurs de trading. Branche du même projet mais version app (initialement web)
                            </p>
                            <a href="https://gitlab.com/noah_ljvt/trading_indicator/-/tree/build/executable-version?ref_type=heads" target="_blank" class="project-link nes-btn is-primary">
                                Voir sur GitLab
                            </a>
                        </div>
                        <div class="project-card">
                            <img src="./image/projects_image/python.png" alt="Projet 4" class="project-image">
                            <h3 class="project-title">Trading Bots (Python only)</h3>
                            <p class="project-description">
                                Projet annexe des cours, bots de trading en python pour un trader indépendant. Tout le projet n'est pas accessible pour des causes de confidentialité
                            </p>
                            <a href="https://gitlab.com/noah_ljvt/trading_bots" target="_blank" class="project-link nes-btn is-primary">
                                Voir sur GitLab
                            </a>
                        </div>
                        <div class="project-card-full">
                            <img src="./image/projects_image/laptop.png" alt="Mon GitLab" class="project-image">
                            <h3 class="project-title">Mes autres projets</h3>
                            <p class="project-description">
                                Vous allez pouvoir retrouver mes autres projets sur mon GitLab.
                                Actuellement il y a une Trentaine de projets sur mon GitLab, la majorité me servent d'entrainement notamment en cours, ou pour des évaluations. Une dizaine seulement sont des projets réels.
                                Par la suite vous risquez de retrouver beaucoup de dépôts en lien avec le trading car de gros projets sont en préparation.
                            </p>
                            <a href="https://gitlab.com/noah_ljvt/" target="_blank" class="project-link nes-btn is-warning">
                                Mon GitLab
                            </a>
                        </div>
                    </div>
                `;
                canLoadContent = false;
                break;

            case 5:
            content.innerHTML = `
            <div class="projects-container">
                <div class="project-card-full">
                <h3 class="project-title">Journal de veille informatique</h3>
                <p><strong>Période :</strong> 2023 – 2025</p>
                <p><strong>Étudiant :</strong> Lejolivet Noah</p>
                <hr>
                <h4 class="project-subtitle">Objectif</h4>
                <p>Anticiper les tendances IT et alimenter mes projets avec des infos fiables et récentes.</p>
                <h4 class="project-subtitle">Source principale</h4>
                <p><strong>The Wall Street Journal</strong> (rubriques : Technology, Business, Markets, Enterprise)</p>
                <h4 class="project-subtitle">Preuve de veille</h4>
                <p> cliquez sur l'image pour accéder à la preuve de veille d'un article de tech </p>
                <div class="project-image-wrapper" style="text-align:center; margin-top:1rem;">
                    <a 
                    href="./wsj-proof-of-subscribtion.png" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    >
                    <img
                        src="./wsj-proof-of-subscribtion.png"
                        alt="Capture d'écran WSJ"
                        class="project-image-wsj"
                        style="max-width:100%; height:auto; border:1px solid #888;"
                    />
                    </a>
                </div>
                </div>
            </div>
            `;
            canLoadContent = false;
            break;



            default:
                content.innerHTML = "<p>Bienvenue sur mon portfolio interactif.</p>";
                canLoadContent = false;
                break;
        }
    }, 2000);
}

// Affiche le rapport de stage dans un iframe via Google Docs
function showStageReport(stageType) {
    const stageContent = document.getElementById('stageContent');
    const reportURLs = {
        sn1: "https://docs.google.com/document/d/1Y_fBHWdvbcvcwQSDwGAhtAt5S4qjaxZDYznedHR4uEM/edit?usp=sharing",
        sn2: "https://docs.google.com/document/d/1T5kp0xoeQmgYYONOQHeywCjRaFtiA7VcQycjeUt2-bw/edit?usp=sharing"
    };
    const reportTitles = {
        sn1: "Rapport de Stage SN1",
        sn2: "Rapport de Stage SN2"
    };
    
    stageContent.innerHTML = `
        <h3 class="nes-text is-primary">${reportTitles[stageType]}</h3>
        <div class="report-actions">
            <a href="${reportURLs[stageType]}" target="_blank" class="nes-btn is-success">
                Ouvrir dans Google Docs
            </a>
        </div>
        <iframe 
            src="${reportURLs[stageType]}?embedded=true" 
            width="100%" 
            height="400px"
            frameborder="0"
            allowfullscreen="true"
            mozallowfullscreen="true"
            webkitallowfullscreen="true">
        </iframe>
    `;
    
    // Mise à jour visuelle des boutons
    document.querySelectorAll('.stage-button').forEach(btn => {
        btn.classList.remove('is-success');
        if (btn.id === 'stageSN1') btn.classList.add('is-primary');
        if (btn.id === 'stageSN2') btn.classList.add('is-warning');
    });
    
    if (stageType === 'sn1') {
        document.getElementById('stageSN1').classList.remove('is-primary');
        document.getElementById('stageSN1').classList.add('is-success');
    } else {
        document.getElementById('stageSN2').classList.remove('is-warning');
        document.getElementById('stageSN2').classList.add('is-success');
    }
}

// Appel initial pour afficher le contenu en fonction de l'image active au chargement
updateTopScreenContent(swiper.realIndex);

// Affiche l'heure
function displayTime() {
    const d = new Date();
    let hour = d.getHours();
    let minute = d.getMinutes();
    if (minute < 10) {
        minute = "0" + minute;
    }
    const time = document.getElementById("time");
    time.innerHTML = hour + ":" + minute;
}

// Affiche le jour et la date selon la langue
function displayDay() {
    const d = new Date();
    const day = d.getDay();
    const monthNumber = d.getMonth();
    const dayNumber = d.getDate();
    const layoutday = document.getElementById("day");
    layoutday.innerHTML = translations[currentLanguage].days[day] + ' ' + dayNumber + ' ' + translations[currentLanguage].months[monthNumber];
}

// Met à jour le contenu de la page d'erreur
function errorPageContentLanguage() {
    document.getElementById("pressB").innerHTML = translations[currentLanguage].content.pressB;
    document.getElementById("defaut").innerHTML = translations[currentLanguage].content.defaut;
    document.getElementById("error").innerHTML = translations[currentLanguage].content.error;
}

// Met à jour l'écran "Press A"
function pressA() {
    document.getElementById("pressa").innerHTML = translations[currentLanguage].content.pressA;
}

// Crée une image flottante aléatoire
function createFloatingImage() {
    const image = document.createElement('img');
    image.src = `../myportfolio/image/floating/${Math.floor(Math.random() * 5)}.png`;
    image.classList.add('floating-image');
    image.style.left = `${Math.random() * 100}vw`;
    image.style.top = `${Math.random() * 100}vh`;
    const angle = Math.random() * 360;
    const speed = 1 + Math.random() * 2;
    const rotationSpeed = (Math.random() - 0.5) * 2;
    let rotation = 0;
    let currentX = parseFloat(image.style.left);
    let currentY = parseFloat(image.style.top);
    document.body.appendChild(image);
    
    setInterval(() => {
        currentX += Math.cos(angle * Math.PI / 180) * speed;
        currentY += Math.sin(angle * Math.PI / 180) * speed;
        rotation += rotationSpeed;
        image.style.left = `${currentX}px`;
        image.style.top = `${currentY}px`;
        image.style.transform = `rotate(${rotation}deg)`;
        if (currentX > window.innerWidth || currentX < -50 || 
            currentY > window.innerHeight || currentY < -50) {
            currentX = Math.random() * window.innerWidth;
            currentY = Math.random() * window.innerHeight;
        }
    }, 50);
}

// JS for the popup system for CGU
const modal = document.getElementById("cguModal");
  const openBtn = document.getElementById("openCgu");
  const closeBtn = document.getElementById("closeCgu");

  // Ouvrir la popup au clic sur le lien
  openBtn.addEventListener("click", function(e) {
    e.preventDefault();
    modal.style.display = "block";
  });

  // Fermer la popup lors du clic sur la croix
  closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
  });

  // Fermer la popup en cliquant en dehors du contenu
  window.addEventListener("click", function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

// Création de plusieurs images flottantes
for (let i = 0; i < 10; i++) {
    createFloatingImage();
}

// Affichage de l'heure et du jour, puis mise à jour périodique
displayTime();
displayDay();
setInterval(displayTime, 3000);
setInterval(displayDay, 60000);
