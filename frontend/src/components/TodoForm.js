// frontend/src/components/TodoForm.js

import React, { useState } from 'react';

// 1. addTodo function ko props se receive kiya
function TodoForm({ addTodo }) {
  const [value, setValue] = useState(''); // 2. Input field ke liye state banayi

  const handleSubmit = (e) => {
    e.preventDefault(); // 3. Form submit hone par page ko reload hone se roka
    if (!value) return; // Agar input khali hai to kuch mat karo
    addTodo(value); // 4. App.js se mile hue addTodo function ko call kiya
    setValue(''); // 5. Input field ko khali kar diya
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new todo"
        value={value} // Input ki value ko state se joda
        onChange={(e) => setValue(e.target.value)} // Jab user type kare, to state ko update karo
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;