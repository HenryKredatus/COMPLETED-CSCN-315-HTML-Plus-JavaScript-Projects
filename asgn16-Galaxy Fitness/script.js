document.addEventListener("DOMContentLoaded", () => {
  /* ================= GLOBAL CARD HOVER ================= */
  document.querySelectorAll(".card").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      el.style.transform = "scale(1.05)";
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "scale(1)";
    });
  });

  /* ================= HERO TYPE ANIMATION ================= */
  const heroText = document.getElementById("heroText");

  if (heroText && heroText.textContent === "") {
    const text = "Train Beyond Limits";
    let i = 0;

    (function typeHero() {
      if (i < text.length) {
        heroText.textContent += text.charAt(i);
        i++;
        setTimeout(typeHero, 80);
      }
    })();
  }

  /* ================= FEATURED HIGHLIGHTS ROTATION ================= */
  const highlightBox = document.getElementById("highlightBox");

  if (highlightBox && !highlightBox.dataset.init) {
    highlightBox.dataset.init = "true";

    const highlights = [
      [
        "HIIT Training",
        "Burn fat fast with high intensity workouts.",
        "images/HIIT.jpg",
      ],
      [
        "Yoga Flow",
        "Improve flexibility and reduce stress.",
        "images/Yoga.jpg",
      ],
      [
        "Strength Training",
        "Build muscle and increase power.",
        "images/Strength Training.jpg",
      ],
    ];

    let index = 0;

    function rotateHighlights() {
      const item = highlights[index];

      highlightBox.style.opacity = "0";
      highlightBox.style.transition = "opacity 0.25s ease";

      setTimeout(() => {
        highlightBox.innerHTML = `
          <img src="${item[2]}" alt="${item[0]}" />
          <h3>${item[0]}</h3>
          <p>${item[1]}</p>
        `;
        highlightBox.style.opacity = "1";
      }, 250);

      index = (index + 1) % highlights.length;
    }

    rotateHighlights();
    setInterval(rotateHighlights, 3000);
  }

  /* ================= CLASS CARD ROTATION ================= */
  const card1 = document.getElementById("card1");
  const card2 = document.getElementById("card2");

  if (card1 && card2) {
    let showingFirst = true;
    card2.classList.add("hidden");

    setInterval(() => {
      if (showingFirst) {
        card1.classList.add("hidden");
        card2.classList.remove("hidden");
      } else {
        card2.classList.add("hidden");
        card1.classList.remove("hidden");
      }
      showingFirst = !showingFirst;
    }, 3000);
  }

  /* ================= FILTER + SORT CLASSES ================= */
  const instructorFilter = document.getElementById("instructorFilter");
  const difficultyFilter = document.getElementById("difficultyFilter");
  const sortBtn = document.getElementById("sortTime");
  const grid = document.getElementById("classGrid");

  let ascending = true;

  function filterCards() {
    if (!instructorFilter || !difficultyFilter) return;

    const instructorValue = instructorFilter.value.toLowerCase();
    const difficultyValue = difficultyFilter.value.toLowerCase();

    document.querySelectorAll(".card").forEach((card) => {
      const instructor = card.dataset.instructor?.toLowerCase();
      const difficulty = card.dataset.difficulty?.toLowerCase();

      let show = true;

      if (instructorValue !== "all" && instructor !== instructorValue)
        show = false;
      if (difficultyValue !== "all" && difficulty !== difficultyValue)
        show = false;

      card.classList.toggle("hidden", !show);
    });
  }

  function sortByTime() {
    if (!grid) return;

    const cards = Array.from(document.querySelectorAll(".card"));

    cards.sort((a, b) => {
      const timeA = a.dataset.time || "";
      const timeB = b.dataset.time || "";

      return ascending
        ? timeA.localeCompare(timeB)
        : timeB.localeCompare(timeA);
    });

    cards.forEach((card) => grid.appendChild(card));
    ascending = !ascending;
  }

  instructorFilter?.addEventListener("change", filterCards);
  difficultyFilter?.addEventListener("change", filterCards);
  sortBtn?.addEventListener("click", sortByTime);

  filterCards();

  /* ================= MEMBERSHIP CALCULATOR ================= */
  const planSelect = document.getElementById("planSelect");
  const addons = document.querySelectorAll(".addon");
  const totalDisplay = document.getElementById("total");

  function calculateTotal() {
    if (!planSelect || !totalDisplay) return;

    let total = parseFloat(planSelect.value);

    addons.forEach((addon) => {
      if (addon.checked) total += parseFloat(addon.value);
    });

    totalDisplay.textContent = total.toFixed(2);
  }

  planSelect?.addEventListener("change", calculateTotal);
  addons.forEach((addon) => addon.addEventListener("change", calculateTotal));
  calculateTotal();

  /* ================= TESTIMONIAL ROTATION ================= */
  const testimonials = document.querySelectorAll(".testimonial");

  if (testimonials.length) {
    let index = 0;
    testimonials[0].classList.add("active");

    setInterval(() => {
      testimonials[index].classList.remove("active");
      index = (index + 1) % testimonials.length;
      testimonials[index].classList.add("active");
    }, 4000);
  }

  /* ================= TRAINER MODAL ================= */
  const trainerModal = document.getElementById("modal");
  const modalName = document.getElementById("modalName");
  const modalRole = document.getElementById("modalRole");
  const modalBio = document.getElementById("modalBio");
  const modalImg = document.getElementById("modalImg");
  const closeModal = document.getElementById("closeModal");

  document.querySelectorAll(".trainer").forEach((trainer) => {
    trainer.addEventListener("click", () => {
      if (!trainerModal) return;

      modalName.textContent = trainer.dataset.name;
      modalRole.textContent = trainer.dataset.role;
      modalBio.textContent = trainer.dataset.bio;
      modalImg.src = trainer.dataset.img;

      trainerModal.classList.remove("hidden");
    });
  });

  closeModal?.addEventListener("click", () => {
    trainerModal.classList.add("hidden");
  });

  trainerModal?.addEventListener("click", (e) => {
    if (e.target === trainerModal) {
      trainerModal.classList.add("hidden");
    }
  });

  /* ================= CLASS MODAL ================= */
  const classModal = document.getElementById("classModal");
  const closeClassBtn = document.getElementById("closeClassModal");

  const cName = document.getElementById("className");
  const cInstructor = document.getElementById("classInstructor");
  const cDifficulty = document.getElementById("classDifficulty");
  const cDesc = document.getElementById("classDesc");
  const cDuration = document.getElementById("classDuration");
  const cCalories = document.getElementById("classCalories");
  const cImg = document.getElementById("classImg");

  document.querySelectorAll(".class-card").forEach((card) => {
    card.addEventListener("click", () => {
      if (!classModal) return;

      cName.textContent = card.dataset.name;
      cInstructor.textContent = `Instructor: ${card.dataset.instructor}`;
      cDifficulty.textContent = `Difficulty: ${card.dataset.difficulty}`;
      cDesc.textContent = card.dataset.desc;
      cDuration.textContent = card.dataset.duration;
      cCalories.textContent = card.dataset.calories;
      cImg.src = card.dataset.img;

      classModal.classList.remove("hidden");
    });
  });

  closeClassBtn?.addEventListener("click", () => {
    classModal.classList.add("hidden");
  });

  classModal?.addEventListener("click", (e) => {
    if (e.target === classModal) {
      classModal.classList.add("hidden");
    }
  });

  /* ================= MEMBERSHIP CONFIRMATION ================= */
  const submitBtn = document.getElementById("submitMembership");
  const message = document.getElementById("confirmationMessage");

  submitBtn?.addEventListener("click", () => {
    const total = totalDisplay?.textContent || "0";

    message.textContent = `✅ Membership confirmed! Total: $${total}/month`;
    message.classList.remove("hidden");
    message.classList.add("show");

    setTimeout(() => {
      planSelect.selectedIndex = 0;
      addons.forEach((a) => (a.checked = false));
      calculateTotal();

      message.classList.remove("show");

      setTimeout(() => {
        message.classList.add("hidden");
      }, 300);
    }, 2000);
  });
});
