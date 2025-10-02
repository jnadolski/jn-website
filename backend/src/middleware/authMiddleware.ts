import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// IMPORTANT: In a real application, this secret should be stored in an environment variable.
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables.');
}

interface AuthenticatedRequest extends Request {
  user?: { userId: string; username: string };
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403); // if the token is no longer valid
    req.user = user;
    next(); // proceed to the next middleware or route handler
  });
};
