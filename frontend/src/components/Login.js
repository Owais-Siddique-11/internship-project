import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="login-page">
      <div className="login-container">
        <div className="login-card animate-slide-up">
          <h2 className="login-title">Welcome Back 👋</h2>
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />

            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword((prev) => !prev)}
                title={showPassword ? 'Hide Password' : 'Show Password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <p className="signup-text">
            Don't have an account?{' '}
            <span className="signup-link" onClick={() => navigate('/signup')}>
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
