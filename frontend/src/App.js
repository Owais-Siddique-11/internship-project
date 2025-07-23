import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import EditPage from "./components/EditPage";
import AddPage from "./pages/AddPage";
import Services from "./pages/Services";
import Posts from "./pages/Posts";
import Contacts from "./pages/Contacts";
import UserServices from "./pages/UserServices";
import UserPosts from "./pages/UserPosts";
import UserContact from "./pages/UserContact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute element={<Dashboard />} allowedRole="admin" />
          }
        />
        <Route
          path="/admin/pages/add"
          element={<ProtectedRoute element={<AddPage />} allowedRole="admin" />}
        />
        <Route
          path="/admin/pages/edit/:slug"
          element={
            <ProtectedRoute element={<EditPage />} allowedRole="admin" />
          }
        />
        <Route
          path="/admin/services"
          element={
            <ProtectedRoute element={<Services />} allowedRole="admin" />
          }
        />
        <Route
          path="/admin/posts"
          element={<ProtectedRoute element={<Posts />} allowedRole="admin" />}
        />
        <Route
          path="/admin/contacts"
          element={
            <ProtectedRoute element={<Contacts />} allowedRole="admin" />
          }
        />

        {/* User Route */}
        <Route
          path="/home"
          element={<ProtectedRoute element={<Home />} allowedRole="user" />}
        />
        <Route
          path="/user/services"
          element={
            <ProtectedRoute element={<UserServices />} allowedRole="user" />
          }
        />
        <Route
          path="/user/posts"
          element={
            <ProtectedRoute element={<UserPosts />} allowedRole="user" />
          }
        />
        <Route
          path="/user/contact"
          element={
            <ProtectedRoute element={<UserContact />} allowedRole="user" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
