// src/pages/PageView.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import "./PageView.css";

const PageView = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPageBySlug = async () => {
      try {
        setLoading(true);
        // Try to find the page using the regular pages endpoint
        const res = await axios.get("http://localhost:3005/api/v1/pages", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        // Find the page with matching slug in the response
        const foundPage = res.data.data.find(p => p.slug === slug);
        
        if (foundPage) {
          setPage(foundPage);
        } else {
          setError("Page not found");
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching page:", err);
        setError("Failed to load page content");
        setLoading(false);
      }
    };

    if (slug) {
      fetchPageBySlug();
    }
  }, [slug, token]);

  if (loading) {
    return (
      <div className="user-layout">
        <UserNavbar />
        <main className="page-view-main">
          <div className="loading-container">
            <div className="loader"></div>
            <p>Loading page content...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="user-layout">
        <UserNavbar />
        <main className="page-view-main">
          <div className="error-container">
            <h2>Error</h2>
            <p>{error || "Page not found"}</p>
            <button 
              onClick={() => navigate("/home")} 
              className="back-button"
            >
              Back to Home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="user-layout">
      <UserNavbar />
      <main className="page-view-main">
        <div className="page-container">
          <article className="page-article">
            <header className="page-header">
              <h1 className="page-title">{page.title}</h1>
              <div className="page-meta">
                <span className="page-date">
                  Published: {new Date(page.createdAt).toLocaleDateString()}
                </span>
                {page.updatedAt !== page.createdAt && (
                  <span className="page-date">
                    Updated: {new Date(page.updatedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </header>
            
            <div className="page-content">
              {page.content.split('\n').map((paragraph, index) => (
                paragraph ? <p key={index}>{paragraph}</p> : null
              ))}
            </div>
            
            <div className="page-actions">
              <button 
                onClick={() => navigate("/home")} 
                className="back-button"
              >
                Back to Home
              </button>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PageView;