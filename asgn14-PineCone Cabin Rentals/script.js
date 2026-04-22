document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // FADE-IN EFFECT
  // =========================
  document.querySelectorAll(".fade-in").forEach((el) => {
    el.style.opacity = 0;
    setTimeout(() => {
      el.style.transition = "opacity 1.5s";
      el.style.opacity = 1;
    }, 300);
  });

  // =========================
  // CABIN FILTERS (if exist)
  // =========================
  const sleepFilter = document.getElementById("sleepFilter");
  const luxuryFilter = document.getElementById("luxuryFilter");
  const petFilter = document.getElementById("petFilter");
  const cards = document.querySelectorAll(".card");

  if (sleepFilter && luxuryFilter && petFilter && cards.length) {
    const filterCabins = () => {
      const sleepVal = sleepFilter.value;
      const luxuryVal = luxuryFilter.value;
      const petVal = petFilter.value;

      cards.forEach((card) => {
        const sleeps = parseInt(card.dataset.sleeps);
        const luxury = card.dataset.luxury;
        const pets = card.dataset.pets;

        const sleepMatch =
          sleepVal === "all" ||
          (sleepVal === "6" ? sleeps >= 6 : sleeps === parseInt(sleepVal));

        const luxuryMatch = luxuryVal === "all" || luxury === luxuryVal;
        const petMatch = petVal === "all" || pets === petVal;

        card.style.display =
          sleepMatch && luxuryMatch && petMatch ? "block" : "none";
      });
    };

    [sleepFilter, luxuryFilter, petFilter].forEach((el) =>
      el.addEventListener("change", filterCabins),
    );
  }

  // =========================
  // BOOKING FORM (if exists)
  // =========================
  const form = document.getElementById("bookingForm");
  const dateInput = document.getElementById("date");

  if (form && dateInput) {
    // Date formatting (MM/DD/YYYY)
    dateInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "");

      if (value.length <= 2) {
        e.target.value = value;
      } else if (value.length <= 4) {
        e.target.value = `${value.slice(0, 2)}/${value.slice(2)}`;
      } else {
        e.target.value = `${value.slice(0, 2)}/${value.slice(
          2,
          4,
        )}/${value.slice(4, 8)}`;
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      document
        .querySelectorAll(".error")
        .forEach((el) => (el.textContent = ""));

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const date = dateInput.value.trim();
      const guests = document.getElementById("guests").value;

      let valid = true;

      if (!name) {
        document.getElementById("nameError").textContent = "Name is required";
        valid = false;
      }

      if (!email.includes("@")) {
        document.getElementById("emailError").textContent =
          "Enter a valid email";
        valid = false;
      }

      if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
        document.getElementById("dateError").textContent =
          "Use MM/DD/YYYY format";
        valid = false;
      }

      if (!guests) {
        document.getElementById("guestError").textContent =
          "Select number of guests";
        valid = false;
      }

      if (valid) {
        document.getElementById("successMessage").textContent =
          "Booking request submitted!";
        form.reset();
      }
    });
  }
});

// =========================
// GALLERY LIGHTBOX (jQuery)
// =========================
$(document).ready(function () {
  const $lightbox = $("#lightbox");
  const $img = $("#lightbox-img");

  $(".gallery-img").on("click", function () {
    $img.attr("src", $(this).attr("src"));
    $lightbox.addClass("show");
  });

  const closeLightbox = () => $lightbox.removeClass("show");

  $("#lightbox-close").on("click", closeLightbox);

  $lightbox.on("click", function (e) {
    if (e.target.id === "lightbox") closeLightbox();
  });

  $(document).on("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });
});
