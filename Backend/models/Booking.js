// models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: String, default: () => "guest_" + Math.floor(Math.random() * 10000) }, // 🟢 ADDED default userId
  name: { type: String, required: true },
  email: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: String, required: true },
  people: { type: Number, required: true },
  message: { type: String },
  timeOfBooking: { type: Date, default: Date.now }, // 🟢 ADDED booking time
  status: { type: String, default: "Confirmed" } // 🟢 ADDED booking status
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
