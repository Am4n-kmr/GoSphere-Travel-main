document.getElementById("bookingForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token"); // ✅ retrieve saved token
  if (!token) {
  const loginPrompt = document.createElement("div");
  loginPrompt.innerHTML = `
    <div style="
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;">
      <div style="
        background: white;
        padding: 30px 40px;
        border-radius: 12px;
        text-align: center;
        max-width: 300px;">
        <h3>You must be logged in to book.</h3>
        <button id="goLoginBtn" style="
          margin-top: 15px;
          padding: 10px 20px;
          border: none;
          background-color: #007bff;
          color: white;
          border-radius: 8px;
          cursor: pointer;">
          Go to Login
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(loginPrompt);

  document.getElementById("goLoginBtn").addEventListener("click", () => {
    window.location.href = "../Auth/login.html"; // adjust path if needed
  });

  return;
}



  const formData = new FormData(e.target);
  const bookingData = Object.fromEntries(formData.entries());

  const res = await fetch("http://localhost:8080/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ✅ attach token
    },
    body: JSON.stringify(bookingData),
  });

  const data = await res.json();

  if (res.ok) {
    alert("Booking successful!");
    e.target.reset();
  } else {
    alert(data.message || "Booking failed!");
  }
});
