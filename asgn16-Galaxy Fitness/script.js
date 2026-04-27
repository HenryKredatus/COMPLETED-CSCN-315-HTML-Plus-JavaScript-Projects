document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".card");
  elements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      el.style.transform = "scale(1.05)";
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "scale(1)";
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const card1 = document.getElementById("card1");
  const card2 = document.getElementById("card2");

  let showingFirst = true;

  function rotateCards() {
    if (showingFirst) {
      card1.classList.add("hidden");
      card2.classList.remove("hidden");
    } else {
      card2.classList.add("hidden");
      card1.classList.remove("hidden");
    }
    showingFirst = !showingFirst;
  }

  // Start with one hidden
  card2.classList.add("hidden");

  setInterval(rotateCards, 3000);

  // Keep your hover effect
  const elements = document.querySelectorAll(".card");
  elements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      el.style.transform = "scale(1.05)";
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "scale(1)";
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const instructorFilter = document.getElementById("instructorFilter");
  const difficultyFilter = document.getElementById("difficultyFilter");
  const sortBtn = document.getElementById("sortTime");
  const grid = document.getElementById("classGrid");

  let ascending = true;

  function filterCards() {
    const instructorValue = instructorFilter.value.toLowerCase();
    const difficultyValue = difficultyFilter.value.toLowerCase();

    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      const instructor = card.dataset.instructor.toLowerCase();
      const difficulty = card.dataset.difficulty.toLowerCase();

      let show = true;

      if (instructorValue !== "all" && instructor !== instructorValue) {
        show = false;
      }

      if (difficultyValue !== "all" && difficulty !== difficultyValue) {
        show = false;
      }

      card.classList.toggle("hidden", !show);
    });
  }

  function sortByTime() {
    const cards = Array.from(document.querySelectorAll(".card"));

    cards.sort((a, b) => {
      const timeA = a.dataset.time;
      const timeB = b.dataset.time;

      return ascending
        ? timeA.localeCompare(timeB)
        : timeB.localeCompare(timeA);
    });

    cards.forEach((card) => grid.appendChild(card));

    ascending = !ascending;
  }

  instructorFilter.addEventListener("change", filterCards);
  difficultyFilter.addEventListener("change", filterCards);
  sortBtn.addEventListener("click", sortByTime);

  // initial run
  filterCards();
});

document.addEventListener("DOMContentLoaded", () => {
  const planSelect = document.getElementById("planSelect");
  const addons = document.querySelectorAll(".addon");
  const totalDisplay = document.getElementById("total");

  function calculateTotal() {
    let total = parseFloat(planSelect.value);

    addons.forEach((addon) => {
      if (addon.checked) {
        total += parseFloat(addon.value);
      }
    });

    totalDisplay.textContent = total.toFixed(2);
  }

  planSelect.addEventListener("change", calculateTotal);
  addons.forEach((addon) => addon.addEventListener("change", calculateTotal));

  // initialize
  calculateTotal();
});

document.addEventListener("DOMContentLoaded", () => {
  const testimonials = document.querySelectorAll(".testimonial");
  let index = 0;

  function showNextTestimonial() {
    testimonials[index].classList.remove("active");

    index = (index + 1) % testimonials.length;

    testimonials[index].classList.add("active");
  }

  // start first one
  testimonials[0].classList.add("active");

  // rotate every 4 seconds
  setInterval(showNextTestimonial, 4000);
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const modalName = document.getElementById("modalName");
  const modalRole = document.getElementById("modalRole");
  const modalBio = document.getElementById("modalBio");
  const modalImg = document.getElementById("modalImg");
  const closeModal = document.getElementById("closeModal");

  document.querySelectorAll(".trainer").forEach((trainer) => {
    trainer.addEventListener("click", () => {
      modalName.textContent = trainer.dataset.name;
      modalRole.textContent = trainer.dataset.role;
      modalBio.textContent = trainer.dataset.bio;
      modalImg.src = trainer.dataset.img;

      modal.classList.remove("hidden");
    });
  });

  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  /* ================= HOME HERO TYPE ANIMATION ================= */
  const heroText = document.getElementById("heroText");

  if (heroText && heroText.textContent === "") {
    const text = "Train Beyond Limits";
    let i = 0;

    function typeHero() {
      if (i < text.length) {
        heroText.textContent += text.charAt(i);
        i++;
        setTimeout(typeHero, 80);
      }
    }

    typeHero();
  }

  /* ================= HOME FEATURED HIGHLIGHTS ================= */
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
});

document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submitMembership");
  const planSelect = document.getElementById("planSelect");
  const addons = document.querySelectorAll(".addon");
  const totalDisplay = document.getElementById("total");
  const message = document.getElementById("confirmationMessage");

  submitBtn.addEventListener("click", () => {
    const total = totalDisplay.textContent;

    // confirmation message
    message.textContent = `✅ Membership confirmed! Total: $${total}/month`;
    message.classList.remove("hidden");
    message.classList.add("show");

    // reset after short delay (so user sees message)
    setTimeout(() => {
      // reset dropdown
      planSelect.selectedIndex = 0;

      // reset checkboxes
      addons.forEach((addon) => (addon.checked = false));

      // reset total
      let base = parseFloat(planSelect.value);
      totalDisplay.textContent = base.toFixed(2);

      // fade out message
      message.classList.remove("show");

      setTimeout(() => {
        message.classList.add("hidden");
      }, 300);
    }, 2000);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("classModal");
  const closeBtn = document.getElementById("closeClassModal");

  const name = document.getElementById("className");
  const instructor = document.getElementById("classInstructor");
  const difficulty = document.getElementById("classDifficulty");
  const desc = document.getElementById("classDesc");
  const duration = document.getElementById("classDuration");
  const calories = document.getElementById("classCalories");
  const img = document.getElementById("classImg");

  // OPEN MODAL FOR ALL CLASS CARDS
  document.querySelectorAll(".class-card").forEach((card) => {
    card.addEventListener("click", () => {
      name.textContent = card.dataset.name;

      instructor.textContent = `Instructor: ${card.dataset.instructor}`;

      difficulty.textContent = `Difficulty: ${card.dataset.difficulty}`;

      desc.textContent = card.dataset.desc;
      duration.textContent = card.dataset.duration;
      calories.textContent = card.dataset.calories;
      img.src = card.dataset.img;

      modal.classList.remove("hidden");
    });
  });

  // CLOSE BUTTON
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // CLICK OUTSIDE MODAL
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});
