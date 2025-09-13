import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

// API base URL ko environment variable se le rahe hain for deployment flexibility
const API_URL = process.env.REACT_APP_API_URL || '';

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  // Axios config function, ab navigate par depend nahi karta
  const getConfig = useCallback(() => {
    const token = localStorage.getItem('token');
    if (!token) {
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
          // API_URL ko use kar rahe hain
          const res = await axios.get(`${API_URL}/api/todos`, config);
          setTodos(res.data);
        } catch (err) {
          console.error('Error fetching todos:', err);
          if (err.response && err.response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
          }
        }
      }
    };
    fetchTodos();
  }, [getConfig, navigate]); // Dependency array ko theek kiya gaya hai

  const addTodo = async (text) => {
    const config = getConfig();
    if (config) {
      config.headers['Content-Type'] = 'application/json';
      try {
        const res = await axios.post(`${API_URL}/api/todos`, { text }, config);
        setTodos([...todos, res.data]);
      } catch (err) {
        console.error('Error adding todo:', err);
      }
    }
  };

  const completeTodo = async (id) => {
    const config = getConfig();
    if (config) {
      // Optimistic UI update se pehle original state ko save kar rahe hain
      const originalTodos = [...todos];
      setTodos(todos.map(todo =>
        todo._id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      ));

      try {
        await axios.put(`${API_URL}/api/todos/${id}`, null, config);
      } catch (err) {
        console.error('Error completing todo:', err);
        // Agar API call fail hoti hai, to UI ko original state par revert kar rahe hain
        setTodos(originalTodos);
        alert('Could not update todo. Please try again.');
      }
    }
  };

  const deleteTodo = async (id) => {
    const config = getConfig();
    if (config) {
       // Optimistic UI update se pehle original state ko save kar rahe hain
      const originalTodos = [...todos];
      setTodos(todos.filter(todo => todo._id !== id));
      try {
        await axios.delete(`${API_URL}/api/todos/${id}`, config);
      } catch (err) {
        console.error('Error deleting todo:', err);
        // Agar API call fail hoti hai, to UI ko original state par revert kar rahe hain
        setTodos(originalTodos);
        alert('Could not delete todo. Please try again.');
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