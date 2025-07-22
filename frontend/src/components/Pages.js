import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  return (
    <div style={{ padding: "20px" }}>
      <h3>All Pages</h3>
      <table border="1" cellPadding="10" cellSpacing="0">
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
              <td>{page.status}</td>
              <td>{new Date(page.createdAt).toLocaleString()}</td>
              {userRole === "admin" && (
                <td>
                  <button
                    style={{ marginRight: "10px" }}
                    onClick={() => navigate(`/admin/pages/edit/${page.slug}`)}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(page.id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pages;
