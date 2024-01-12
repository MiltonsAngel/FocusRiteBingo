import express from 'express';
import session from 'express-session';
import crypto from 'crypto';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import gameRoutes from './routes/gameRoutes.js';
import winnerRoutes from './routes/winnerRoutes.js';
import { connectToServer } from './config/dbConfig.js';
import SocketManager from './sockets/socketManager.js';
import serverConfig from './config/serverConfig.js'

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// WebSocket setup
io.on('connection', (socket) => {
    console.log(`New WebSocket connection: ${socket.id}`);

    // Define other socket events
    socket.on('disconnect', () => {
        console.log(`WebSocket disconnected: ${socket.id}`);
    });
});

// API routes
app.use('/api/games', gameRoutes);
app.use('/api/winner', winnerRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Integrate SocketManager
const socketManager = new SocketManager(server);

// Connect to Database then start the server
const startServer = async () => {
    try {
        await connectToServer();
        console.log('Database connected.');

        const PORT = serverConfig.port;
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Unable to connect to MongoDB:', error);
        process.exit(1);
    }
};

startServer();

export default app;