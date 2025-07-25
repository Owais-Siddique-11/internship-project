import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditPage.css';

function EditPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [pageData, setPageData] = useState({
    title: '',
    slug: '',
    content: '',
    status: 'draft'
  });

  const [pageId, setPageId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPage = async () => {
    try {
      const response = await axios.get(`http://localhost:3005/api/v1/pages/${slug}`);
      setPageData(response.data.data);
      setPageId(response.data.data.id);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch page');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage();
  }, [slug]);

  const handleChange = (e) => {
    setPageData({ ...pageData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:3005/api/v1/pages/${pageId}`,
        pageData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert('Page updated successfully!');
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to update page');
    }
  };

  return (
    <div className="edit-page-container">
      <div className="edit-page-card">
        <h2 className="edit-page-title">Edit Page</h2>
        
        {loading ? (
          <div className="loading-state">
            <div className="loader"></div>
            <p>Loading page data...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p className="error-message">{error}</p>
            <button className="btn-retry" onClick={fetchPage}>
              Try Again
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="edit-page-form">
            <div className="form-group">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                id="title"
                type="text"
                name="title"
                className="form-input"
                value={pageData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="slug" className="form-label">Slug</label>
              <input
                id="slug"
                type="text"
                name="slug"
                className="form-input"
                value={pageData.slug}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="content" className="form-label">Content</label>
              <textarea
                id="content"
                name="content"
                className="form-textarea"
                value={pageData.content}
                onChange={handleChange}
                required
                rows="8"
              />
            </div>

            <div className="form-group">
              <label htmlFor="status" className="form-label">Status</label>
              <select
                id="status"
                name="status"
                className="form-select"
                value={pageData.status}
                onChange={handleChange}
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
                Update Page
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditPage;