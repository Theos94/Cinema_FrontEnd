const kalendarProjekcijeKontejner = document.querySelector(".kalendar__projekcije--kontejner");


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
            const kalendarProjekcijaDiv = document.createElement("div");
            kalendarProjekcijaDiv.classList.add("kalendar__projekcija");
            kalendarProjekcijaDiv.setAttribute("data-datum", `${datum}`);

            const kalendarProjekcijaDatumDiv = document.createElement("div");
            kalendarProjekcijaDatumDiv.classList.add("kalendar__projekcija--datum");
            kalendarProjekcijaDatumDiv.setAttribute("data-datum", `${datum}`);
            kalendarProjekcijaDatumDiv.innerHTML = `
            <i class="fa fa-calendar"></i>
            <h4>${datum}</h4>
            `

            kalendarProjekcijaDiv.appendChild(kalendarProjekcijaDatumDiv)
            kalendarProjekcijeKontejner.appendChild(kalendarProjekcijaDiv);
        }
    })
}

populisiKalendar();

function popuniDatume() {

        let kontejneri = document.querySelectorAll(".kalendar__projekcija");
        kontejneri.forEach(kontejner => {
        popuniKontejnere(kontejner, kontejner.dataset.datum)

    });
}

popuniDatume();

function popuniKontejnere(element, datum) {
    let projekcije;
    if (localStorage.getItem("projekcije") === null) {
        projekcije = [];
    } else {
        projekcije = JSON.parse(localStorage.getItem("projekcije"));
    }

    projekcije.forEach((film, index) => {
        film.projekcije.forEach(projekcija => {
            if(projekcija.datum === datum) {
                let div = document.createElement("div");
                div.classList.add("projekcija");
                div.setAttribute("data-filmID", `${film.id}`);
                div.setAttribute("data-pocetak", `${projekcija.pocetak}`);
                div.setAttribute("data-sala", `${projekcija.sala}`);
                div.setAttribute("data-slobodno", `${projekcija.slobodno}`);
                div.setAttribute("data-mesta", `${projekcija.mesta}`);
                div.setAttribute("data-cena", `${film.cena}`);
                div.innerHTML = `
                <div class="projekcija__info">
                    <h4 class="naziv">${film.naziv}</h4>
                    <h4 class="opis"><span>Opis:</span>${film.opis}</h4>
                    <h4 class="pocetak"><span>Pocetak:</span>${projekcija.pocetak}</h4>
                    <h4><span>Sala:</span> ${projekcija.sala}</h4>
                    <h4><span>Mesta:</span> ${projekcija.slobodno} / ${projekcija.mesta}</h4>
                </div>
                <div class="projekcija__dugmad">
                        <i class="fas fa-money-bill-alt"></i>
                        <i class="fas fa-edit"></i>
                        <i class="fas fa-trash-alt"></i>
                </div>
                `
                element.appendChild(div);
            }
        });
    });
}

const selectFilm = document.getElementById("inputFilm");
const selectSala = document.getElementById("salaInput");
const selectFilmDodaj = document.getElementById("inputFilmDodaj");
const selectSalaDodaj = document.getElementById("salaInputDodaj");

function populateSelect() {
    let filmovi;
    if (localStorage.getItem("filmovi") === null) {
        filmovi = [];
    } else {
        filmovi = JSON.parse(localStorage.getItem("filmovi"));
    }

    const markup = filmovi.map(film => `
        <option value="${film.id}">${film.naziv}</option>
    `).join("")
    selectFilm.innerHTML = markup;
    selectFilmDodaj.innerHTML = markup;
    const sale = [1,2,3,4,5];

    const salaMarkup = sale.map(sala => `
    <option value="${sala}">Sala: ${sala}</option>
    `).join("");
    selectSala.innerHTML = salaMarkup;
    selectSalaDodaj.innerHTML = salaMarkup;

}

populateSelect();

const pageMask = document.getElementById("pageMask");
const siteWrapper = document.querySelector(".site__wrapper");
const navContainer = document.querySelector(".navigation");
const overlayDodaj = document.querySelector(".overlay__dodaj--projekciju");
const overlayDodajCloseBtn = document.querySelector(".overlay__dodaj--closeBtn");

