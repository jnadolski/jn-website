// backend/src/index.ts

import * as express from 'express';
import * as admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import * as dotenv from 'dotenv';

// Import Routers/Middleware (Assuming these imports exist)

import createProjectsRouter from './routes/ProjectsRouter'; // Import Projects Router

// Load Environment Variables (Necessary for JWT_SECRET and PORT)
dotenv.config();

// --- 1. GLOBAL VARIABLE DECLARATION ---
// Use 'let' to allow assignment later, outside any block scope.
let db: Firestore;
const app: express.Application = express(); // Define app once at the module level

// --- 2. INITIALIZATION FUNCTION ---
// Function to handle all critical setup: Firebase, Express Middleware, and Listener.
function initializeAppAndServer() {
    
    // Check for Critical Environment Variable (Best Practice)
    if (!process.env.JWT_SECRET) {
        throw new Error("FATAL: JWT_SECRET environment variable is not defined.");
    }
    
    // --- FIREBASE INITIALIZATION ---
    try {
        // Assuming you use service account credentials, adjust path as needed
        const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './service-account.json';
        const fsModule = require('fs');
        const serviceAccount = JSON.parse(fsModule.readFileSync(serviceAccountPath, 'utf8')); 
        
        initializeApp({
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
    // ... add CORS, logging, and other general middleware here ...

    // Route Definitions
    // Example: Integrating the Projects Router
    // Note: The router function will need to be updated to accept (db) if it's not already.
//    app.use('/api/projects', createProjectsRouter(db)); 
    
    // Example: A public health check
    app.get('/', (req, res) => {
        res.status(200).send('API is running.');
    });

    // --- START SERVER LISTENING ---
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

// Execute the main initialization function
initializeAppAndServer();

// --- EXPORT THE APP (Common for testing or serverless functions) ---
export { app };