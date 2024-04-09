import React from "react";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h2>{todo.title}</h2>
        </div>
      ))}
    </div>
  );
};
export default App;
