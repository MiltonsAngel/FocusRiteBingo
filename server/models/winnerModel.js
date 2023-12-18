import { getDb } from '../config/dbConfig.js';

class Winner {
    constructor(gameId, winner, winningNumbers) {
        this.gameId = gameId;
        this.winner = winner || {};
        this.winningNumbers = winningNumbers || {};
    }

    static get collection() {
        return getDb().collection('winners');
    }

    save() {
        return Winner.collection.insertOne(this)
            .then(result => {
                return result;
            })
            .catch(err => {
                console.error('Error saving winner:', err);
                throw err;
            });
    }

    static findById(winnerId) {
        return Winner.collection.findOne({ id: winnerId })
            .then(player => {
                return player;
            })
            .catch(err => {
                console.error('Error finding player by ID:', err);
                throw err;
            });
    }

    static update(winnerId, updateData) {
        return Winner.collection.updateOne({ id: winnerId }, { $set: updateData })
            .then(result => {
                return result;
            })
            .catch(err => {
                console.error('Error updating player:', err);
                throw err;
            });
    }

    static delete(winnerId) {
        return Winner.collection.deleteOne({ id: winnerId })
            .then(result => {
                return result;
            })
            .catch(err => {
                console.error('Error deleting player:', err);
                throw err;
            });
    }
}

export default Winner;
