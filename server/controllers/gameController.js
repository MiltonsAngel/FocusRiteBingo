import { ObjectId } from 'mongodb';
import Game from '../models/gameModel.js'
import { generateBingoCard } from '../utils/bingoCardGenerator.js';
import { NumberGenerator } from '../utils/numberGenerator.js';

const numGen = new NumberGenerator();
const gameController = {

    // Function to start a new game
    startGame: async (req, res) => {
        try {
            // Find the game with the highest id using find(), sort(), and limit()
            // const lastGameArray = await Game.collection.find().sort({ _id: -1 }).limit(1).toArray();

            // Extract the first element of the array, if it exists
            //const lastGame = lastGameArray.length > 0 ? lastGameArray[0] : null;

            // If a game is found, increment the id by 1, otherwise start at 1
            // const newGameId = lastGame ? lastGame.id + 1 : 1;

            // Extract additional game details from the request body
            const { status, players, numbersCalled } = req.body;

            const newGame = new Game(status, players, numbersCalled);
            const result = await newGame.save();
            res.status(201).json(result);
        } catch (err) {
            console.error('Error in startGame:', err);
            res.status(500).json({ message: 'Error starting new game', error: err });
        }
    },

    // Function for players to join a game
    joinGame: async (req, res) => {
        const { gameId } = req.params;
        const { player } = req.body;
        try {
            // Ensure gameId is properly formatted for query as an ObjectId in MongoDB
            const query = { _id: new ObjectId(gameId) };

            const updateData = {
                $push: { players: player }
            };

            const result = await Game.collection.updateOne(query, updateData);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ message: 'Error joining game', error: err });
        }
    },

    // Function to update game state
    updateGame: async (req, res) => {
        const { gameId } = req.params;
        const { gameStatus, numbersCalled } = req.body;

        try {
            // Ensure gameId is properly formatted for query as an ObjectId in MongoDB
            const query = { _id: new ObjectId(gameId) };

            // Update status and numbersCalled field
            const updateData = {
                $set: { status: gameStatus, numbersCalled: numbersCalled }
            };

            const result = await Game.collection.updateOne(query, updateData);
            res.status(200).json(result);
        } catch (err) {
            console.error('Error updating game:', err);
            res.status(500).json({ message: 'Error updating game', error: err });
        }
    },

    // Function to end a game
    endGame: async (req, res) => {
        const { gameId } = req.params;
        try {
            const result = await Game.collection.update(gameId, { status: 'finished' });
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ message: 'Error ending game', error: err });
        }
    },

    // Function to get game information
    getGameInfo: async (req, res) => {
        const { gameId } = req.params;
        try {
            const game = await Game.collection.findById(gameId);
            if (!game) {
                return res.status(404).json({ message: 'Game not found' });
            }
            res.status(200).json(game);
        } catch (err) {
            res.status(500).json({ message: 'Error retrieving game info', error: err });
        }
    },


    getPlayersForGame:  async (req, res) => {
        const { gameId } = req.params;
        try {
            const players = await Game.getPlayersByGameId(gameId);
            if (!players) {
                return res.status(404).send('Game or players not found');
            }
            res.status(200).json(players);
        } catch (err) {
            res.status(500).send({ message: 'Error retrieving players for game', error: err });
        }
    },


    //  Function to generate a new bingo card
    generateBingoCard: async (req, res) => {
        try {
            const card = generateBingoCard();
            res.status(200).json(card);
        } catch (err) {
            res.status(500).json({ message: 'Error generating Bingo card', error: err });
        }
    },

    //  Function to generate a new number
    generateNumber: async (req, res) => {
        try {
            const number = numGen.generateNumber();
            res.status(200).json(number);
        } catch (err) {
            res.status(500).json({ message: 'Error generating new number', error: err });
        }
    },

    //  Function to reset the generated numbers
    resetNumbers: (req, res) => {
        try {
            numGen.reset();
            res.status(200);
        } catch (err) {
            res.status(500).json({ message: 'Error resetting numbers', error: err });
        }
    },

};

export default gameController;