function addEventListeners() {
    let editBtns = document.querySelectorAll(".fa-edit");
    editBtns.forEach(button => {
        button.addEventListener("click", function() {
            passDataToEdit(this);
        });
    });
    let deleteBtns = document.querySelectorAll(".fa-trash-alt");
    deleteBtns.forEach(button => {
        button.addEventListener("click", function() {
            passDataToDelete(this);
        })
    })

    let moneyBtns = document.querySelectorAll(".fa-money-bill-alt");
    moneyBtns.forEach(button => {
        button.addEventListener("click", function() {
            passDataToSell(this);
        })
    })

    let dodajBtn = document.getElementById("dodajBtn");
    dodajBtn.addEventListener("click", () => {
        overlayDodaj.classList.add("active");
        pageMask.style.display = "block";
        siteWrapper.classList.add("active");
        navContainer.classList.add("active");
    } )

    overlayDodajCloseBtn.addEventListener("click", () => {
        overlayDodaj.classList.remove("active");
        pageMask.style.display = "none";
        siteWrapper.classList.remove("active");
        navContainer.classList.remove("active");
    })


}

addEventListeners();

let stariDatum = "";
let stariPocetak = "";
let staraSala = 0;
const overlayEdit = document.querySelector(".overlay__edit");
const overlayEditClose = document.querySelector(".overlay__edit--closeBtn");
overlayEditClose.addEventListener("click", () => {
    overlayEdit.classList.remove("active");
    pageMask.style.display = "none";
    siteWrapper.classList.remove("active");
    navContainer.classList.remove("active");
})

function passDataToEdit(e) {
    overlayEdit.classList.add("active");
    pageMask.style.display = "block";
    siteWrapper.classList.add("active");
    navContainer.classList.add("active");
    let datum = e.parentElement.parentElement.parentElement.dataset.datum;
    let filmID = e.parentElement.parentElement.dataset.filmid;
    let pocetak = e.parentElement.parentElement.dataset.pocetak;
    let sala = e.parentElement.parentElement.dataset.sala;

    let projekcije = document.querySelectorAll(".projekcija");
    projekcije.forEach(projekcija => {
        projekcija.classList.remove("changed");
    });

    e.parentElement.parentElement.classList.add("changed");

    selectFilm.selectedIndex = filmID - 1;
    selectSala.selectedIndex = sala - 1;
    let datumInput = document.getElementById("datumInput");
    datumInput.value = datum;

    stariDatum = datum;
    stariPocetak = pocetak;
    staraSala = sala;
    document.getElementById("pocetakInput").placeholder = pocetak;

}

const forma = document.getElementById("formaEdit");

forma.addEventListener("submit", izmeniProjekciju);

function izmeniProjekciju(e) {
    let filmID = document.getElementById("inputFilm").value;
    let datum = document.getElementById("datumInput").value;
    let pocetak = document.getElementById("pocetakInput").value;
    let sala = document.getElementById("salaInput").value;


    let projekcije;
    if (localStorage.getItem("projekcije") === null) {
        projekcije = [];
    } else {
        projekcije = JSON.parse(localStorage.getItem("projekcije"));
    }

    let filmovi;
    if (localStorage.getItem("filmovi") === null) {
        filmovi = [];
    } else {
        filmovi = JSON.parse(localStorage.getItem("filmovi"));
    }

    let noviFilm = {}

    filmovi.forEach(film => {
        if(parseInt(filmID) === film.id) {
            noviFilm = {...film}
        }
    });

    let brojMesta = 0;
    let brojSlobodnih = 0;
    switch (parseInt(sala)) {
        case 1:
            brojMesta = 150;
            brojSlobodnih = 150;
            break;
        case 2:
            brojMesta = 120;
            brojSlobodnih = 120;
            break;
        case 3:
            brojMesta = 85;
            brojSlobodnih = 85;
            break;
        case 4:
            brojMesta = 70;
            brojSlobodnih = 70;
            break;
        case 5:
            brojMesta = 250;
            brojSlobodnih = 250;
            break;
    }

    projekcije.forEach(film => {
        if(parseInt(filmID) === film.id) {

            film.projekcije.forEach(projekcija => {
                if(stariDatum == projekcija.datum) {
                    if(projekcija.pocetak === stariPocetak) {
                        projekcija.pocetak = pocetak;
                        projekcija.datum = datum;
                        projekcija.sala = sala;
                        projekcija.mesta = brojMesta;
                        projekcija.slobodno = brojSlobodnih;

                        film.id = noviFilm.id;
                        film.naziv = noviFilm.naziv;
                        film.cena = noviFilm.cena;
                        film.trajanje = noviFilm.trajanje;
                        film.zanr = noviFilm.zanr;
                        film.opis = noviFilm.opis;
                        film.poster = noviFilm.poster;

                        let projekcijaKontejner = document.querySelector("div.changed");

                        projekcijaKontejner.innerHTML = `
                        <div class="projekcija__info">
                        <h4 class="naziv">${noviFilm.naziv}</h4>
                        <h4 class="opis"><span>Opis:</span>${noviFilm.opis}</h4>
                        <h4 class="pocetak"><span>Pocetak:</span>${projekcija.pocetak}</h4>
                        <h4><span>Sala:</span> ${projekcija.sala}</h4>
                        <h4><span>Mesta:</span> ${projekcija.slobodno} / ${projekcija.mesta}</h4>
                        </div>
                        <div class="projekcija__dugmad">
                                <i class="fas fa-edit"></i>
                                <i class="fas fa-trash-alt"></i>
                        </div>
                        `

                        overlayEdit.classList.remove("active");
                        pageMask.style.display = "none";
                        siteWrapper.classList.remove("active");
                        navContainer.classList.remove("active");
                        swal("Uspesno ste izmenili projekciju!" , {
                            icon: "success",
                        });
                    }
                }
            });
        }
    });

    localStorage.setItem("projekcije", JSON.stringify(projekcije));
    e.preventDefault();
    forma.reset();
}

