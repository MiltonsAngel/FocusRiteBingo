import { getDb } from '../config/dbConfig.js';

class Game {
    constructor(status, players, numbersCalled) {
        this.status = status; // e.g., 'waiting', 'in-progress', 'finished'
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

    static addPlayerToGame(gameId, player) {
        try {
            const result = Game.collection.updateOne({ id: gameId }, { $addToSet: player })
            return result;
        }
        catch (err) {
            console.error('Error adding new playere to game:', err);
            throw err;
        }
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

    static async getPlayersByGameId(gameId) {
        try {
            // Fetch the game by its _id
            const game = await Game.collection.findOne({ _id: new ObjectId(gameId) });
            if (!game) {
                return null; // or throw an error if game not found
            }

            // Assuming 'Player' is your player model
            // Fetch player details for each player ID in the game's player array
            const playerDetails = await Promise.all(
                game.players.map(playerId => 
                    Game.collection.findPlayerById(playerId) // Method in Player model to find by ID
                )
            );

            return playerDetails;
        } catch (err) {
            console.error('Error getting players for game:', err);
            throw err; // Rethrow the error for the caller to handle
        }
    }


    static async findPlayerById(playerId) {
        try {
            return await this.collection.findOne({ _id: new ObjectId(playerId) });
        } catch (err) {
            console.error('Error finding player:', err);
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

}

export default Game;
