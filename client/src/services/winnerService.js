// winnerService.js
import config from '../config/config';
import axios from 'axios';


const API_BASE_URL = `${config.API_BASE_URL}/winner`;


const winnerService = {
    registerWinner: async (gameId, winner, winningNumbers) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/register`, {
                gameId,
                winner,
                winningNumbers
            });
            return response.data;
        } catch (error) {
            console.error('Error registering player:', error);
            throw error;
        }
    },

    updateWinner: async (playerId, updateData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/update/${playerId}`, updateData);
            return response.data;
        } catch (error) {
            console.error('Error updating player:', error);
            throw error;
        }
    },

    getWinnerInfo: async (playerId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${playerId}`);
            return response.data;
        } catch (error) {
            console.error('Error retrieving player information:', error);
            throw error;
        }
    },

    deleteWinner: async (playerId) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/delete/${playerId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting player:', error);
            throw error;
        }
    },

    // Additional player-related API calls as needed
};

export default winnerService;
