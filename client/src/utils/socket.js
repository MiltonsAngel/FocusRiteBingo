// socket.js
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:3001';

class Socket {
    constructor() {
        this.socket = io(SERVER_URL, {
        });
    }

    on(eventName, callback) {
        this.socket.on(eventName, callback);
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

        // Handle game started
        this.socket.on('gameStarted', (gameId) => {
            console.log(`A new game has started:', ${gameId}`);
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

        // Handle number called notifications
        this.socket.on('callNumber', (number) => {
            console.log(`Last number called: ${number}`);
        });

        // Handle bingo declared notifications
        this.socket.on('declareBingo', (player) => {
            console.log(`Bingo declared by ${player.name}`);
        });
    }

    startGame(gameId) {
        this.socket.emit('startGame', gameId);
    }

    joinGame(gameId, player) {
        this.socket.emit('joinGame', gameId, player);
    }

    leaveGame(gameId, player) {
        this.socket.emit('leaveGame', gameId, player);
    }

    numberCalled(gameId, number) {
        this.socket.emit('callNumber', gameId, number);
    }

    declareBingo(gameId, player) {
        this.socket.emit('declareBingo', gameId, player);
    }

    sendChatMessage(gameId, player, message) {
        this.socket.emit('chatMessage', gameId, player, message);
    }

   // onChatMessage(callback) {
   //     this.socket.on('chatMessage', message => {
   //         callback(message);
   //     });
   // }

    disconnect() {
        if (this.socket) {
            console.log('Disconnecting from WebSocket server');
            this.socket.disconnect();
        }
    }
}

const socketService = new Socket();

export default socketService;
