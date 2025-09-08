// frontend/src/App.js

import React, { useState, useEffect } from 'react'; // 1. useEffect ko import karo
import axios from 'axios'; // 2. axios ko import karo
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]); // 3. Initial state ab ek khaali array hai

  // 4. Yeh function app load hote hi backend se saare todos fetch karega
  useEffect(() => {
    axios.get('/api/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Khaali array ka matlab hai ki yeh sirf ek baar chalega jab component load hoga

  // 5. Ab yeh function backend mein naya task add karega
  const addTodo = (text) => {
    axios.post('/api/todos', { text: text })
      .then(response => {
        setTodos([...todos, response.data]);
      })
      .catch(error => {
        console.error('Error adding todo:', error);
      });
  };

  // 6. Ab yeh function backend mein task ko complete/incomplete mark karega
  const completeTodo = (id) => {
    axios.put(`/api/todos/${id}`)
      .then(response => {
        const newTodos = todos.map(todo =>
          // MongoDB _id ka istemal karta hai
          todo._id === id ? response.data : todo
        );
        setTodos(newTodos);
      })
      .catch(error => {
        console.error('Error updating todo:', error);
      });
  };

  // 7. Ab yeh function backend se task ko delete karega
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