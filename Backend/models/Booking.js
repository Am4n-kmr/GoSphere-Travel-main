import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  destination: String,
  startDate: Date,
  endDate: Date,
  guests: Number,
  totalPrice: Number
});

export default mongoose.model('Booking', bookingSchema);
