import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

// Extend the Request interface to include a user property
interface AuthenticatedRequest extends Request {
    user?: { userId: string; email: string; }; // Or whatever your JWT payload contains
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) {
        return res.status(401).json({ message: 'Authentication token required.' });
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) {
            console.error("JWT verification error:", err);
            return res.status(403).json({ message: 'Invalid or expired token.' });
        }
        // Attach the user payload to the request object
        req.user = user as { userId: string; email: string; }; // Cast to your expected user payload type
        next(); // Proceed to the next middleware/route handler
    });
};