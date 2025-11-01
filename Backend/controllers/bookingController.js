import Booking from "../models/Booking.js";

// 🟢 CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const { name, email, destination, date, people, message } = req.body;
    const userId = req.user ? req.user.id : `guest_${Math.floor(Math.random() * 10000)}`;

    const booking = await Booking.create({
      userId,
      name,
      email,
      destination,
      date,
      people,
      message,
      status: "Confirmed",
      timeOfBooking: new Date(),
    });

    // ✅ Minimal console output
    console.log("\n✅ Booking saved successfully!");
    console.log("Booking ID:", booking._id.toString());
    console.log("User ID:", booking.userId);
    console.log("Time of Booking:", new Date(booking.timeOfBooking).toLocaleString());
    console.log("Status:", booking.status);

    return res.status(201).json({
      success: true,
      message: "✅ Booking saved successfully!",
      bookingId: booking._id,
      userId: booking.userId,
      timeOfBooking: booking.timeOfBooking,
      status: booking.status,
    });
  } catch (error) {
    console.error("❌ Booking Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "❌ Error saving booking.",
      error: error.message,
    });
  }
};

// 🟢 GET BOOKINGS FOR A USER
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user.",
      });
    }

    const bookings = await Booking.find({ userId }).sort({ timeOfBooking: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("❌ Error fetching bookings:", error.message);
    return res.status(500).json({
      success: false,
      message: "❌ Failed to retrieve bookings.",
      error: error.message,
    });
  }
};
