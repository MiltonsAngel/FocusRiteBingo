// socket.js
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:3001'; 

class Socket {
    constructor() {
        this.socket = io(SERVER_URL, {
            // Additional options if needed
        });
    }

    connect() {
         // Handle new connection
        this.socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

         // Handle new disconnection
        this.socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        // Handle incoming chat messages
        this.socket.on('chatMessage', (message) => {
            console.log('New chat message:', message);
        });

        // Handle game join notifications
        this.socket.on('playerJoined', (playerId) => {
            console.log(`Player joined: ${playerId}`);
        });

        // Handle game leave notifications
        this.socket.on('playerLeft', (playerId) => {
            console.log(`Player left: ${playerId}`);
        });
    }

    joinGame(gameId) {
        this.socket.emit('joinGame', gameId);
    }

    leaveGame(gameId) {
        this.socket.emit('leaveGame', gameId);
    }

    sendChatMessage(message) {
        this.socket.emit('chatMessage', message);
    }

    onChatMessage(callback) {
        this.socket.on('chatMessage', message => {
            callback(message);
        });
    }

    // Add more methods to emit events to the server and listen for events from the server

    disconnect() {
        if (this.socket) {
            console.log('Disconnecting from WebSocket server');
            this.socket.disconnect();
        }
    }
}

const socketService = new Socket();

export default socketService;
