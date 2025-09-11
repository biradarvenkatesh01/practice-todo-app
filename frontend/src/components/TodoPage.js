import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

// App.js ka saara logic ab yahaan hai
function TodoPage() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Note: Is code ko chalne ke liye backend mein security add karni padegi
    axios.get('/api/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const addTodo = (text) => {
    axios.post('/api/todos', { text })
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
        setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
      })
      .catch(error => {
        console.error('Error updating todo:', error);
      });
  };

  const deleteTodo = (id) => {
    axios.delete(`/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
  };

  return (
    <div>
      <h2>Meri To-Do List</h2>
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
