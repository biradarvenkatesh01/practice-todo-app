import React from 'react';

// Using a named export to match your import in App.js
export const TodoForm = () => {
  return (
    <form>
      <input type="text" placeholder="Add a new todo" />
      <button type="submit">Add</button>
    </form>
  );
};