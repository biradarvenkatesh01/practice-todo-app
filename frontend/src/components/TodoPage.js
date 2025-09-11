import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  // Function to create axios config with token, wrapped in useCallback
  const getConfig = useCallback(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token, redirect to login
      navigate('/login');
      return null;
    }
    return {
      headers: {
        'x-auth-token': token,
      },
    };
  }, [navigate]);

  useEffect(() => {
    const fetchTodos = async () => {
      const config = getConfig();
      if (config) {
        try {
          const res = await axios.get('/api/todos', config);
          setTodos(res.data);
        } catch (err) {
          console.error('Error fetching todos:', err);
          // If token is invalid, it might result in an error
          if (err.response && err.response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
          }
        }
      }
    };
    fetchTodos();
  }, [getConfig, navigate]); // FIX 1: Added `Maps` to the dependency array

  const addTodo = async (text) => {
    const config = getConfig();
    if (config) {
      config.headers['Content-Type'] = 'application/json';
      try {
        const res = await axios.post('/api/todos', { text }, config);
        setTodos([...todos, res.data]);
      } catch (err) {
        console.error('Error adding todo:', err);
      }
    }
  };

  const completeTodo = async (id) => {
    const config = getConfig();
    if (config) {
      try {
        // FIX 2: Removed unused 'todoToUpdate' variable
        // Optimistically update the UI
        setTodos(todos.map(todo => 
          todo._id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        ));
        await axios.put(`/api/todos/${id}`, null, config);
      } catch (err) {
        console.error('Error completing todo:', err);
        // You could add logic here to revert the UI on error
      }
    }
  };

  const deleteTodo = async (id) => {
    const config = getConfig();
    if (config) {
      try {
        await axios.delete(`/api/todos/${id}`, config);
        setTodos(todos.filter(todo => todo._id !== id));
      } catch (err) {
        console.error('Error deleting todo:', err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="todo-page-container">
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <h2>My Todos</h2>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        completeTodo={completeTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default TodoPage;