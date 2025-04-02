import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the new 'react-dom/client' API
import './index.css';
import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement); // Create a root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);