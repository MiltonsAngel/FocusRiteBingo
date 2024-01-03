import { MongoClient } from 'mongodb';

const url = 'mongodb://127.0.0.1:27017'; //'mongodb://localhost:27017' 
const dbName = 'FocusRiteBingo'; 

let db;

const connectToServer = async () => {
    try {
        console.log("Attempting to connect to MongoDB...");
        const client = await MongoClient.connect(url, {});
        console.log("Connected successfully to MongoDB server");
        
        db = client.db(dbName);
        return db; // Return the database instance
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        throw err; // Throw error
    }
};

const getDb = () => {
    return db;
};

export { connectToServer, getDb };
