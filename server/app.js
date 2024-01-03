import express from 'express';
import session from 'express-session';
import crypto from 'crypto';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import gameRoutes from './routes/gameRoutes.js';
import winnerRoutes from './routes/winnerRoutes.js';
import playerRoutes from './routes/playerRoutes.js';
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
app.use('/api/players', playerRoutes);

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



{/*
import express from 'express';
import session from 'express-session';
import crypto from 'crypto';
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

const secret = crypto.randomBytes(64).toString('hex');

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true
  }));
  
  app.get('/', (req, res) => {
    // Access the session ID from the request
    let sessId = req.sessionID;
  
    // Set a cookie with the session ID
    res.cookie('sessionId', sessId, { maxAge: 900000, httpOnly: true });
  
    // Send some response or render a page
    res.send(`Session ID set in cookies: ${sessId}`);
  });
  
  app.listen(3000, () => console.log(`Server started on port 3000`));


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

*/}