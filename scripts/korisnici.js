const prodavciKontejner = document.querySelector(".korisnici__kontejner");
const dodajBtn = document.getElementById("dodajBtn");
const dodajOverlay = document.querySelector(".overlay__dodaj--korisnika");
const overlayEditClose = document.querySelector(".overlay__edit--closeBtn");
const formaDodaj = document.getElementById("formaDodaj");
const siteWrapper = document.querySelector(".site__wrapper");
const navContainer = document.querySelector(".navigation");
const pageMask = document.getElementById("pageMask");
const userBtn = document.getElementById("userBtn");
const userOverlay = document.querySelector(".overlay__user")

function loadEventListeners() {
    document.addEventListener("DOMContentLoaded", populateKorisnici);

    dodajBtn.addEventListener("click", () => {
        dodajOverlay.classList.add("active");
        pageMask.style.display = "block";
        siteWrapper.classList.add("active");
        navContainer.classList.add("active");
    })

    overlayEditClose.addEventListener("click", () => {
        dodajOverlay.classList.remove("active");
        pageMask.style.display = "none";
        siteWrapper.classList.remove("active");
        navContainer.classList.remove("active");
    })

    formaDodaj.addEventListener("submit", dodajProdavca);
    userBtn.addEventListener("click", () => {
        userOverlay.classList.toggle("active");
    })

}

loadEventListeners();


function populateKorisnici() {
    let prodavci;
    if (localStorage.getItem("prodavci") === null) {
        prodavci = [];
    } else {
        prodavci = JSON.parse(localStorage.getItem("prodavci"));
    }

    prodavciKontejner.innerHTML = `
    <h2 class="korisnici__primer" >Username</h2>
    <h2 class="korisnici__primer" >Ime</h2>
    <h2 class="korisnici__primer">Prezime</h2>
    <h2 id="email"  class="korisnici__primer">Email</h2>

    ${prodavci.map(prodavac => `
    <h2>${prodavac.username}</h2>
    <h2>${prodavac.ime}</h2>
    <h2>${prodavac.prezime}</h2>
    <h2>${prodavac.email}</h2>
    <div class="delete__btn" data-username="${prodavac.username}" data-email="${prodavac.email}">
        <i class="fas fa-minus-circle"></i>
    </div>
    `).join("")}
    `

    let deleteDugmad = document.querySelectorAll(".fa-minus-circle");
    deleteDugmad.forEach(dugme => {
        dugme.addEventListener("click", function() {
            izbrisiProdavca(this)
        })
    });
}

function izbrisiProdavca(e) {
    let username = e.parentElement.dataset.username;
    let email = e.parentElement.dataset.email;

    username = username.toLowerCase();
    email = email.toLowerCase();

    let prodavci;
    if (localStorage.getItem("prodavci") === null) {
        prodavci = [];
    } else {
        prodavci = JSON.parse(localStorage.getItem("prodavci"));
    }

    prodavci.forEach((prodavac, index) => {
        let prodavacUsername = prodavac.username
        prodavacUsername = prodavacUsername.toLowerCase();
        let emailProdavac = prodavac.email;
        emailProdavac = emailProdavac.toLowerCase();

        if(prodavacUsername === username && emailProdavac === email) {

            swal({
                title: "Jeste sigurni da zelite da izbrisete ovog prodavca?",
                text: "Moracete ga opet dodati ukoliko ste pogresili",
                icon: "warning",
                buttons: true,
                dangerMode: true,

            })
            .then((willDelete) => {
                if(willDelete) {
                    prodavci.splice(index, 1);
                    localStorage.setItem("prodavci", JSON.stringify(prodavci));

                    prodavciKontejner.innerHTML = `
                    <h2 class="korisnici__primer" >Username</h2>
                    <h2 class="korisnici__primer" >Ime</h2>
                    <h2 class="korisnici__primer">Prezime</h2>
                    <h2 id="email"  class="korisnici__primer">Email</h2>

                    ${prodavci.map(prodavac => `
                    <h2>${prodavac.username}</h2>
                    <h2>${prodavac.ime}</h2>
                    <h2>${prodavac.prezime}</h2>
                    <h2>${prodavac.email}</h2>
                    <div class="delete__btn">
                        <i class="fas fa-minus-circle"></i>
                    </div>
                    `).join("")}
                    `

                    swal("Uspesno ste izbrisali prodavca!" , {
                        icon: "success",
                    });
                } else {
                    swal("Niste obrisali prodavca!");
                }
            })

        }

    });

}



function dodajProdavca(e) {
    let username = document.getElementById("usernameInputDodaj").value;
    let ime = document.getElementById("imeInput").value;
    let prezime = document.getElementById("prezimeInput").value;
    let email = document.getElementById("emailInput").value;
    let pass1 = document.getElementById("passwordInput1").value;
    let pass2 = document.getElementById("passwordInput2").value;

    if(pass1 != pass2) {
        swal ("Niste iste lozinke uneli, probajte ponovo");
    }

    let prodavci;
    if (localStorage.getItem("prodavci") === null) {
        prodavci = [];
    } else {
        prodavci = JSON.parse(localStorage.getItem("prodavci"));
    }

    let noviProdavac = {
        username: username,
        password: pass1,
        ime: ime,
        prezime: prezime,
        email: email
    }

    username = username.toLowerCase();
    email = email.toLowerCase();

    let prodavciUsernames = []
    let prodavciEmails = []

    prodavci.forEach(prodavac => {
        let prodavacUsername = prodavac.username
        prodavacUsername = prodavacUsername.toLowerCase();
        prodavciUsernames.push(prodavacUsername);

        let emailProdavac = prodavac.email;
        emailProdavac = emailProdavac.toLowerCase();
        prodavciEmails.push(emailProdavac);
    });



    if (prodavciUsernames.includes(username) || prodavciEmails.includes(email)) {
        swal("Vec postoji korisnik, probajte ponovo!")
        formaDodaj.reset();
    } else {
        prodavci.push(noviProdavac);
        console.log(prodavci);

        localStorage.setItem("prodavci", JSON.stringify(prodavci));

        swal("Uspesno ste dodali novog korisnika" , {
            icon: "success",
        });

        dodajOverlay.classList.remove("active");
        pageMask.style.display = "none";
        siteWrapper.classList.remove("active");
        navContainer.classList.remove("active");

        prodavciKontejner.innerHTML = `
        <h2 class="korisnici__primer" >Username</h2>
        <h2 class="korisnici__primer" >Ime</h2>
        <h2 class="korisnici__primer">Prezime</h2>
        <h2 id="email"  class="korisnici__primer">Email</h2>

        ${prodavci.map(prodavac => `
        <h2>${prodavac.username}</h2>
        <h2>${prodavac.ime}</h2>
        <h2>${prodavac.prezime}</h2>
        <h2>${prodavac.email}</h2>
        <div class="delete__btn">
            <i class="fas fa-minus-circle"></i>
        </div>
        `).join("")}
        `
    }

    formaDodaj.reset();
    e.preventDefault();
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
        window.location.href = "./index.html";
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





