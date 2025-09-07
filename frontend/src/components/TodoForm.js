import React from 'react';

// This is a function declaration
function TodoForm() {
  return (
    <form>
      <input type="text" placeholder="Add a new todo" />
      <button type="submit">Add</button>
    </form>
  );
};

// CORRECT: Use export default at the end
export default TodoForm;