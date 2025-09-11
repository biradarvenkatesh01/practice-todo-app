import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  // Is form ko hum agle step mein functional banayenge
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label>Username</label>
            <input type="text" placeholder="Apna username daalein" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Apna password daalein" />
          </div>
          <button type="submit">Login</button>
        </form>
        <p className="auth-link">
          Naya account banana hai? <Link to="/register">Yahaan register karein</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
