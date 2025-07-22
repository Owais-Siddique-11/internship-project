import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import EditPage from "./components/EditPage";
import AddPage from "./pages/AddPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ Protected route for Admin */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute element={<Dashboard />} allowedRole="admin" />
          }
        />

        {/* ✅ Protected route for User */}
        <Route
          path="/home"
          element={<ProtectedRoute element={<Home />} allowedRole="user" />}
        />
        <Route
          path="/admin/pages/edit/:slug"
          element={
            <ProtectedRoute element={<EditPage />} allowedRole="admin" />
          }
        />
        <Route
  path="/admin/pages/add"
  element={
    <ProtectedRoute
      element={<AddPage />}
      allowedRole="admin"
    />
  }
/>

      </Routes>
    </Router>
  );
}

export default App;
