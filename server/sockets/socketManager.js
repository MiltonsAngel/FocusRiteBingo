import { Server as SocketIOServer } from 'socket.io';

class SocketManager {
    constructor(server) {
        this.io = new SocketIOServer(server, {
            cors: {
                origin: "http://localhost:3000",  // Client URL
                methods: ["GET", "POST"],
                allowedHeaders: ["Access-Control-Allow-Origin"],
                credentials: true
            }
        });
        this.setupHandlers();
    }

    setupHandlers() {
        this.io.on('connection', (socket) => {
            console.log(`New client connected: ${socket.id}`);

            // Game related events
            socket.on('startGame', (gameId) => {
                console.log(`A new game has started ${gameId}`);
                socket.join(gameId);
                // Send a message to all clients in the room that a new player has joined
                this.io.to(gameId).emit('gameStarted', `A new game has started!`);
            });

            socket.on('joinGame', (gameId, newPlayer) => {
                console.log(`Player ${newPlayer.name} joined game ${gameId}`);
                socket.join(gameId);
                // Send a message to all clients in the room that a new player has joined
                this.io.to(gameId).emit('playerJoined', `${newPlayer.name} has joined the game!`);
            });

            socket.on('leaveGame', (gameId, player) => {
                console.log(`Player ${player.name} left game ${gameId}`);
                socket.leave(gameId);
                // Send a message to all clients in the room that a player has left
                this.io.to(gameId).emit('playerLeft', `${player.name} has left the game!`);
            });

            socket.on('callNumber', (gameId, number) => {
                console.log(`Number called in game ${gameId}: ${number}`);
                // Inform room of tyhe number called
                this.io.to(gameId).emit('callNumber', `${number} called`);
            });

            socket.on('declareBingo', (gameId, player) => {
                console.log('Bingo declared by player', `${player.name} in game ${gameId}`);
                // Player has declared bingo
                this.io.to(gameId).emit('declareBingo', `${player.name} has declared bingo!`);
            });

            socket.on('chatMessage', (gameId, player, message) => {
                console.log(`Chat '${message}' sent by`, `${player.name}`);
                // Player has declared bingo
                this.io.to(gameId).emit('chatMessage', `${player.name} has sent a message`);
            });

            // Client disconnect
            socket.on('disconnect', () => {
                console.log(`Client disconnected: ${socket.id}`);

            });
        });
    }
}

export default SocketManager;
