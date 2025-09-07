// frontend/src/components/TodoList.js

import React from 'react';

// 1. Component ko bataya ki woh 'todos' prop receive karega
function TodoList({ todos }) {

  // 2. Ek check lagaya, agar todos nahi hain to null return karo
  if (!todos) {
    return null;
  }

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {/* 3. Ab yeh code safe hai kyunki humne data pass kiya hai */}
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;