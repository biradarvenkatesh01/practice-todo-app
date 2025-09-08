// frontend/src/components/TodoList.js

import React from 'react';

function TodoList({ todos, completeTodo, deleteTodo }) {
  // ... (Your loading and empty state code can remain here)
  return (
    <div className="todo-list">
      <ul>
        {todos.map(todo => (
          // Yahan todo.id ki jagah todo._id kiya gaya hai
          <li key={todo._id} style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
            <span onClick={() => completeTodo(todo._id)}>
              {todo.text}
            </span>
            <button onClick={() => {
              const isConfirmed = window.confirm("Are you sure you want to delete this task?");
              if (isConfirmed) {
                deleteTodo(todo._id);
              }
            }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;