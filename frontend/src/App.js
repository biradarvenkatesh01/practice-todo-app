// frontend/src/App.js

import React, { useState } from 'react'; // Import useState
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  // We use useState to manage our list of todos.
  // The 'todos' variable holds the array of data.
  // 'setTodos' is the function we'll use to update the data.
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', isCompleted: false },
    { id: 2, text: 'Build a To-Do App', isCompleted: true },
    { id: 3, text: 'Deploy the App', isCompleted: false },
  ]);

  return (
    <div className="App">
      <h1>My To-Do App</h1>
      <TodoForm />
      {/* We pass the 'todos' array down to the TodoList component as a "prop" */}
      <TodoList todos={todos} />
    </div>
  );
}

export default App;