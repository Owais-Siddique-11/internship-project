import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";
import "./Posts.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState(null);

  const API = "http://localhost:3005/api/v1/posts";
  const token = localStorage.getItem("token");

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const handleEdit = (post) => {
    setFormData({ title: post.title, content: post.content });
    setEditingId(post.id);
  };

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
    <div className="admin-layout">
      <AdminNavbar />
      <main className="dashboard-main">
        <div className="posts-container">
          <h2 className="posts-title">Manage Posts</h2>
          
          <div className="posts-form-card">
            <h3 className="form-subtitle">{editingId ? "Edit" : "Add New"} Post</h3>
            <form onSubmit={handleSubmit} className="posts-form">
              <div className="form-group">
                <label htmlFor="title" className="form-label">Post Title</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  className="form-input"
                  placeholder="Enter post title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="content" className="form-label">Post Content</label>
                <textarea
                  id="content"
                  name="content"
                  className="form-textarea"
                  placeholder="Enter post content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows="6"
                />
              </div>
              
              <div className="form-actions">
                {editingId && (
                  <button 
                    type="button" 
                    className="btn-cancel" 
                    onClick={() => {
                      setFormData({ title: "", content: "" });
                      setEditingId(null);
                    }}
                  >
                    Cancel
                  </button>
                )}
                <button type="submit" className="btn-submit">
                  {editingId ? "Update" : "Add"} Post
                </button>
              </div>
            </form>
          </div>
          
          <div className="posts-list-container">
            <h3 className="posts-subtitle">Current Posts</h3>
            {posts.length === 0 ? (
              <div className="empty-state">No posts found. Add your first post above.</div>
            ) : (
              <ul className="posts-list">
                {posts.map((post) => (
                  <li key={post.id} className="post-item">
                    <div className="post-content">
                      <h4 className="post-title">{post.title}</h4>
                      <p className="post-body">{post.content}</p>
                      <div className="post-meta">
                        <span className="post-date">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="post-actions">
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => handleEdit(post)}
                      >
                        Edit
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(post.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Posts;