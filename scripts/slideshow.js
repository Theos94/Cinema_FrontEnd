let slideIndex = 0,
    i,
    slides = document.querySelectorAll(".slide");

manualSlideshow(slideIndex);
automaticSlideshow();

function dodatiBroj(broj) {
    manualSlideshow(slideIndex += broj);
}

function manualSlideshow(broj) {
  if (broj > slides.length) {
      slideIndex = 1
    }
  if (broj < 1) {
      slideIndex = slides.length
    }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}

function automaticSlideshow() {
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1
    }

    slides[slideIndex-1].style.display = "block";

    setTimeout(automaticSlideshow, 6000);

}