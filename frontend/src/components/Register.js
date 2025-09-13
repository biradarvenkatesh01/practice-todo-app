import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// API base URL ko environment variable se le rahe hain
const API_URL = process.env.REACT_APP_API_URL || '';

function Register() {
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
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    setIsLoading(true); // Registration process shuru hone par loading state true karein
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, {
        username,
        password,
      });
      console.log(res.data);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      alert('Error in registration: ' + (err.response?.data?.msg || 'Something went wrong'));
    } finally {
      setIsLoading(false); // Process complete hone par loading state false karein
    }
  };

  return (
    <div className="auth-container">
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
              disabled={isLoading} // Loading ke time input disable karein
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Choose a password (min 6 characters)"
              name="password"
              value={password}
              onChange={onChange}
              minLength="6"
              required
              disabled={isLoading} // Loading ke time input disable karein
            />
          </div>
          {/* Button text change karein aur use disable karein jab loading ho rahi ho */}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;