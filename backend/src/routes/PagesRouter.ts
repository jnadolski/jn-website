import { Router } from 'express';
import { Firestore } from 'firebase-admin/firestore';
import { getAboutContent, updateAboutContent } from '../controllers/PagesController';
import { authenticateToken } from '../middleware/authMiddleware'; // Assuming authentication is needed for updating

const createPagesRouter = (db: Firestore): Router => {
    const router = Router();

    // GET /api/pages/about (Public access)
    router.get('/about', getAboutContent(db));

    // PUT /api/pages/about (Requires authentication)
    router.put('/about', authenticateToken, updateAboutContent(db));

    return router;
};

export default createPagesRouter;