// // frontend/src/App.js

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import TodoForm from './components/TodoForm';
// import TodoList from './components/TodoList';
// import Register from './Register'; // Correct path to Register.js
// import Login from './components/Login'; // Assuming you have a Login component

// function App() {
//   // In a real app, you would manage authentication state here.
//   // For now, we are just focusing on the routing fix.

//   return (
//     <Router>
//       <div className="App">
//         <h1>My To-Do App</h1>
//         <Routes>
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />

//           {/* This is the main application page that will be protected later */}
//           <Route path="/todos" element={
//             <>
//               <TodoForm />
//               <TodoList
//                 todos={[]} // Replace with actual todo list state after authentication
//                 completeTodo={() => {}}
//                 deleteTodo={() => {}}
//               />
//             </>
//           } />

//           {/* Optional: Add a default route or a redirect to login */}
//           <Route path="/" element={<Login />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
// frontend/src/App.js


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import TodoPage from './components/TodoPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>My To-Do App</h1>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected route */}
          <Route
            path="/todos"
            element={
              <PrivateRoute>
                <TodoPage />
              </PrivateRoute>
            }
          />

          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Catch all unmatched routes */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
