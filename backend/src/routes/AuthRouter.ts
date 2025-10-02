import { Router, Request, Response } from 'express';
import { Firestore } from 'firebase-admin/firestore';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

// This function will be called from index.ts and passed the Firestore instance
const createAuthRouter = (db: Firestore): Router => {
    const router = Router();

    // POST /api/login
    router.post('/login', async (req: Request, res: Response) => {
        const { password } = req.body; // Changed from { email, password }

        // Placeholder for actual authentication logic
        // In a real app, you would fetch user from Firestore,
        // compare hashed password, and generate a real JWT.

        // Simplified check for just a password
        if (password === 'password') { // Only checking password
            // Generate a dummy JWT for testing
            const token = jwt.sign({ userId: 'testUser123' }, process.env.JWT_SECRET as string, { expiresIn: '1h' }); // Removed email from payload
            return res.json({ message: 'Login successful (TEST MODE)', token });
        } else {
            return res.status(401).json({ message: 'Invalid credentials (TEST MODE)' });
        }
    });

    return router;
};

module.exports = createAuthRouter;