// gameService.js
import config from '../config/config'; 
import axios from 'axios';


const API_BASE_URL = `${config.API_BASE_URL}/games`;


const gameService = {
    startGame: async (status, players, numbersCalled) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/start`, {
                status,
                players, 
                numbersCalled
            });
            return response.data;
        } catch (error) {
            console.error('Error starting the game:', error);
            throw error;
        }
    },

    joinGame: async (gameId, playerId) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/join/${gameId}`, { playerId });
            return response.data;
        } catch (error) {
            console.error('Error joining the game:', error);
            throw error;
        }
    },

    updateGame: async (gameId, gameStatus, numbersCalled) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/update/${gameId}`, {gameStatus, numbersCalled});
            return response.data;
        } catch (error) {
            console.error('Error updating the game:', error);
            throw error;
        }
    },

    getGameInfo: async (gameId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${gameId}`);
            return response.data;
        } catch (error) {
            console.error('Error retrieving game information:', error);
            throw error;
        }
    },

    generateBingoCard: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/generate-card`);
            return response.data;
        } catch (error) {
            console.error('Error fetching Bingo card:', error);
            throw error;
        }
    },

    generateNumber: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/generate-number`);
            return response.data;
        } catch (error) {
            console.error('Error generating bingo number:', error);
            throw error;
        }
    },

    resetNumbers: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/reset-numbers`);
            return response.data;
        } catch (error) {
            console.error('Error reseting numbers:', error);
            throw error;
        }
    },
};

export default gameService;
