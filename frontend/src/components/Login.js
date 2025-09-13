import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// API base URL ko environment variable se le rahe hain
const API_URL = process.env.REACT_APP_API_URL || '';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false); // Loading state add kiya hai

  const { username, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Login process shuru hone par loading state true karein
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        username,
        password,
      });

      localStorage.setItem('token', res.data.token);
      
      alert('Login successful!');
      navigate('/todos'); 
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      alert('Error in login: ' + (err.response?.data?.msg || 'Something went wrong'));
    } finally {
      setIsLoading(false); // Process complete hone par loading state false karein
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              name="username"
              value={username}
              onChange={onChange}
              required
              disabled={isLoading} // Loading ke time input disable karein
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={onChange}
              required
              disabled={isLoading} // Loading ke time input disable karein
            />
          </div>
          {/* Button text change karein aur use disable karein jab loading ho rahi ho */}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="auth-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;