import React from 'react';
import './App.css';
import Receipt from './Receipt';  // Import your Receipt component

const App = () => {
  return (
    <div className="App">
      <h1>Transaction Receipt</h1>
      <Receipt />  {/* Render the Receipt component */}
    </div>
  );
};

export default App;