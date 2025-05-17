import React, { useEffect, useState } from "react";
import axios from 'axios';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/blogs')
            .then(res => setBlogs(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h2>All Blogs</h2>
            {blogs.map(blog => (
                <div key={blog._id}>
                    <h3>{blog.title}</h3>
                    <p>{blog.content}</p>
                    <small>{new Date(blog.createdAt).toLocaleString()}</small>
                </div>
            ))}
        </div>
    );
};

export default BlogList;