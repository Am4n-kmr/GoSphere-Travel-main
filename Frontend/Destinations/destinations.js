// destinations.js

document.addEventListener("DOMContentLoaded", () => {
  // Highlight active nav link based on URL
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });

  // Smooth scroll for footer social links
  document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      alert(`Redirecting to ${link.textContent} page...`);
      // You could replace alert with actual redirect if needed
    });
  });
});
