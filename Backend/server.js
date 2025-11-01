// ===== IMPORTS =====
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import net from "net";
import path from "path";
import { fileURLToPath } from "url";

import { loggerMiddleware } from "./middleware/loggerMiddleware.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js"; // ✅ Keep this route
import destinationRoutes from "./routes/destinationRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

// ===== CONFIG =====
dotenv.config();
const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// ===== ROUTES =====
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes); // ✅ booking routes here
app.use("/api/destinations", destinationRoutes);
app.use("/api/blogs", blogRoutes);

// ===== STATIC FRONTEND =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.resolve(__dirname, "../Frontend");
app.use(express.static(frontendPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ===== ERROR HANDLER =====
app.use(errorHandler);

// ===== FIND AVAILABLE PORT FUNCTION =====
function findAvailablePort(startPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.once("error", (err) => {
      if (err.code === "EADDRINUSE") {
        resolve(findAvailablePort(startPort + 1));
      } else {
        reject(err);
      }
    });

    server.once("listening", () => {
      server.close(() => resolve(startPort));
    });

    server.listen(startPort);
  });
}

const START_PORT = parseInt(process.env.PORT, 10) || 8080;

// ===== CONNECT TO MONGODB AND START SERVER =====
mongoose
  .connect(process.env.MONGO_URI)
  .then(async (connection) => {
    console.log("✅ MongoDB Connected");
    console.log("✅ Connected to Database:", connection.connection.name);

    const PORT = await findAvailablePort(START_PORT);
    app.listen(PORT, () =>
      console.log(`✅ Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));
