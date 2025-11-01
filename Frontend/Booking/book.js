// 🟢 Display user info if available
const userInfoBox = document.getElementById("user-info");
const usernameEl = document.getElementById("username");
const useremailEl = document.getElementById("useremail");
const logoutBtn = document.getElementById("logoutBtn");

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token"); // 🟢 Get JWT token

if (user && user.name && user.email) {
  userInfoBox.style.display = "flex";
  usernameEl.textContent = user.name;
  useremailEl.textContent = user.email;
} else {
  userInfoBox.style.display = "none";
}

// 🟢 Logout clears stored user and reloads page
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token"); // also remove token
  window.location.reload();
});

// 🟢 Booking form submission
document.getElementById("bookingForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // ✅ If not logged in, show popup
  if (!user || !user.email || !token) {
    document.getElementById("loginAlert").style.display = "flex";
    return;
  }

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("http://localhost:8080/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 🟢 Attach token
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.status === 401 || res.status === 403) {
      alert("⚠️ Session expired or unauthorized. Please log in again.");
      localStorage.removeItem("token");
      window.location.href = "../Auth/login.html";
      return;
    }

    if (result.success) {
      alert(
        `✅ Booking Successful!\n\nBooking ID: ${result.bookingId}\nUser ID: ${
          result.userId
        }\nTime: ${new Date(result.timeOfBooking).toLocaleString()}\nStatus: ${
          result.status
        }`
      );
      e.target.reset();
    } else {
      alert("❌ Booking failed: " + (result.message || "Unknown error"));
    }
  } catch (error) {
    alert("❌ Error submitting booking: " + error.message);
  }
});

// 🟢 Popup buttons
document.getElementById("goLogin").addEventListener("click", () => {
  window.location.href = "../Auth/login.html";
});

document.getElementById("goHome").addEventListener("click", () => {
  window.location.href = "../index.html";
});
