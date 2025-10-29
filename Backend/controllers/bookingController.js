import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({ ...req.body, userId: req.user.id });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
