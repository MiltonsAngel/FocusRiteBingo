import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import gameRoutes from './routes/gameRoutes.js';
import winnerRoutes from './routes/winnerRoutes.js';
import playerRoutes from './routes/playerRoutes.js';
import { connectToServer, getDb } from './config/dbConfig.js';
import SocketManager from './sockets/socketManager.js';

console.log("Starting server...");
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: "http://localhost:3000",  // Client URL
        methods: ["GET", "POST"],
        allowedHeaders: ["Access-Control-Allow-Origin"],
        credentials: true
    }
});


// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enabling CORS for client-server communication
console.log("Setup CORS...");
app.use(cors());

console.log("Connect websocket...");
// WebSocket setup
io.on('connection', (socket) => {
    console.log(`New WebSocket connection: ${socket.id}`);

    
    socket.on('disconnect', () => {
        console.log(`WebSocket disconnected: ${socket.id}`);
    });

});

// API routes
app.use('/api/games', gameRoutes);
app.use('/api/winner', winnerRoutes);
app.use('/api/players', playerRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Integrate SocketManager
const socketManager = new SocketManager(server);

// Set the server to listen on a port
const PORT = process.env.PORT || 3001; // Server port

console.log("Set up database connection...");
const startServer = async () => {
    try {
        const bingoDb = await connectToServer();
        console.log('Database connected:', bingoDb);

    } catch (error) {
        console.error('Unable to connect to MongoDB:', error);
        process.exit(1);
    }
};

startServer();

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;