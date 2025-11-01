import express from "express";
import {
  createBooking,
  getUserBookings,
} from "../controllers/bookingController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createBooking);
// router.post("/", createBooking);
router.get("/", authMiddleware, getUserBookings);
//router.get("/",  getUserBookings);

export default router;