//  Brisanje projekcije krece odavde


function passDataToDelete(e) {
    let pocetak = e.parentElement.parentElement.dataset.pocetak;
    let sala = e.parentElement.parentElement.dataset.sala;
    let filmid = e.parentElement.parentElement.dataset.filmid;
    let datum = e.parentElement.parentElement.parentElement.dataset.datum;

    // console.log(pocetak);
    // console.log(sala);
    // console.log(filmid);
    // console.log(datum);

    let projekcije;
    if (localStorage.getItem("projekcije") === null) {
        projekcije = [];
    } else {
        projekcije = JSON.parse(localStorage.getItem("projekcije"));
    }

    projekcije.forEach(film => {
        if (parseInt(filmid) === film.id) {
            film.projekcije.forEach((projekcija, index) => {
                if (sala === projekcija.sala && pocetak === projekcija.pocetak && datum === projekcija.datum) {

                    swal({
                        title: "Jeste sigurni da zelite da izbrisete ovu projekciju?",
                        text: "Jednom kada je obrisete ne mozete je povratiti",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,

                    })
                    .then((willDelete) => {
                        if(willDelete) {

                            film.projekcije.splice(index, 1);
                            localStorage.setItem("projekcije", JSON.stringify(projekcije));
                            e.parentElement.parentElement.remove();
                            swal("Uspesno ste izbrisali projekciju!" , {
                                icon: "success",
                            });
                        } else {
                            swal("Niste obrisali projekciju!");
                        }
                    })



                }
            });

        }
    });
}



// Kupovina karata krece odavde
const overlaySell = document.querySelector(".overlay__sell");
const overlaySellClose = document.querySelector(".overlay__sell--closeBtn");
overlaySellClose.addEventListener("click", () => {
    overlaySell.classList.remove("active");
    pageMask.style.display = "none";
    siteWrapper.classList.remove("active");
    navContainer.classList.remove("active");
})

function passDataToSell(e) {
    pageMask.style.display = "block";
    siteWrapper.classList.add("active");
    navContainer.classList.add("active");
    overlaySell.classList.add("active");
    const datum = e.parentElement.parentElement.parentElement.dataset.datum;
    const filmid = e.parentElement.parentElement.dataset.filmid;
    const pocetak = e.parentElement.parentElement.dataset.pocetak;
    const sala = e.parentElement.parentElement.dataset.sala;
    const slobodnoMesta = e.parentElement.parentElement.dataset.slobodno;
    const ukupnoMesta = e.parentElement.parentElement.dataset.mesta;
    const cena = e.parentElement.parentElement.dataset.cena;
    console.log(e.parentElement.parentElement);

    const nazivFilma = e.parentElement.parentElement.firstElementChild.firstElementChild.textContent

    // Uhvati overlay i generisi HTML

    const formaSell = document.getElementById("formaSell");

    formaSell.innerHTML = `
        <h2 id="naslovProjekcije">Naziv: ${nazivFilma}</h2>
        <h2 id="datumProjekcije">Datum: ${datum}</h2>
        <h2 id="pocetakProjekcije">Pocetak: ${pocetak}</h2>
        <h2 id="cenaProjekcije">Cena: ${cena}</h2>
        <h2 id="salaProjekcije">Sala: ${sala}</h2>
        <h2 id="slobodnoMesta">Slobodno: ${slobodnoMesta}</h2>
        <h2 id="ukupnoMesta">Ukupno: ${ukupnoMesta}</h2>


        <input type="text" id="inputSell" placeholder="Broj karti za prodati" required>
        <button type="submit">Prodaj</button>
    `

    formaSell.addEventListener("submit", function() {
        sellProjekciju(event, filmid, datum, pocetak, sala, slobodnoMesta, ukupnoMesta, cena);
    })
}

