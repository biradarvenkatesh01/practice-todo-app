// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ children }) => {
//   const isAuthenticated = localStorage.getItem('token');

//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct named import

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token); // ✅ use jwtDecode instead of jwt_decode
    if (decoded.exp * 1000 < Date.now()) {
      // Token expired
      localStorage.removeItem('token');
      return <Navigate to="/login" />;
    }
  } catch (e) {
    // Invalid token
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
