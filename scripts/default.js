const defaultFilmovi = [
    {
        id: 1,
        naziv: "Black Panther",
        cena: "350rsd",
        trajanje: "134min",
        zanr: "Akcioni/Avantura/Sci-Fi",
        opis: "Posle smrti svoga oca, kralja Vakande, T'Cala se vraca kuci, u izolovanu i tehnicni naprednu africku drzavu, kako bi nasledio tron i povratio svoje nasledno pravo da bude kralj.",
        poster: "img/black-panther-poster.jpg",
        imdb: "http://www.imdb.com/title/tt1825683/",
        trailer: "https://www.youtube.com/watch?v=xjDjIWPwcPU"
    },
    {
        id: 2,
        naziv: "Star Wars: The Last Jedi",
        cena: "380rsd",
        trajanje: "150min",
        zanr: "Akcioni/Avantura/Fantazija",
        opis: "Rej razvija svoje novo-otkrivene sposobnosti uz pomoc Luka Skajvolkera, koji je uznemiren snagom njenih moci. Za to vreme, Otpor se priprema za borbu sa Prvim Redom.",
        poster: "img/star-wars-poster.jpg",
        imdb: "http://www.imdb.com/title/tt2527336/",
        trailer: "https://www.youtube.com/watch?v=Q0CbN8sfihY"
    },
    {
        id: 3,
        naziv: "Jumanji",
        cena: "280rsd",
        trajanje: "119min",
        zanr: "Komedija/Akcioni/Avantura",
        opis: "Cetiri tinejdzera bivaju uvucena u magicnu video igricu i jedini izlaz iz nje je da rade zajedno da pobede igricu.",
        poster: "img/jumanji-poster.jpg",
        imdb: "http://www.imdb.com/title/tt2283362/",
        trailer: "https://www.youtube.com/watch?v=2QKg5SZ_35I"
    },
    {
        id: 4,
        naziv: "Avengers:Infinity War",
        cena: "450rsd",
        trajanje: "150min",
        zanr: "Akcioni/Heroji/Avantura",
        opis: "Avendzersi i njihovi saveznici moraju biti spremni da zrtvuju sve u pokusaju da pobede mocnog Thanosa pre nego sto on unisti univerzum.",
        poster: "img/infinity-poster.jpg",
        imdb: "http://www.imdb.com/title/tt4154756",
        trailer: "https://www.youtube.com/watch?v=6ZfuNTqbHE8"
    }
]

