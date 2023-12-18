import React from 'react';
import { useEffect, useState } from 'react';
import '../css/BingoCard.css'; 

const BingoCard = ({ bingoCard, clickedNumbers, onNumberClick, calledNumbers, declareBingo  }) => {
    const [canDeclareBingo, setCanDeclareBingo] = useState(false);

    const handleClick = (selectedNumber) => {
        onNumberClick(selectedNumber, calledNumbers);
    };

    useEffect(() => {
        const totalNumbers = Object.values(bingoCard).flat().filter(n => n !== 'FREE').length;
        setCanDeclareBingo(clickedNumbers.length === totalNumbers);
    }, [clickedNumbers, bingoCard]);


    return (
        <div className="bingo-card">
            {Object.keys(bingoCard).map((column) => (
                <div key={column} className="bingo-column">
                    <div className="column-header">{column}</div>
                    {bingoCard[column].map((number, index) => (
                        <div
                            key={index}
                            className={`bingo-cell ${clickedNumbers.includes(number) ? 'called' : ''}`}
                            onClick={() => handleClick(number)}
                        >
                            {number !== 'FREE' ? number : ''}
                        </div>
                    ))}
                </div>
            ))}
            
            <button style={{ cursor: 'pointer' }} onClick={() => declareBingo(canDeclareBingo, clickedNumbers)} disabled={!canDeclareBingo}>Declare Bingo</button>
        </div>
    );
};

export default BingoCard;
