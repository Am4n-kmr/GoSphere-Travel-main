// Backend/routes/blogRoutes.js
import express from "express";
import { getBlogs, createBlog } from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getBlogs);
router.post("/", createBlog);

export default router; // ✅ Make sure this line exists
