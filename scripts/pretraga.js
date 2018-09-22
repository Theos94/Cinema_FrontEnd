

 let projekcije;
 if (localStorage.getItem("projekcije") === null) {
     projekcije = [];
 } else {
     projekcije = JSON.parse(localStorage.getItem("projekcije"));
 }


function findMatches(wordToMatch, projekcije) {
    return projekcije.filter(film => {
        const regex = new RegExp(wordToMatch, 'gi');
        return film.naziv.match(regex) || film.zanr.match(regex)
    });
}

function displayMatches() {
    const matchArray = findMatches(this.value, projekcije);


    const filmHtml = matchArray.map((film, index) => {
        const regex = new RegExp(this.value, 'gi');

        return `
      <div class="film__search">
      <div class="poster__search">
          <img src="${film.poster}" alt="Poster Img">
      </div>
      <div class="tekst__search">
          <h2>${film.naziv}</h2>
          <h4><span>Trajanje:</span>${film.trajanje}</h4>
          <h4><span>Zanr:</span>${film.zanr}</h4>
          <h4><span>Cena:</span>${film.cena}</h4>
          <h4><span>Opis:</span> ${film.opis}</h4>

          <div class="buttons">
            <a target="_blank" href=${film.imdb}>IMDB</a>
            <a target="_blank" href=${film.trailer}>TRAILER</a>
            </div>
      </div>
      <div class="projekcije__search">

          <div class="projekcije__kontejner__search">
          ${film.projekcije.map(projekcija => {
                return `

              <div class="projekcija__search">
                  <h4>${projekcija.datum}</h4>
                  <h4>${projekcija.pocetak}</h4>
                  <h4>Sala:${projekcija.sala}</h4>
                  <h4>${projekcija.slobodno}/${projekcija.mesta}</h4>
              </div>

              `
            }).join("")}

        </div>
    </div>
</div>
      `
    }).join("");
    kontejner.innerHTML = filmHtml

    if (searchInput.value === "") {
        kontejner.innerHTML = "";
    }
}

const searchInput = document.querySelector('.searchInput');
const kontejner = document.querySelector('.overlay__search--kontejner');

// searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);