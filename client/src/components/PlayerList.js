// PlayerList.js
import React, { useState, useEffect } from 'react';
import '../css/PlayerList.css'; 

const PlayerList = ({ players, onLeaveGame }) => {
    const [playerLeft, setPlayerLeft] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (playerLeft && playerLeft.length !== 0) {
            setMessage(`${playerLeft.name} has left the game`);
            // Clear the message after delay
            setTimeout(() => {
                setMessage('');
            }, 3000);


        }
    }, [playerLeft]);

    if (!Array.isArray(players)) {
        console.error('Expected players to be an array', players);
        return <div>No player data available.</div>;
    }

    const handleLeaveGame = (playerId) => {
        const leavingPlayer = players.find(p => p.id === playerId);
        setPlayerLeft(leavingPlayer);
        onLeaveGame(playerId); 
    };

    return (
        <div className="player-list">
            <h2>Players</h2>
            <div>{message}</div>
            <ul>
                {players.map((player, index) => (
                    <li key={index} className="player-item">
                        {player.name}
                        <button onClick={() => handleLeaveGame(player.id)} className="leave-game-button">
                            Leave Game
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlayerList;
