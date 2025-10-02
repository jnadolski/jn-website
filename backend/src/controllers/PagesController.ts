import { Request, Response } from 'express';
import { Firestore } from 'firebase-admin/firestore';

// GET /api/pages/about
export const getAboutContent = (db: Firestore) => async (req: Request, res: Response) => {
    try {
        const aboutRef = db.collection('pages').doc('about');
        const doc = await aboutRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'About page content not found.' });
        }

        res.status(200).json(doc.data());
    } catch (error) {
        console.error("Error fetching about page content:", error);
        res.status(500).json({ message: "Error fetching about page content" });
    }
};

// PUT /api/pages/about
export const updateAboutContent = (db: Firestore) => async (req: Request, res: Response) => {
    try {
        const updatedContent = req.body; // Expects { bio: string[] }
        const aboutRef = db.collection('pages').doc('about');
        await aboutRef.set(updatedContent, { merge: true }); // Use merge to update specific fields

        res.status(200).json({ message: 'About page content updated successfully.', ...updatedContent });
    } catch (error) {
        console.error("Error updating about page content:", error);
        res.status(500).json({ message: "Error updating about page content" });
    }
};