import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App'; // Make sure to use the correct path to App.tsx

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);