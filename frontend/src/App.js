// frontend/src/App.js

import React, { useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', isCompleted: false },
    { id: 2, text: 'Build a To-Do App', isCompleted: true },
  ]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
  };

  // 1. Task ko complete karne ka function
  const completeTodo = (id) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  // 2. Task ko delete karne ka function
  const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h1>My To-Do App</h1>
      <TodoForm addTodo={addTodo} />
      {/* 3. Naye functions ko props ke through bheja */}
      <TodoList
        todos={todos}
        completeTodo={completeTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;