// Backend/controllers/destinationController.js
import Destination from "../models/Destination.js";

// @desc Get all destinations
export const getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Create a new destination
export const createDestination = async (req, res) => {
  try {
    const { name, location, description, image } = req.body;
    const destination = await Destination.create({ name, location, description, image });
    res.status(201).json(destination);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
