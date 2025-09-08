// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('/api/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const addTodo = (text) => {
    axios.post('/api/todos', { text: text })
      .then(response => {
        setTodos([...todos, response.data]);
      })
      .catch(error => {
        console.error('Error adding todo:', error);
      });
  };

  const completeTodo = (id) => {
    axios.put(`/api/todos/${id}`)
      .then(response => {
        const newTodos = todos.map(todo =>
          todo._id === id ? response.data : todo
        );
        setTodos(newTodos);
      })
      .catch(error => {
        console.error('Error updating todo:', error);
      });
  };

  const deleteTodo = (id) => {
    axios.delete(`/api/todos/${id}`)
      .then(() => {
        const newTodos = todos.filter(todo => todo._id !== id);
        setTodos(newTodos);
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
  };

  return (
    <div className="App">
      <h1>My To-Do App</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        completeTodo={completeTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;