import { useState } from 'react';
// Change your imports to look like this:
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App</h1>
      </header>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;