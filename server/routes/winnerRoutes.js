import express from 'express';
import winnerController from '../controllers/winnerController.js';

const router = express.Router();


// Route to register a new player
router.post('/register', winnerController.registerWinner);

// Route for a player to update their information
router.put('/update/:winnerId', winnerController.updateWinner);

// Route to get player information
router.get('/:winnerId', winnerController.getWinnerInfo);

// Route to delete a player
router.delete('/delete/:winnerId', winnerController.deleteWinner);

export default router;