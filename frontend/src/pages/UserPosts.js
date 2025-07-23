// src/pages/UserPosts.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3005/api/v1/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <UserNavbar />
      <h2>Latest Blog Posts</h2>
      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: "20px" }}>
          <h4>{post.title}</h4>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
