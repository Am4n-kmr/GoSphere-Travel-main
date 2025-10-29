import Blog from "../models/Blog.js";

// @desc Get all Blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Create a new Blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const blog = await Blog.create({ title, content, author });
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
