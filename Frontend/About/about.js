// Simple mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelector("nav");
  const menuToggle = document.createElement("div");

  menuToggle.classList.add("menu-toggle");
  menuToggle.innerHTML = "&#9776;"; // hamburger icon
  document.querySelector(".navbar .container").appendChild(menuToggle);

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
});
