import express from 'express';
import gameController from '../controllers/gameController.js';

const router = express.Router();


// Route to start a new game
router.post('/start', gameController.startGame);

// Route for players to join a game
router.post('/join/:gameId', gameController.joinGame);

// Route to update game state (like calling a number)
router.put('/update/:gameId', gameController.updateGame);

// Route to end a game
router.post('/end/:gameId', gameController.endGame);

// Route to generate a Bingo card
router.get('/generate-card', gameController.generateBingoCard);

// Route to generate a new number
router.get('/generate-number', gameController.generateNumber);

// Route to reset numbers
router.get('/reset-numbers', gameController.resetNumbers);

// Route to get game information
router.get('/:gameId', gameController.getGameInfo);

export default router;
