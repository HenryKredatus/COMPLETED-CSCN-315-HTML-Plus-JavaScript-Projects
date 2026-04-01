const images = document.querySelectorAll(".grid-img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");

let currentIndex = 0;
let slideshowInterval = null;

// Fade helper
function fadeToImage(index) {
  lightboxImg.style.opacity = 0;

  setTimeout(() => {
    currentIndex = index;
    lightboxImg.src = images[index].src;
    lightboxImg.style.opacity = 1;
  }, 200);
}

// Show lightbox with fade
function showImage(index) {
  currentIndex = index;
  lightboxImg.src = images[index].src;
  lightbox.classList.add("show");
  lightboxImg.style.opacity = 1;
}

// Click image
images.forEach((img, index) => {
  img.addEventListener("click", () => showImage(index));
});

// Close with fade
closeBtn.onclick = () => {
  lightbox.classList.remove("show");
  clearInterval(slideshowInterval);
};

// Next / Prev with fade
nextBtn.onclick = () => {
  const nextIndex = (currentIndex + 1) % images.length;
  fadeToImage(nextIndex);
};

prevBtn.onclick = () => {
  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  fadeToImage(prevIndex);
};

// Slideshow with fade
playBtn.onclick = () => {
  if (slideshowInterval) {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
  } else {
    slideshowInterval = setInterval(() => {
      nextBtn.click();
    }, 2500);
  }
};
