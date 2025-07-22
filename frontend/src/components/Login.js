import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Make sure this CSS file exists and has styles you want

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3005/api/v1/login', {
        email,
        password,
      });

      if (response.data.success) {
        const user = response.data.data.user;
        const token = response.data.data.token;
        const role = user?.role?.toLowerCase();
        console.log("User data:", user); // Helpful for debugging

        // Extract role safely and normalize it
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        

        if (role === 'admin') {
          navigate('/dashboard');
        } else if (role === 'user') {
          navigate('/home');
        } else {
          alert('Unknown role: ' + role);
        }
      } else {
        alert('Login failed!');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account?{' '}
        <span className="signup-link" onClick={() => navigate('/signup')}>
          Sign up
        </span>
      </p>
    </div>
  );
};

export default Login;
