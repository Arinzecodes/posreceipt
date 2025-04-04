import React from 'react';
import Receipt from './receipt'; // Ensure the correct path to Receipt.tsx

const App: React.FC = () => {
    return (
        <div className="app-container">
            <h1>Transaction Receipt</h1>
            <Receipt /> {/* This will render the receipt */}
        </div>
    );
};

export default App;