import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [pageData, setPageData] = useState({
    title: '',
    slug: '',
    content: '',
    status: 'draft'
  });

  const [pageId, setPageId] = useState(null); // Store page ID separately
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPage = async () => {
    try {
      const response = await axios.get(`http://localhost:3005/api/v1/pages/${slug}`);
      setPageData(response.data.data);
      setPageId(response.data.data.id); // Store ID for PUT request
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch page');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage();
  }, [slug]); // correct dependency

  const handleChange = (e) => {
    setPageData({ ...pageData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:3005/api/v1/pages/${pageId}`, // use pageId here
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Edit Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br />
          <input
            type="text"
            name="title"
            value={pageData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Slug:</label><br />
          <input
            type="text"
            name="slug"
            value={pageData.slug}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Content:</label><br />
          <textarea
            name="content"
            value={pageData.content}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Status:</label><br />
          <select
            name="status"
            value={pageData.status}
            onChange={handleChange}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>Update Page</button>
      </form>
    </div>
  );
}

export default EditPage;
