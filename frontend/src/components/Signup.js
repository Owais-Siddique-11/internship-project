import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    secretKey: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    if (formData.role === 'admin') {
      dataToSend.secretKey = formData.secretKey;
    }

    try {
      const response = await axios.post('http://localhost:3005/api/v1/signup', dataToSend);
      alert('Signup successful 🎉');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Signup failed ❌');
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Signup</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="input-field"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input-field"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="input-field"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="input-field select-field"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {formData.role === 'admin' && (
          <input
            type="text"
            name="secretKey"
            placeholder="Enter Admin Secret Key"
            value={formData.secretKey}
            onChange={handleChange}
            required
            className="input-field"
          />
        )}

        <button type="submit" className="submit-btn">Signup</button>
      </form>

      <p className="login-link">
        Already have an account?{' '}
        <span onClick={() => navigate('/')} className="link-text">
          Sign in
        </span>
      </p>
    </div>
  );
};

export default Signup;
