// slideshow
let slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide() {
  slides.forEach((s) => (s.style.display = "none"));
  index = (index + 1) % slides.length;
  slides[index].style.display = "block";
}
if (slides.length) {
  setInterval(showSlide, 2000);
}

// FAQ toggle
document.querySelectorAll(".faq-item .question").forEach((q) => {
  q.addEventListener("click", () => {
    const item = q.parentElement;

    // close others (accordion behavior)
    document.querySelectorAll(".faq-item").forEach((i) => {
      if (i !== item) i.classList.remove("active");
    });

    item.classList.toggle("active");
  });
});

// form validation
let form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let msg = document.getElementById("message").value;
    let error = document.getElementById("error");

    if (!name || !email || !msg) {
      error.textContent = "All fields are required.";
      error.style.color = "#f87171";
    } else {
      error.textContent = "Message sent successfully!";
      error.style.color = "#4ade80";
    }
  });
}
