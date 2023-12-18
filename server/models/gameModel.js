import { getDb } from '../config/dbConfig.js';

class Game {
    constructor(status, players, numbersCalled) {
        this.status = status; // e.g., 'started', 'in-progress', 'finished'
        this.players = players || [];
        this.numbersCalled = numbersCalled || [];
    }

    static get collection() {
        return getDb().collection('games');
    }

    async save() {
        try {
            const result = await Game.collection.insertOne(this);
            return result;
        } catch (err) {
            console.error('Error saving game:', err);
            throw err;
        }
    }

    static async findById(gameId) {
        try {
            const game = await Game.collection.findOne({ id: gameId });
            return game;
        } catch (err) {
            console.error('Error finding game by ID:', err);
            throw err;
        }
    }

    static async update(gameId, updateData) {
        try {
            const result = await Game.collection.updateOne({ id: gameId }, { $set: updateData });
            return result;
        } catch (err) {
            console.error('Error updating game:', err);
            throw err;
        }
    }

    static delete(gameId) {
        return Game.collection.deleteOne({ id: gameId })
            .then(result => {
                return result;
            })
            .catch(err => {
                console.error('Error deleting game:', err);
                throw err;
            });
    }

    static addPlayerToGame(gameId, playerId) {
        return Game.collection.updateOne({ id: gameId }, { $addToSet: { players: playerId } })
            .then(result => {
                return result;
            })
            .catch(err => {
                console.error('Error adding player to game:', err);
                throw err;
            });
    }

    static removePlayerFromGame(gameId, playerId) {
        return Game.collection.updateOne({ id: gameId }, { $pull: { players: playerId } })
            .then(result => {
                return result;
            })
            .catch(err => {
                console.error('Error removing player from game:', err);
                throw err;
            });
    }


}

export default Game;