function sellProjekciju(e, id, datum, pocetak, sala, slobodno, ukupno, cena) {
    let novaVrednost = document.getElementById("inputSell").value;

    let projekcije;
    if (localStorage.getItem("projekcije") === null) {
        projekcije = [];
    } else {
        projekcije = JSON.parse(localStorage.getItem("projekcije"));
    }


    novaVrednost = parseInt(novaVrednost);


    let cena1 = cena.split("rsd");
    let cena2 = cena1[0]
    cena2 = parseInt(cena2)

    projekcije.forEach(film => {
        if (film.id === parseInt(id)) {
            film.projekcije.forEach(projekcija  => {
                if (projekcija.datum === datum && projekcija.pocetak === pocetak && projekcija.sala === sala) {
                    if (novaVrednost > projekcija.mesta || novaVrednost > projekcija.slobodno) {
                        formaSell.reset();
                        swal({
                            title: "Neuspesno.",
                            text: "Nema dovoljno karata, probajte opet",
                            icon: "warning",
                            button: true,
                        })

                    } else {
                        console.log(projekcija.slobodno = projekcija.slobodno - novaVrednost);
                        console.log(projekcija.slobodno);
                        console.log(novaVrednost);


                        localStorage.setItem("projekcije", JSON.stringify(projekcije));
                        // alert(`
                        // Uspesno ste prodali.
                        // Racun za naplatu je ${novaVrednost * cena2}rsd.
                        // `);
                        // overlaySell.classList.remove("active");
                        overlaySell.classList.remove("active");
                        pageMask.style.display = "none";
                        siteWrapper.classList.remove("active");
                        navContainer.classList.remove("active");
                        swal({
                            title: "Uspesno ste prodali karte.",
                            text: `Racun za naplatu je ${novaVrednost * cena2}rsd.`,
                            icon: "success",
                            button: true,
                        })
                        .then(added => {
                            setTimeout(() => {
                                location.reload();
                            }, 500);
                        })



                    }

                }
            });

        }
    });

    e.preventDefault();
    formaSell.reset();
}


// Dodavanje projekcije

const formaDodaj = document.getElementById("formaDodaj");
formaDodaj.addEventListener("submit", dodajProjekciju);

function dodajProjekciju(e) {
    let filmid = document.getElementById("inputFilmDodaj").value;
    let datum = document.getElementById("datumInputDodaj").value;
    let pocetak = document.getElementById("pocetakInputDodaj").value;
    let sala = document.getElementById("salaInputDodaj").value;

    let filmovi;
    if (localStorage.getItem("filmovi") === null) {
        filmovi = [];
    } else {
        filmovi = JSON.parse(localStorage.getItem("filmovi"));
    }

    let noviFilm = {}

    filmovi.forEach(film => {
        if(parseInt(filmid) === film.id) {
            noviFilm = {...film}
        }
    });

    let projekcije;
    if (localStorage.getItem("projekcije") === null) {
        projekcije = [];
    } else {
        projekcije = JSON.parse(localStorage.getItem("projekcije"));
    }


    let brojMesta = 0;
    let brojSlobodnih = 0;
    switch (parseInt(sala)) {
        case 1:
            brojMesta = 150;
            brojSlobodnih = 150;
            break;
        case 2:
            brojMesta = 120;
            brojSlobodnih = 120;
            break;
        case 3:
            brojMesta = 85;
            brojSlobodnih = 85;
            break;
        case 4:
            brojMesta = 70;
            brojSlobodnih = 70;
            break;
        case 5:
            brojMesta = 250;
            brojSlobodnih = 250;
            break;
    }

    let novaProjekcija = {
        datum: datum,
        pocetak:pocetak,
        sala: sala,
        mesta: brojMesta,
        slobodno: brojSlobodnih
    }

    projekcije.forEach(film => {
        if(noviFilm.id === film.id) {
            film.projekcije.push(novaProjekcija);
            localStorage.setItem("projekcije", JSON.stringify(projekcije))
            swal("Uspesno ste dodali projekciju!" , {
                icon: "success",
                button: true
            })
            .then(added => {
                setTimeout(() => {
                    location.reload();
                }, 500);
            })

        }
    });

    e.preventDefault();
}





const userBtn = document.getElementById("userBtn");
const userOverlay = document.querySelector(".overlay__user")

userBtn.addEventListener("click", () => {
    userOverlay.classList.toggle("active");
})



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

        let editBtns = document.querySelectorAll(".fa-edit");
            editBtns.forEach(button => {
                button.style.display = "none";
            });

        let deleteBtns = document.querySelectorAll(".fa-trash-alt");
            deleteBtns.forEach(button => {
                button.style.display = "none";
            });

        let dodajBtn = document.getElementById("dodajBtn");
            dodajBtn.style.display = "none";
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


