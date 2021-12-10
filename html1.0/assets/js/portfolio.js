// buttons
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const closeCur = document.querySelector(".close")

// modal
const modalContent = document.querySelector(".modal-content");
const slides = Array.from(document.querySelectorAll(".my-slides"));
const columns = document.querySelectorAll(".column");
const demos = Array.from(document.querySelectorAll(".demo"));

// text
const numberText = document.querySelectorAll('.my-slides--number');
const captionText = document.getElementById("caption");

// img on page
const hoverShadows = Array.from(document.querySelectorAll(".hover-shadow"));


let slideIndex;
let translate = 0;
let columnWidth;


// if window resize reset all values
window.addEventListener("resize", () => {
  columnWidth = columns[0].offsetWidth;
  columns.forEach(el => {
    el.style.transform = `translateX(0)`;
  })
  slideIndex = 1;
  translate = 0;
  showSlides(slideIndex)
})

// buttons action

prev.addEventListener("click", () => {
    if (slideIndex === 1) return false
    plusSlides(-1)
    if (translate === 0) return null
    translate += columnWidth + 4;
    columns.forEach(el => {
      el.style.transform = `translateX(${translate}px)`;
    })
});

next.addEventListener("click", () => {
  if (demos.length + 1 === 1) return false
    plusSlides(1)
    if (translate === -(columns.length - 3) * (columnWidth + 4)) return null
    translate -= columnWidth + 4;
    columns.forEach(el => {
      el.style.transform = `translateX(${translate}px)`;
    })
});
closeCur.addEventListener("click", () => closeModal());


// add click to main img to trigger open carousel 

hoverShadows.forEach((el, i) => {
  el.addEventListener("click", () => {
      openModal()
      currentSlide(i + 1)
  });
})

// add click thumbnails to show curent slide

demos.forEach((el, i) => {
    el.addEventListener("click", () => currentSlide(i +1));
})

// Open modal

function openModal() {
  document.getElementById("myModal").style.display = "block";
  columnWidth = columns[0].offsetWidth;
  showAndClose();
  numberText.forEach((el, id) => {
    el.innerHTML = `${id + 1} / ${numberText.length}`
  })
}

// Close the Modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

slideIndex = 1;
  
  
  // Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

  
  // Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
  let x = (n - 3) < 0? 0: (n - 3);
  translate = -(columnWidth + 4) * x;
    columns.forEach(el => {
      el.style.transform = `translateX(${translate}px)`;
    })
}
  
// control showing slides

function showSlides(n) {
  let i;
  showAndClose();
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < demos.length; i++) {
    demos[i].classList.remove("active")
  }
  slides[slideIndex-1].style.display = "block";
  demos[slideIndex-1].classList.add("active");
  captionText.innerHTML = demos[slideIndex-1].alt;
}

// control buttons if reach to limit left or right

function showAndClose() {
  if (slideIndex === 1) {
    prev.style.display = "none"
  } else {
    prev.style.display = "block"
  }

  if(slideIndex === demos.length) {
    next.style.display = "none";
  } else {
    next.style.display = "block";
  }
}