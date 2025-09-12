// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';

// function Register() {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });

//   const { username, password } = formData;
//   const navigate = useNavigate();

//   const onChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (password.length < 6) {
//       alert('Password must be at least 6 characters long.');
//       return;
//     }
//     try {
//       const res = await axios.post('/api/auth/register', {
//         username,
//         password,
//       });
//       console.log(res.data);
//       alert('Registration successful! Please log in.');
//       navigate('/login');
//     } catch (err) {
//       console.error(err.response.data);
//       alert('Error in registration: ' + (err.response.data.msg || 'Something went wrong'));
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-form">
//         <h2>Register</h2>
//         <form onSubmit={onSubmit}>
//           <div className="form-group">
//             <label>Username</label>
//             <input
//               type="text"
//               placeholder="Choose a username"
//               name="username"
//               value={username}
//               onChange={onChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               placeholder="Choose a password (min 6 characters)"
//               name="password"
//               value={password}
//               onChange={onChange}
//               minLength="6"
//               required
//             />
//           </div>
//           <button type="submit">Register</button>
//         </form>
//         <p className="auth-link">
//           Already have an account? <Link to="/login">Login here</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const { username, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    const value = e.target.name === 'username' ? e.target.value.trimStart() : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('/api/auth/register', {
        username,
        password,
      });

      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Error in registration: ' + (err.response?.data?.msg || err.message || 'Something went wrong'));
    } finally {
      setLoading(false);
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
              autoComplete="username"
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
              autoComplete="new-password"
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
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
