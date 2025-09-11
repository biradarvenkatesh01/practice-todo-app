import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import TodoPage from './components/TodoPage';
import PrivateRoute from './components/PrivateRoute'; // Isse hum agle step mein banayenge

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Main Application Route - Protected by PrivateRoute */}
          <Route 
            path="/todos" 
            element={
              <PrivateRoute>
                <TodoPage />
              </PrivateRoute>
            } 
          />

          {/* Default Route: Agar user kahin aur jaaye, to use login par bhej do */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

