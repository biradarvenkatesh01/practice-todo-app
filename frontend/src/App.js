// frontend/src/App.js

import React, { useState } from 'react'; // 1. useState ko import karo
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  // 2. 'todos' state banayi
  const [todos, setTodos] = useState([
    { id: 1, text: 'Fix the bug', isCompleted: true },
    { id: 2, text: 'Add new features', isCompleted: false },
  ]);

  return (
    <div className="App">
      <h1>My To-Do App</h1>
      <TodoForm />
      {/* 3. 'todos' state ko as a prop bheja */}
      <TodoList todos={todos} />
    </div>
  );
}

export default App;