import React from 'react';
import './App.css'

export default function App({ todos }) {
   return (
    <div>
      <h1>Liste des tâches</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? '✅' : '❌'}
          </li>
        ))}
      </ul>
    </div>
  );
}
