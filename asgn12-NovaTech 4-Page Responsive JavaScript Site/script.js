let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelectorAll(".hero img");
  const dots = document.querySelectorAll(".hero-dots span");

  slides.forEach((s, i) => {
    s.classList.remove("active");
    if (i === index) s.classList.add("active");
  });

  // update dots if they exist
  dots.forEach((d, i) => {
    d.classList.remove("active");
    if (i === index) d.classList.add("active");
  });

  currentSlide = index;
}

function nextSlide() {
  const slides = document.querySelectorAll(".hero img");
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  const slides = document.querySelectorAll(".hero img");
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function createDots() {
  const slides = document.querySelectorAll(".hero img");
  const dotsContainer = document.querySelector(".hero-dots");

  if (!dotsContainer) return;

  dotsContainer.innerHTML = "";

  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.onclick = () => showSlide(i);
    dotsContainer.appendChild(dot);
  });
}

setInterval(nextSlide, 4000);

function toggleMenu() {
  document.querySelector("nav").classList.toggle("show");
}

function setActive() {
  const links = document.querySelectorAll("nav a");
  let currentPage = window.location.pathname.split("/").pop();

  // If no file is specified (e.g. "/"), treat it as index.html
  if (!currentPage || currentPage === "") {
    currentPage = "index.html";
  }

  links.forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
}

window.onload = () => {
  setActive();
  createDots();
  showSlide(0);
};
