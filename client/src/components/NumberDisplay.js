import React from 'react';
import '../css/NumberDisplay.css';

const NumberDisplay = ({ currentNumber }) => {


    return (
        <div className="number-display">
            <h2>Last Number Called</h2>
            <div className="number">{currentNumber}</div>
        </div>
    );
};

export default NumberDisplay;
