// frontend/src/components/TodoList.js

import React from 'react';

// 1. Naye functions ko props se receive kiya
function TodoList({ todos, completeTodo, deleteTodo }) {
  return (
    <div className="todo-list">
      <ul>
        {todos.map(todo => (
          // 2. Har task ke liye ab buttons hain
          <li key={todo.id} style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
            <span onClick={() => completeTodo(todo.id)}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;