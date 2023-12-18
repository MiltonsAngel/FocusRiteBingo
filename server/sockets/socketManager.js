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

            // Handle game-related events
            socket.on('joinGame', (gameId) => {
                console.log(`Client ${socket.id} joined game ${gameId}`);
                socket.join(gameId);
                // Additional logic for joining a game
            });

            socket.on('leaveGame', (gameId) => {
                console.log(`Client ${socket.id} left game ${gameId}`);
                socket.leave(gameId);
                // Additional logic for leaving a game
            });

            socket.on('callNumber', (gameId, number) => {
                console.log(`Number called in game ${gameId}: ${number}`);
                // Logic to handle number call
                this.io.to(gameId).emit('numberCalled', number);
            });

            socket.on('declareBingo', (gameId, playerId) => {
                console.log(`Bingo declared by player ${playerId} in game ${gameId}`);
                // Logic to handle Bingo declaration
                this.io.to(gameId).emit('bingoDeclared', playerId);
            });

            socket.on('disconnect', () => {
                console.log(`Client disconnected: ${socket.id}`);
                // Handle client disconnect
            });
        });
    }
}

export default SocketManager;
