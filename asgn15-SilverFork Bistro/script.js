$(document).ready(function () {
  /* =========================
     DAILY SPECIAL RANDOMIZER
  ========================= */
  const specials = [
    "Truffle Steak with Garlic Butter",
    "Lemon Herb Salmon",
    "Wild Mushroom Risotto",
    "Chocolate Lava Cake",
  ];

  const randomSpecial = specials[Math.floor(Math.random() * specials.length)];
  $("#special-text").text("Today's Special: " + randomSpecial);

  /* =========================
     SLIDER / CAROUSEL
  ========================= */
  let currentSlide = 0;
  const slides = $(".slide");

  function showNextSlide() {
    if (slides.length === 0) return;

    slides.eq(currentSlide).fadeOut(500, function () {
      $(this).removeClass("active");

      currentSlide = (currentSlide + 1) % slides.length;

      slides.eq(currentSlide).fadeIn(500).addClass("active");
    });
  }

  if (slides.length > 0) {
    setInterval(showNextSlide, 3000);
  }

  /* =========================
     MENU TABS
  ========================= */
  $(".tab").click(function () {
    $(".tab").removeClass("active");
    $(this).addClass("active");

    const category = $(this).data("category");

    $(".menu-item").fadeOut(200, function () {
      $(".menu-item").removeClass("show");

      $(".menu-item").each(function () {
        if (category === "all" || $(this).data("category") === category) {
          $(this).fadeIn(200).addClass("show");
        }
      });
    });
  });

  /* =========================
     TIME PICKER
  ========================= */
  const times = [];

  for (let h = 10; h <= 22; h++) {
    ["00", "30"].forEach((m) => {
      let hour = h % 12 || 12;
      let ampm = h < 12 ? "AM" : "PM";
      times.push(`${hour}:${m} ${ampm}`);
    });
  }

  times.forEach((t) => {
    $("#time-grid").append(`<div class="time-option">${t}</div>`);
  });

  $("#time-display").click(() => $("#time-popup").toggle());

  $(document).on("click", ".time-option", function () {
    $("#time-display").val($(this).text());
    $("#time").val($(this).text());
    $("#time-popup").hide();
  });

  $(document).click(function (e) {
    if (!$(e.target).closest(".time-wrapper").length) {
      $("#time-popup").hide();
    }
  });

  /* =========================
     CALENDAR (WITH PAST DATE BLOCKING)
  ========================= */
  let current = new Date();

  $("#date-display").click(function () {
    $("#calendar-popup").toggle();
    renderCalendar();
  });

  $("#prev-month").click(() => {
    current.setMonth(current.getMonth() - 1);
    renderCalendar();
  });

  $("#next-month").click(() => {
    current.setMonth(current.getMonth() + 1);
    renderCalendar();
  });

  function renderCalendar() {
    const y = current.getFullYear();
    const m = current.getMonth();

    const first = new Date(y, m, 1).getDay();
    const days = new Date(y, m + 1, 0).getDate();

    $("#month-label").text(
      current.toLocaleString("default", {
        month: "long",
        year: "numeric",
      }),
    );

    let html = "";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < first; i++) {
      html += `<div class="day empty"></div>`;
    }

    for (let d = 1; d <= days; d++) {
      const cellDate = new Date(y, m, d);
      const full = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

      if (cellDate < today) {
        html += `<div class="day disabled">${d}</div>`;
      } else {
        html += `<div class="day" data-date="${full}">${d}</div>`;
      }
    }

    $("#calendar-grid").html(html);
  }

  $(document).on("click", ".day:not(.empty):not(.disabled)", function () {
    $(".day").removeClass("selected");
    $(this).addClass("selected");

    $("#date").val($(this).data("date"));
    $("#date-display").val($(this).data("date"));

    $("#calendar-popup").hide();
  });

  $(document).click(function (e) {
    if (!$(e.target).closest(".calendar-wrapper").length) {
      $("#calendar-popup").hide();
    }
  });

  /* =========================
     FORM VALIDATION
  ========================= */
  $("#reservation-form").submit(function (e) {
    e.preventDefault();

    let ok = true;

    $(".field").removeClass("error success shake");
    $(".msg").text("").hide();

    function fail(field, msg) {
      field.addClass("error shake");
      field.find(".msg").text(msg).fadeIn(150);
      ok = false;
      setTimeout(() => field.removeClass("shake"), 300);
    }

    function pass(field) {
      field.addClass("success");
    }

    const name = $("#name").parent();
    const date = $("#date-display").parent();
    const time = $("#time-display").parent();
    const party = $("#party").parent();

    if ($("#name").val().trim() === "") fail(name, "Enter name");
    else pass(name);

    if ($("#date").val() === "") fail(date, "Select date");
    else pass(date);

    if ($("#time").val() === "") fail(time, "Select time");
    else pass(time);

    if ($("#party").val() === "") fail(party, "Select party size");
    else pass(party);

    /* =========================
       SUCCESS RESET (FULL CLEAN)
    ========================= */
    if (ok) {
      $("#success-message")
        .text("Reservation submitted successfully!")
        .fadeIn(200);

      // reset form
      $("#reservation-form")[0].reset();

      // clear custom inputs
      $("#date-display, #time-display").val("");
      $("#date, #time").val("");

      // close popups
      $("#calendar-popup, #time-popup").hide();

      // reset UI states
      $(".field").removeClass("error success shake");
      $(".msg").text("").hide();
      $(".icon").empty();
      $(".day").removeClass("selected");

      setTimeout(() => {
        $("#success-message").fadeOut(400);
      }, 2500);
    }
  });
});
