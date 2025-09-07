// frontend/src/App.js

import React, { useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Fix the bug', isCompleted: true },
    { id: 2, text: 'Add new features', isCompleted: false },
  ]);

  // 1. Naya function banaya
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(), // Unique ID ke liye current time ka istemal kiya
      text: text,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]); // Purani list ke saath naya todo joda
  };

  return (
    <div className="App">
      <h1>My To-Do App</h1>
      {/* 2. addTodo function ko as a prop TodoForm mein bheja */}
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
}

export default App;