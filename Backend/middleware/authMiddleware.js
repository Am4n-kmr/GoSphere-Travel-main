import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Get the actual token part

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded payload to req.user
    req.user = decoded;

    next(); // Continue to protected route handler
  } catch (err) {
    // Handle specific JWT errors
    if (err.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Session expired. Please log in again." });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token. Please log in again." });
    } else {
      return res.status(500).json({ message: "Token verification failed.", error: err.message });
    }
  }
}
