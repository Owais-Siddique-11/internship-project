import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState(null);

  const API = "http://localhost:3005/api/v1/posts"; // adjust if needed
  const token = localStorage.getItem("token");

  // 🔁 Fetch all posts
  const fetchPosts = async () => {
    try {
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ✍️ Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add or update post
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(API, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setFormData({ title: "", content: "" });
      setEditingId(null);
      fetchPosts();
    } catch (err) {
      console.error("Error saving post:", err);
    }
  };

  // ✏️ Edit
  const handleEdit = (post) => {
    setFormData({ title: post.title, content: post.content });
    setEditingId(post.id);
  };

  // 🗑️ Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <h2>Manage Posts</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Post Content"
          value={formData.content}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? "Update" : "Add"} Post</button>
      </form>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>: {post.content}{" "}
            <button onClick={() => handleEdit(post)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