const defaultProjekcije = [
    {
        id: defaultFilmovi[0].id,
        naziv: defaultFilmovi[0].naziv,
        cena: defaultFilmovi[0].cena,
        trajanje: defaultFilmovi[0].trajanje,
        zanr: defaultFilmovi[0].zanr,
        opis: defaultFilmovi[0].opis,
        poster: defaultFilmovi[0].poster,
        imdb: defaultFilmovi[0].imdb,
        trailer: defaultFilmovi[0].trailer,
        projekcije: [
            {
                datum:"2018-02-08",
                pocetak:"14:00",
                sala: "1",
                mesta: 150,
                slobodno: 150
            },
            {
                datum:"2018-02-08",
                pocetak:"18:00",
                sala: "3",
                mesta: 85,
                slobodno: 85
            },
            {
                datum:"2018-02-08",
                pocetak:"22:00",
                sala: "5",
                mesta: 250,
                slobodno: 250
            },
            {
                datum:"2018-02-09",
                pocetak:"17:00",
                sala: "2",
                mesta: 120,
                slobodno: 120
            },
            {
                datum:"2018-02-09",
                pocetak:"21:00",
                sala: "4",
                mesta: 70,
                slobodno: 70
            },
            {
                datum:"2018-02-10",
                pocetak:"14:00",
                sala: "1",
                mesta: 150,
                slobodno: 150
            },
            {
                datum:"2018-02-10",
                pocetak:"20:30",
                sala: "3",
                mesta: 85,
                slobodno: 85
            }
        ]
    },
    {
        id: defaultFilmovi[1].id,
        naziv: defaultFilmovi[1].naziv,
        cena: defaultFilmovi[1].cena,
        trajanje: defaultFilmovi[1].trajanje,
        zanr: defaultFilmovi[1].zanr,
        opis: defaultFilmovi[1].opis,
        poster: defaultFilmovi[1].poster,
        imdb: defaultFilmovi[1].imdb,
        trailer: defaultFilmovi[1].trailer,
        projekcije: [
            {
                datum:"2018-02-08",
                pocetak:"12:00",
                sala: "2",
                mesta: 120,
                slobodno: 120
            },
            {
                datum:"2018-02-08",
                pocetak:"16:35",
                sala: "1",
                mesta: 150,
                slobodno: 150
            },
            {
                datum:"2018-02-08",
                pocetak:"21:20",
                sala: "4",
                mesta: 70,
                slobodno: 70
            },
            {
                datum:"2018-02-09",
                pocetak:"14:00",
                sala: "1",
                mesta: 150,
                slobodno: 150
            },
            {
                datum:"2018-02-09",
                pocetak:"19:25",
                sala: "3",
                mesta: 85,
                slobodno: 85
            },
            {
                datum:"2018-02-10",
                pocetak:"10:00",
                sala: "1",
                mesta: 150,
                slobodno: 150
            },
            {
                datum:"2018-02-10",
                pocetak:"20:30",
                sala: "4",
                mesta: 70,
                slobodno: 70
            }
        ]
    },
    {
        id: defaultFilmovi[2].id,
        naziv: defaultFilmovi[2].naziv,
        cena: defaultFilmovi[2].cena,
        trajanje: defaultFilmovi[2].trajanje,
        zanr: defaultFilmovi[2].zanr,
        opis: defaultFilmovi[2].opis,
        poster: defaultFilmovi[2].poster,
        imdb: defaultFilmovi[2].imdb,
        trailer: defaultFilmovi[2].trailer,
        projekcije: [
            {
                datum:"2018-02-08",
                pocetak:"16:00",
                sala: "3",
                mesta: 85,
                slobodno: 85
            },
            {
                datum:"2018-02-08",
                pocetak:"20:00",
                sala: "2",
                mesta: 120,
                slobodno: 120
            },
            {
                datum:"2018-02-09",
                pocetak:"11:00",
                sala: "1",
                mesta: 150,
                slobodno: 150
            },
            {
                datum:"2018-02-09",
                pocetak:"18:30",
                sala: "2",
                mesta: 120,
                slobodno: 120
            },
            {
                datum:"2018-02-10",
                pocetak:"12:00",
                sala: "5",
                mesta: 250,
                slobodno: 250
            },
            {
                datum:"2018-02-10",
                pocetak:"20:30",
                sala: "3",
                mesta: 85,
                slobodno: 85
            }
        ]
    },
    {
        id: defaultFilmovi[3].id,
        naziv: defaultFilmovi[3].naziv,
        cena: defaultFilmovi[3].cena,
        trajanje: defaultFilmovi[3].trajanje,
        zanr: defaultFilmovi[3].zanr,
        opis: defaultFilmovi[3].opis,
        poster: defaultFilmovi[3].poster,
        imdb: defaultFilmovi[3].imdb,
        trailer: defaultFilmovi[3].trailer,
        projekcije: [
            {
                datum:"2018-02-08",
                pocetak:"15:35",
                sala: "2",
                mesta: 120,
                slobodno: 120
            },
            {
                datum:"2018-02-08",
                pocetak:"18:00",
                sala: "3",
                mesta: 85,
                slobodno: 85
            },
            {
                datum:"2018-02-08",
                pocetak:"21:00",
                sala: "5",
                mesta: 250,
                slobodno: 250
            },
            {
                datum:"2018-02-09",
                pocetak:"12:00",
                sala: "2",
                mesta: 120,
                slobodno: 120
            },
            {
                datum:"2018-02-09",
                pocetak:"17:30",
                sala: "1",
                mesta: 150,
                slobodno: 150
            },
            {
                datum:"2018-02-10",
                pocetak:"14:00",
                sala: "4",
                mesta: 70,
                slobodno: 70
            },
            {
                datum:"2018-02-10",
                pocetak:"23:10",
                sala: "5",
                mesta: 250,
                slobodno: 250
            }
        ]
    },
]


const defaultMenadzer = {
    username: "Theos",
    password: "1234",
    ime: "Uros",
    prezime: "Dragicevic",
    email: "urosq@hotmail.com"
}

const defaultProdavci = [
    {
        username: "omke",
        password: "1111",
        ime: "Omar",
        prezime: "Iriskic",
        email: "omaririskic@gmail.com"
    },
    {
        username: "egze",
        password: "2222",
        ime: "Uros",
        prezime: "Isakovic",
        email: "ezgze@outlook.com"
    },
    {
        username: "krute",
        password: "5555",
        ime: "Pavle",
        prezime: "Nisic",
        email: "pavle@gmail.com"
    }
]


function proveriLS() {
    if(localStorage.getItem("filmovi") === null) {
        localStorage.setItem("filmovi", JSON.stringify(defaultFilmovi));
    } else {
        console.log("Vec imaju filmovi u LSu");
    }

    if(localStorage.getItem("projekcije") === null) {
        localStorage.setItem("projekcije", JSON.stringify(defaultProjekcije));
    } else {
        console.log("Vec imaju projekcije u LSu");
    }

    if(localStorage.getItem("menadzer") === null) {
        localStorage.setItem("menadzer", JSON.stringify(defaultMenadzer));
    } else {
        console.log("Vec postoji menadzer u LSu");
    }

    if(localStorage.getItem("prodavci") === null) {
        localStorage.setItem("prodavci", JSON.stringify(defaultProdavci));
    } else {
        console.log("Vec postoje prodavci u LSu");
    }
}

proveriLS();