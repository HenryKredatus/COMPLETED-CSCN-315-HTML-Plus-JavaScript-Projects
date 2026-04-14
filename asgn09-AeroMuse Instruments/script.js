/* =========================
   THEME SYSTEM
========================= */

function toggleTheme() {
  const isLight = document.body.classList.toggle("light");
  localStorage.setItem("site-theme", isLight ? "light" : "dark");
  updateThemeIcon(isLight);
}

function updateThemeIcon(isLight) {
  const btn = document.querySelector("header button");
  if (!btn) return;

  btn.textContent = isLight ? "☀️" : "🌙";
}

(function () {
  const savedTheme = localStorage.getItem("site-theme");
  const isLight = savedTheme === "light";

  if (isLight) {
    document.body.classList.add("light");
  }

  document.addEventListener("DOMContentLoaded", () => {
    updateThemeIcon(isLight);
    initCarousel();
  });
})();

/* =========================
   BACK TO TOP
========================= */

window.addEventListener("scroll", () => {
  const btn = document.getElementById("topBtn");
  if (!btn) return;

  btn.style.display =
    document.documentElement.scrollTop > 200 ? "block" : "none";
});

function topFunction() {
  document.documentElement.scrollTop = 0;
}

/* =========================
   CAROUSEL
========================= */

let slides = [];
let currentSlide = 0;

function initCarousel() {
  slides = document.querySelectorAll(".slide");
  if (!slides.length) return;

  showSlide(0);

  setInterval(() => changeSlide(1), 4000);
}

function showSlide(index) {
  if (!slides.length) return;

  slides.forEach((s) => s.classList.remove("active"));
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
}

function changeSlide(dir) {
  showSlide(currentSlide + dir);
}

/* =========================
   PRODUCTS FILTER + SORT
========================= */

const filter = document.getElementById("filter");
const sort = document.getElementById("sort");
const grid = document.getElementById("productGrid");

filter?.addEventListener("change", updateProducts);
sort?.addEventListener("change", updateProducts);

function updateProducts() {
  const cards = Array.from(document.querySelectorAll("#productGrid .card"));

  const filterValue = filter.value;

  cards.forEach((card) => {
    const match =
      filterValue === "all" || card.dataset.category === filterValue;

    card.style.display = match ? "block" : "none";
  });

  if (sort.value === "name") {
    cards
      .sort((a, b) => a.dataset.name.localeCompare(b.dataset.name))
      .forEach((c) => grid.appendChild(c));
  }
}

/* =========================
   COMPARE SYSTEM (FIXED)
========================= */

let compareItems = [];

function addToCompare(button) {
  const card = button.closest(".card");
  if (!card) return;

  if (!compareItems.includes(card)) {
    compareItems.push(card);
    renderCompare();
  }
}

function renderCompare() {
  const list = document.getElementById("compareList");
  if (!list) return;

  list.innerHTML = "";

  compareItems.forEach((card) => {
    const clone = card.cloneNode(true);

    // remove original button
    clone.querySelector("button")?.remove();

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";

    removeBtn.onclick = () => {
      compareItems = compareItems.filter((c) => c !== card);
      renderCompare();
    };

    clone.appendChild(removeBtn);

    const wrapper = document.createElement("div");
    wrapper.className = "compare-card";
    wrapper.appendChild(clone);

    list.appendChild(wrapper);
  });
}

/* =========================
   FAQ ACCORDION
========================= */

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const answer = btn.nextElementSibling;
      const open = answer.style.display === "block";
      answer.style.display = open ? "none" : "block";
    });
  });
});

/* =========================
   QUIZ
========================= */

function checkAnswer(_, isCorrect) {
  const result = document.getElementById("quizResult");

  result.textContent = isCorrect
    ? "Correct! 🎉 AeroMuse is about music learning and instruments."
    : "Not quite — try again!";

  result.style.color = isCorrect ? "green" : "red";
}

/* =========================
   TIMELINE (ABOUT PAGE)
========================= */

const timelineData = [
  {
    title: "2019 - Idea Born",
    text: "Musicians and engineers formed AeroMuse with a goal of accessible music creation.",
  },
  {
    title: "2020 - First Prototype",
    text: "A hybrid MIDI controller prototype with smart learning tools was built.",
  },
  {
    title: "2022 - AeroPad Launch",
    text: "First commercial product focusing on expressive performance pads.",
  },
  {
    title: "2025 - AI Ecosystem",
    text: "Adaptive AI instruments that respond to user skill and style.",
  },
];

function showTimeline(index) {
  const content = document.getElementById("timelineContent");
  const items = document.querySelectorAll(".timeline-item");

  items.forEach((i) => i.classList.remove("active"));
  items[index]?.classList.add("active");

  if (!content) return;

  content.innerHTML = `
    <h3>${timelineData[index].title}</h3>
    <p>${timelineData[index].text}</p>
  `;
}

/* =========================
   CONTACT FORM + LIVE PREVIEW
========================= */

const form = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const previewName = document.getElementById("previewName");
const previewEmail = document.getElementById("previewEmail");
const previewMessage = document.getElementById("previewMessage");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;

    if (!nameInput.value.trim()) {
      document.getElementById("nameError").textContent = "Name is required";
      valid = false;
    } else {
      document.getElementById("nameError").textContent = "";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailInput.value.trim()) {
      document.getElementById("emailError").textContent = "Email is required";
      valid = false;
    } else if (!emailPattern.test(emailInput.value)) {
      document.getElementById("emailError").textContent = "Invalid email";
      valid = false;
    } else {
      document.getElementById("emailError").textContent = "";
    }

    if (!messageInput.value.trim()) {
      document.getElementById("messageError").textContent =
        "Message is required";
      valid = false;
    } else {
      document.getElementById("messageError").textContent = "";
    }

    if (valid) {
      alert("Message sent!");
      form.reset();

      previewName.textContent = "";
      previewEmail.textContent = "";
      previewMessage.textContent = "";
    }
  });
}

/* LIVE PREVIEW */
[nameInput, emailInput, messageInput].forEach((el, i) => {
  if (!el) return;

  el.addEventListener("input", () => {
    if (i === 0) previewName.textContent = nameInput.value;
    if (i === 1) previewEmail.textContent = emailInput.value;
    if (i === 2) previewMessage.textContent = messageInput.value;
  });
});
