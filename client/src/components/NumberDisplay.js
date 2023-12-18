import React, { useState, useEffect } from 'react';
import '../css/NumberDisplay.css';

const NumberDisplay = ({ currentNumber, newGameMsg }) => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (newGameMsg !== null) {
            setMessage(`${newGameMsg}`);
            // Clear the message after delay
            setTimeout(() => {
                setMessage('');
            }, 4000);

        }
    }, [newGameMsg]);

    return (
        <div className="number-display">
            <h2>Last Number Called</h2>
            <div>{message}</div>
            <div className="number">{currentNumber}</div>
        </div>
    );
};

export default NumberDisplay;
