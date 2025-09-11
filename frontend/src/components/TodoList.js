// frontend/src/components/TodoList.js

import React from 'react';

function TodoList({ todos, completeTodo, deleteTodo }) {
  return (
    <div className="todo-list">
      <ul>
        {todos.map(todo => (
          <li key={todo._id} className={todo.isCompleted ? 'completed' : ''}>
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