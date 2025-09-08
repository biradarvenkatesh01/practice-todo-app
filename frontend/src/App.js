import React, { useState, useEffect } from 'react'; // 1. useEffect is added
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]); // 2. Initial state is now an empty array
  const [isLoading, setIsLoading] = useState(true); // 3. New state for loading status

  // 4. This will run once when the app loads to simulate fetching data
  useEffect(() => {
    // Simulate a 2-second delay for fetching data from a server
    setTimeout(() => {
      const initialTodos = [
        { id: 1, text: 'Learn React', isCompleted: false },
        { id: 2, text: 'Build a To-Do App', isCompleted: true },
      ];
      setTodos(initialTodos); // Load the data
      setIsLoading(false); // Set loading to false
    }, 2000);
  }, []); // The empty array ensures this runs only once

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
  };

  const completeTodo = (id) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h1>My To-Do App</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        completeTodo={completeTodo}
        deleteTodo={deleteTodo}
        isLoading={isLoading} // 5. Pass the isLoading state to the TodoList
      />
    </div>
  );
}

export default App;

