// src/pages/UserPosts.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import "./UserPosts.css";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPosts, setExpandedPosts] = useState({});
  const token = localStorage.getItem("token");

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3005/api/v1/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Format the date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Truncate content to a specific length
  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, content.lastIndexOf(' ', maxLength)) + '...';
  };

  // Toggle expanded state for a post
  const toggleExpand = (postId) => {
    setExpandedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  return (
    <div className="user-layout">
      <UserNavbar />
      <main className="blog-main">
        <div className="blog-container">
          <div className="blog-header">
            <h1 className="blog-title">Our Blog</h1>
            <p className="blog-subtitle">
              Stay up to date with our latest news and insights
            </p>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="loader"></div>
              <p>Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="empty-state">
              <p>No blog posts available yet. Check back soon for updates!</p>
            </div>
          ) : (
            <div className="blog-posts">
              {posts.map((post) => (
                <article key={post.id} className="blog-post">
                  <div className="post-content">
                    <h2 className="post-title">{post.title}</h2>
                    <div className="post-meta">
                      <span className="post-date">
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                    <div className="post-excerpt">
                      <p>
                        {expandedPosts[post.id] 
                          ? post.content 
                          : truncateContent(post.content)}
                      </p>
                    </div>
                    <div className="post-footer">
                      <button 
                        className="read-more"
                        onClick={() => toggleExpand(post.id)}
                      >
                        {expandedPosts[post.id] ? "Show Less" : "Read Full Post"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserPosts;