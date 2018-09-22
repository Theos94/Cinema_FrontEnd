const projekcijeWrapper = document.querySelector(".projekcije__kontejner--wrapper");
const kalendarProjekcijeKontejner = document.querySelector(".kalendar__projekcije--kontejner");

const searchOverlay = document.querySelector(".overlay__search")
const searchBtn = document.getElementById("searchBtn");
const siteWrapper = document.querySelector(".site__wrapper")
const closeSearchOverlay = document.querySelector(".overlay__search--close");

const userBtn = document.getElementById("userBtn");
const userOverlay = document.querySelector(".overlay__user");

function loadEventListeners() {
    searchBtn.addEventListener("click", () => {
        searchOverlay.classList.add("active");
        siteWrapper.classList.add("active");
    })
    closeSearchOverlay.addEventListener("click", () => {
        searchOverlay.classList.remove("active");
        siteWrapper.classList.remove("active");
    })

    userBtn.addEventListener("click", () => {
        userOverlay.classList.toggle("active");
    })
}

loadEventListeners();

function populisiKalendar() {
    let projekcije;
    if (localStorage.getItem("projekcije") === null) {
        projekcije = [];
    } else {
        projekcije = JSON.parse(localStorage.getItem("projekcije"));
    }

    let datumi = [];

    projekcije.forEach(film => {
        film.projekcije.forEach(projekcija => {
            if ( !datumi.includes(projekcija.datum) ) {
                datumi.push(projekcija.datum);
                datumi.sort();
            }
        })
    })

    datumi.forEach(datum => {
            if ( document.querySelector(`[data-datum="${datum}"]`) === null) {
                const noviKont = document.createElement("div");
                const projekcijeKalendar = document.createElement("div");
                projekcijeKalendar.setAttribute("data-datum", `${datum}`);
                projekcijeKalendar.classList.add("kalendar__projekcija");
                projekcijeKalendar.innerHTML = `
                <i class="fa fa-calendar"></i>
                <h4>${datum}</h4>
                `
                projekcijeKalendar.addEventListener("click", function() {
                    promeniAktivno(this, datum);
                } )
                kalendarProjekcijeKontejner.appendChild(projekcijeKalendar);
                noviKont.setAttribute("data-datum", `${datum}`);
                noviKont.classList.add("projekcija__kontejner");
                projekcijeWrapper.appendChild(noviKont);

            } else {
                return;
            }
    });
}

populisiKalendar();

let datumi = [];
function popuniDatume() {

        let kontejneri = document.querySelectorAll(".projekcija__kontejner");
        kontejneri.forEach(kontejner => {
        datumi.push(kontejner.dataset.datum);
        popuniKontejnere(kontejner, kontejner.dataset.datum)

    });
}


popuniDatume();

function promeniAktivno(element, datum) {
    const projekcija = document.querySelector(`.projekcija__kontejner[data-datum='${datum}']`);
    let projekcije = document.querySelectorAll(".projekcija__kontejner");
    let kalendari = document.querySelectorAll(".kalendar__projekcija");
    projekcije.forEach(projekcija => {
        projekcija.classList.remove("active");
    });
    kalendari.forEach(kalendar => {
        kalendar.classList.remove("active");
    });
    element.classList.toggle("active");
    projekcija.classList.toggle("active");
}

defaultDatum();
function defaultDatum() {
    let defaultDate = datumi[0];
    let kalendar = document.querySelector(`.kalendar__projekcija[data-datum="${defaultDate}"]`);
    let projekcijeKont = document.querySelector(`.projekcija__kontejner[data-datum='${defaultDate}']`);
    kalendar.classList.add("active");
    projekcijeKont.classList.add("active");
}

