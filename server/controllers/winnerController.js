import { ObjectId } from 'mongodb';
import Winner from '../models/winnerModel.js';

const winnerController = {
    // Function to register winner for this game
    registerWinner: async (req, res) => {
        try {
            // Extract player data from request body
            const { gameId,  winner, winningNumbers } = req.body;
    
            // Validate the input data
            if (!gameId || !winner) {
                return res.status(400).json({ message: 'Missing required fields: gameId and winner' });
            }
    
            // Check if the game already exists
            //const existingGame = await Winner.collection.find().sort({ _id: -1 }).limit(1).toArray(); 
            //if (existingGame) {
            //    return res.status(409).json({ message: 'A game with this id already exists' });
            //}
    
            // Create a new player with the provided data
            const newwinner = new Winner( gameId, winner, winningNumbers); 
    
            // Save the new player to the database
            const result = await newwinner.save();
            res.status(201).json(result);
        } catch (err) {
            console.error('Error registering player:', err);
            res.status(500).json({ message: 'Error registering player', error: err });
        }
    },
    

    // Function for updating player information
    updateWinner: async (req, res) => {
        const { winnerId } = req.params;
        const {winner, winningNumbers} = req.body; 
        try {
            const query = { _id: new ObjectId(winnerId) };
            const updateData = {
                $set: { winner: winner,winningNumbers: winningNumbers }
            };
    
            const result = await Winner.update(query, updateData);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ message: 'Error updating player info', error: err });
        }
    },

    // Function to retrieve winner information
    getWinnerInfo: async (req, res) => {
        const { winnerId } = req.params;
        try {
            const winner = await Winner.findById(winnerId);
            if (!winner) {
                return res.status(404).json({ message: 'Winner not found' });
            }
            res.status(200).json(winner);
        } catch (err) {
            res.status(500).json({ message: 'Error retrieving winner info', error: err });
        }
    },

    // Function to delete a player
    deleteWinner: async (req, res) => {
        const { winnerId } = req.params;
        try {
            const result = await Winner.delete(winnerId);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ message: 'Error deleting winner', error: err });
        }
    },

};

export default winnerController;
