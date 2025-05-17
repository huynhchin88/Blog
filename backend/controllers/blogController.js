const Blog = require('../models/Blog');

const getBlogs = async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
};

const createBlog = async (req, res) => {
    const { title, content } = req.body;
    const newBlog = new Blog({ title, content });
    await newBlog.save();
    res.status(201).json(newBlog);
};

module.exports = { getBlogs, createBlog }