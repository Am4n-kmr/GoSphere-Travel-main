import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  email: String,
  destination: String,
  numberofpeople: Number,
  travelDate: Date,
  requestSpecial:String
});

export default mongoose.model("Booking", bookingSchema);