function popuniKontejnere(element, datum) {
    let projekcijaKontejner = element;

    let projekcije;
    if (localStorage.getItem("projekcije") === null) {
        projekcije = [];
    } else {
        projekcije = JSON.parse(localStorage.getItem("projekcije"));
    }

    projekcije.forEach((film, index) => {
        let div = document.createElement("div");
        div.classList.add("film");
        div.innerHTML = `
        <div class="poster">
            <img src=${film.poster} alt="Poster Img">
        </div>
        <div class="tekst">
            <h2>${film.naziv}</h2>
            <h4><span>Trajanje:</span> ${film.trajanje}</h3>
            <h4><span>Zanr:</span> ${film.zanr}</h3>
            <h4><span>Cena:</span> ${film.cena}</h3>
            <h4><span>Opis:</span> ${film.opis}</h3>

            <div class="buttons">
            <a target="_blank" href=${film.imdb}>IMDB</a>
            <a target="_blank" href=${film.trailer}>TRAILER</a>
            </div>
        </div>
        <div class="projekcije" id="${film.id + datum}">

        </div>
        `
        film.projekcije.forEach(projekcija => {
            if(datum === projekcija.datum) {
                projekcijaKontejner.appendChild(div);
                let projekcijeKontejner = document.getElementById(`${film.id + datum}`);
                let projekcijaDiv = document.createElement("div");
                projekcijaDiv.classList.add("projekcija");
                projekcijaDiv.innerHTML = `
                <h4>${projekcija.pocetak}</h4>
                <h4>Sala: ${projekcija.sala}</h4>
                <h4>${projekcija.slobodno}/${projekcija.mesta}</h4>
                `
                projekcijeKontejner.appendChild(projekcijaDiv);
            }
        });
    });
}



const navProjekcije = document.getElementById("navProjekcije");
const navKorisnici = document.getElementById("navKorisnici");
const overlayUserPrijava = document.querySelector(".overlay__user--prijava");
const overlayUserUlogovan = document.querySelector(".overlay__user--ulogovan");


function proveriLogovanje() {
    let ulogovan;
    if(localStorage.getItem("ulogovan") === null) {
        console.log("Niko nije Ulogovan");
    } else {
        ulogovan = localStorage.getItem("ulogovan");
    }


    if(ulogovan === "Menadzer") {
        overlayUserPrijava.style.display = "none"
        navProjekcije.style.display = "inline-block";
        navKorisnici.style.display = "inline-block";
        overlayUserUlogovan.style.display = "flex";
        overlayUserUlogovan.innerHTML = `
        <div class="overlay__user--ulogovan--header">
                <h1>Ulogovani kao:</h1>
                <h1>Menadzer</h1>
            </div>

            <div class="overlay__user--ulogovan--odjavaBtn">
                <button id="odjavaBtn">ODJAVA</button>
            </div>`
    } else if (ulogovan === "Prodavac") {
        overlayUserPrijava.style.display = "none"
        navProjekcije.style.display = "inline-block";
        navKorisnici.style.display = "none"
        overlayUserUlogovan.style.display = "flex";
        overlayUserUlogovan.innerHTML = `
        <div class="overlay__user--ulogovan--header">
                <h1>Ulogovani kao:</h1>
                <h1>Prodavac</h1>
            </div>

            <div class="overlay__user--ulogovan--odjavaBtn">
                <button id="odjavaBtn">ODJAVA</button>
            </div>`
    } else {
        navProjekcije.style.display = "none";
        navKorisnici.style.display = "none"
        overlayUserPrijava.style.display = "block"
        overlayUserUlogovan.style.display = "none";
    }


}

proveriLogovanje();

const odjavaBtn = document.getElementById("odjavaBtn");

odjavaBtn.addEventListener("click", odjava);

function odjava() {
    localStorage.removeItem("ulogovan");
    window.location.href = "./index.html";
}



// Skrol dugme

window.onscroll = function() {
    scrollFunction();
}
const scrollBtn = document.getElementById("scrollBtn");

function scrollFunction() {
    if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
        scrollBtn.classList.add("active");
    } else {
        scrollBtn.classList.remove("active");
    }
}

scrollBtn.addEventListener("click", function(){
    scrollToTop(1000);
  });


function scrollToTop(scrollDuration) {
    let scrollStep = -window.scrollY / (scrollDuration / 15),
        scrollInterval = setInterval( function() {
        if ( window.scrollY != 0 ) {
            window.scrollBy( 0, scrollStep );
        }
        else clearInterval(scrollInterval);
    },8);
}