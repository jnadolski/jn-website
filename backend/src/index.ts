require('dotenv').config();
// backend/src/index.ts

import express from 'express'; // Changed line
import cors from 'cors';
import * as admin from 'firebase-admin';

import { getFirestore, Firestore } from 'firebase-admin/firestore';


// Import Routers/Middleware (Assuming these imports exist)

const createProjectsRouter = require('./routes/ProjectsRouter'); // Import Projects Router
const AuthRouter = require('./routes/AuthRouter'); // Import the default export
const PagesRouter = require('./routes/PagesRouter'); // Import the default export

let db: Firestore;
const app: express.Application = express(); // Define app once at the module level


// --- 2. INITIALIZATION FUNCTION ---
function initializeAppAndServer() {
    console.log("initializeAppAndServer function started.");
    // Check for Critical Environment Variable (Best Practice)
    if (!process.env.JWT_SECRET) {
        console.error("FATAL ERROR: JWT_SECRET environment variable is not defined.");
        throw new Error("FATAL: JWT_SECRET environment variable is not defined.");
    }

    // --- FIREBASE INITIALIZATION ---
    try {
    const base64Secret = process.env.FIREBASE_SERVICE_ACCOUNT_B64;

    if (!base64Secret) {
        console.error("FATAL ERROR: FIREBASE_SERVICE_ACCOUNT_B64 is not defined. Cannot connect to Firestore.");
        throw new Error("FATAL: FIREBASE_SERVICE_ACCOUNT_B64 is not defined. Cannot connect to Firestore.");
    }

    // Decode the Base64 string back to a JSON object
    const serviceAccountJson = Buffer.from(base64Secret, 'base64').toString('utf8');
    const serviceAccount = JSON.parse(serviceAccountJson); 

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });

        // Assign the Firestore instance to the globally declared variable
        db = getFirestore();
        console.log("Firebase Admin SDK initialized and Firestore instance obtained.");

    } catch (error) {
        console.error("CRITICAL ERROR: Failed to initialize Firebase Admin SDK.", error);
        // Do not proceed if the database connection fails
        process.exit(1);
    }

    // --- EXPRESS APPLICATION SETUP (Now safe to use 'db') ---

    // Middleware Setup
    app.use(express.json());
    const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [];
    app.use(cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    }));
    app.use('/api', AuthRouter(db) as express.Router);
    // ... add CORS, logging, and other general middleware here ...

    // Route Definitions
    // Example: Integrating the Projects Router
    // Note: The router function will need to be updated to accept (db) if it's not already.
    app.use('/api/projects', createProjectsRouter(db) as express.Router); 
    app.use('/api/pages', PagesRouter(db) as express.Router);

    // Example: A public health check
    app.get('/', (req, res) => {
        res.status(200).send('API is running.');
    });

    // --- START SERVER LISTENING ---
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

// Execute the main initialization function
initializeAppAndServer();

// --- EXPORT THE APP (Common for testing or serverless functions) ---
export { app };