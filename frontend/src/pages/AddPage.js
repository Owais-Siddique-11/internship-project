// src/pages/AddPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h2>Create New Page</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <br />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <br />
        <button type="submit">Create Page</button>
      </form>
    </div>
  );
};

export default AddPage;
