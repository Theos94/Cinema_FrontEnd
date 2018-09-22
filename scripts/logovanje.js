const formaPrijava = document.getElementById("formaPrijava");
const userOverlay2 = document.querySelector(".overlay__user")

formaPrijava.addEventListener("submit", prijava);


function prijava(e) {
    let menadzer;
    if(localStorage.getItem("menadzer") === null) {
        menadzer = {};
    } else {
        menadzer = JSON.parse(localStorage.getItem("menadzer"));
    }


    let prodavci;
    if (localStorage.getItem("prodavci") === null) {
        prodavci = [];
    } else {
        prodavci = JSON.parse(localStorage.getItem("prodavci"));
    }


    let username = document.getElementById("usernameInput").value;
    let password = document.getElementById("passwordInput").value;

    username = username.toLowerCase();
    let usernameMenadzer = menadzer.username;
    usernameMenadzer = usernameMenadzer.toLowerCase();

    if(username === usernameMenadzer && password === menadzer.password) {
        localStorage.setItem("ulogovan", "Menadzer");
        formaPrijava.reset();
        userOverlay2.classList.remove("active");
        swal(`Uspesno ste se ulogovali kao Menadzer!` , {
            icon: "success",
        })
        .then(ulogovan => {
            ulogovanUspesno();
        })
    } else {
        for (let i = 0; i < prodavci.length; i++) {
            let prodavacUsername = prodavci[i].username;
            prodavacUsername = prodavacUsername.toLowerCase();

            if(prodavacUsername === username && prodavci[i].password === password) {
                localStorage.setItem("ulogovan", "Prodavac");
                formaPrijava.reset();
                userOverlay2.classList.remove("active");

                swal(`Uspesno ste se ulogovali kao Prodavac!` , {
                    icon: "success",
                })
                .then(ulogovan => {
                    ulogovanUspesno();
                })

                break;
            } else {
                swal("Neuspesno logovanje, probajte ponovo");
                formaPrijava.reset();
            }

        }
    }

    e.preventDefault();

}


function ulogovanUspesno() {
    window.location.href = "./index.html";
}
