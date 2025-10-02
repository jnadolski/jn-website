import { Request, Response } from 'express';
import { Firestore } from 'firebase-admin/firestore';

// Placeholder for JWT verification (to be implemented in authMiddleware)
interface AuthenticatedRequest extends Request {
    user?: { userId: string; email: string; }; // Or whatever your JWT payload contains
}

// GET /api/projects
export const getProjects = (db: Firestore) => async (req: Request, res: Response) => {
    try {
        const projectsRef = db.collection('projects');
        const snapshot = await projectsRef.get();
        const projects: any[] = [];
        snapshot.forEach(doc => {
            projects.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Error fetching projects" });
    }
};

// POST /api/projects
export const createProject = (db: Firestore) => async (req: AuthenticatedRequest, res: Response) => {
    try {
        // In a real app, you'd validate req.body and ensure user is authorized
        // For now, we'll just save the project data
        const newProject = req.body;
        const projectsRef = db.collection('projects');
        const docRef = await projectsRef.add(newProject);
        res.status(201).json({ id: docRef.id, ...newProject });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ message: "Error creating project" });
    }
};

// PUT /api/projects/:id
export const updateProject = (db: Firestore) => async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { id } = req.params;
        const updatedProject = req.body;

        // In a real app, you'd validate req.body and ensure user is authorized
        // For now, we'll just update the project data
        const projectRef = db.collection('projects').doc(id);
        await projectRef.update(updatedProject);
        res.status(200).json({ id, ...updatedProject });
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ message: "Error updating project" });
    }
};