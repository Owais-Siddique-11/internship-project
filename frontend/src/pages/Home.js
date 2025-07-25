// src/pages/Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import "./Home.css";

const Home = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); 

  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3005/api/v1/pages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Filter for only published pages
      const publishedPages = res.data.data.filter(page => page.status === 'published');
      setPages(publishedPages);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching pages:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  // Add this function to handle card clicks
  const handlePageClick = (slug) => {
    navigate(`/page/${slug}`);
  };

  return (
    <div className="user-layout">
      <UserNavbar />
      <main className="home-main">
        <div className="home-container">
          <div className="welcome-section">
            <h1 className="welcome-title">Welcome to Our Website</h1>
            <p className="welcome-subtitle">
              Explore our pages, services, and blog posts
            </p>
          </div>

          <section className="pages-section">
            <h2 className="section-title">Published Pages</h2>
            
            {loading ? (
              <div className="loading-state">
                <div className="loader"></div>
                <p>Loading pages...</p>
              </div>
            ) : pages.length === 0 ? (
              <div className="empty-state">
                <p>No published pages available yet.</p>
              </div>
            ) : (
              <div className="pages-grid">
                {pages.map((page) => (
                  <div 
                    key={page.id} 
                    className="page-card"
                    onClick={() => handlePageClick(page.slug)}
                    style={{ cursor: 'pointer' }}
                  >
                    <h3 className="page-title">{page.title}</h3>
                    <div className="page-content">
                      <p>
                        {page.content.length > 100 
                          ? `${page.content.substring(0, 100)}...` 
                          : page.content}
                      </p>
                    </div>
                    <div className="page-footer">
                      <span className="page-date">
                        {new Date(page.createdAt).toLocaleDateString()}
                      </span>
                      <span className="read-more">Read more →</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;