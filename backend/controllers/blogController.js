const Blog = require('../models/Blog');

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newBlog = new Blog({ title, content });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            id, { title, content }, { new: true }
        );
        if (!updatedBlog) return res.status(404).json({ error: `Blog ID ${id} not found.` });
        res.json(updatedBlog);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) return res.status(404).json({ error: `Blog ID ${id} don't exist.` });
        res.json({ message: `Blog {$id} deleted successfully.` });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { getBlogs, createBlog, updateBlog, deleteBlog }