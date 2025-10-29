document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Simple validation
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  if (name === "" || email === "") {
    alert("Please fill in all required fields.");
    return;
  }

  // Success message
  alert("Booking submitted successfully! We'll contact you soon.");
  this.reset();
});
