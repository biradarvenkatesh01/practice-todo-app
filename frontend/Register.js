// frontend/src/components/Register.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend API ko register request bhejo
      const res = await axios.post('/api/auth/register', {
        username,
        password,
      });
      console.log(res.data); // Success message ya token
      alert('Registration successful! Please log in.');
      navigate('/login'); // Register hone ke baad login page par bhej do
    } catch (err) {
      console.error(err.response.data);
      alert('Error in registration: ' + err.response.data.msg);
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Choose a username"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Choose a password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;