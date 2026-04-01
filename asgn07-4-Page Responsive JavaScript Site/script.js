document.querySelectorAll(".toggle-btn").forEach((btn) => {
  btn.onclick = () => btn.nextElementSibling.classList.toggle("show");
});

document.querySelectorAll(".accordion-btn").forEach((btn) => {
  btn.onclick = () => btn.nextElementSibling.classList.toggle("show");
});

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");

document.querySelectorAll(".gallery img").forEach((img) => {
  img.onclick = () => {
    modal.classList.add("show");
    modalImg.src = img.src;
  };
});

document.querySelector(".close")?.addEventListener("click", () => {
  modal.classList.remove("show");
});

const msg = document.getElementById("message");
const counter = document.getElementById("counter");

msg?.addEventListener(
  "input",
  () => (counter.textContent = msg.value.length + "/200"),
);
