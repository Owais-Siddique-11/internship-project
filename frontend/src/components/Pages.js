import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Pages.css";

const Pages = () => {
  const [pages, setPages] = useState([]);
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await axios.get("http://localhost:3005/api/v1/pages");
        setPages(response.data.data);
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    };

    fetchPages();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3005/api/v1/pages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPages(pages.filter((page) => page.id !== id));
    } catch (error) {
      console.error("Error deleting page:", error);
    }
  };

  const getStatusClass = (status) => {
    if (status === 'published') return 'status-active';
    if (status === 'draft') return 'status-draft';
    return '';
  };

  return (
    <div className="pages-container">
      <h3>All Pages</h3>
      <div className="pages-table-wrapper">
        <table className="pages-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Created At</th>
              {userRole === "admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.id}>
                <td>{page.id}</td>
                <td>{page.title}</td>
                <td>{page.slug}</td>
                <td className={getStatusClass(page.status)}>{page.status}</td>
                <td>{new Date(page.createdAt).toLocaleString()}</td>
                {userRole === "admin" && (
                  <td>
                    <button
                      className="action-btn edit-btn"
                      onClick={() => navigate(`/admin/pages/edit/${page.slug}`)}
                    >
                      Edit
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(page.id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pages;