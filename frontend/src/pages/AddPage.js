import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddPage.css";

const AddPage = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3005/api/v1/pages",
        { title, slug, content, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Page created successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating page:", error);
      alert("Failed to create page");
    }
  };

  return (
    <div className="add-page-container">
      <div className="add-page-card">
        <h2 className="add-page-title">Create New Page</h2>
        <form onSubmit={handleSubmit} className="add-page-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              id="title"
              type="text"
              className="form-input"
              placeholder="Enter page title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="slug" className="form-label">Slug</label>
            <input
              id="slug"
              type="text"
              className="form-input"
              placeholder="page-url-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="content" className="form-label">Content</label>
            <textarea
              id="content"
              className="form-textarea"
              placeholder="Page content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="8"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              id="status"
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="btn-cancel" 
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Create Page
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPage;