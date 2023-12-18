import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import '../css/GameBoard.css'; 
import config from '../config/config'; 
import gameService from '../services/gameService'
import socket from '../utils/socket';

const API_BASE_URL = `${config.API_BASE_URL}`;


const GameBoard = ({ calledNumbers }) => {

    return (
        <div className="game-board">
            <h2>Called Numbers</h2>
            <div className="numbers-display">
                {calledNumbers.map((number, index) => (
                    <div key={index} className="number-cell">
                        {number}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameBoard;
