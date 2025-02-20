// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Ensure this path is correct
import './index.css'; // Ensure this path is correct
import { createRoot } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
