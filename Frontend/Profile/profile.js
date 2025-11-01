const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

const userNameEl = document.getElementById("userName");
const userEmailEl = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");
const bookingList = document.getElementById("bookingList");

if (user && user.name && user.email) {
  userNameEl.textContent = user.name;
  userEmailEl.textContent = user.email;
} else {
  alert("⚠️ Please log in to view your profile.");
  window.location.href = "../Auth/login.html";
}

// 🟢 Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.href = "../index.html";
});

// 🟢 Fetch User Bookings
async function fetchBookings() {
  if (!token) return;

  try {
    const res = await fetch("http://localhost:8080/api/bookings", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    if (res.ok && data.length > 0) {
      bookingList.innerHTML = "";
      data.forEach((b) => {
        const div = document.createElement("div");
        div.className = "team-member";
        div.innerHTML = `
          <h3>${b.destination}</h3>
          <p>Date: ${new Date(b.date).toLocaleDateString()}</p>
          <p>Status: ${b.status}</p>
        `;
        bookingList.appendChild(div);
      });
    } else {
      bookingList.innerHTML =
        "<p style='text-align:center;'>No bookings found.</p>";
    }
  } catch (err) {
    console.error("Error fetching bookings:", err);
  }
}

fetchBookings();
