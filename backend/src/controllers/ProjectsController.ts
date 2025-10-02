// src/controllers/ProjectsController.ts
import { Request, Response } from 'express';
import { Firestore } from 'firebase-admin/firestore';
import { NewProject, Project, ProjectData } from '../types/Project'; 

// 1. GET /api/projects - READ ALL
export const getProjects = (db: Firestore) => async (req: Request, res: Response): Promise<void> => {
    const projectsCollection = db.collection('projects');
    try {
        const snapshot = await projectsCollection.get();
        const projects = snapshot.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as ProjectData)
        }));
        res.status(200).json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).send('Internal Server Error');
    }
};

// 2. POST /api/projects - CREATE
export const createProject = (db: Firestore) => async (req: Request, res: Response): Promise<void> => {
    const projectsCollection = db.collection('projects');
    const newProjectData: NewProject = req.body; 

    if (!newProjectData.title || !newProjectData.techStack) {
        res.status(400).send('Missing required project fields.');
        return;
    }
    
    try {
        const docRef = await projectsCollection.add(newProjectData);
        res.status(201).json({ id: docRef.id, message: 'Project created successfully.' });
    } catch (error) {
        res.status(500).send('Failed to create project.');
    }
};

// 3. PUT /api/projects/:id - UPDATE
export const updateProject = (db: Firestore) => async (req: Request, res: Response): Promise<void> => {
    const projectsCollection = db.collection('projects');
    const { id } = req.params;
    const updateData = req.body; 
    
    try {
        await projectsCollection.doc(id).update(updateData);
        res.status(200).json({ id, message: 'Project updated successfully.' });
    } catch (error) {
         if (error instanceof Error && error.message.includes('NOT_FOUND')) {
             res.status(404).send('Project not found.');
        } else {
             res.status(500).send('Failed to update project.');
        }
    }
};

// 4. DELETE /api/projects/:id - DELETE
export const deleteProject = (db: Firestore) => async (req: Request, res: Response): Promise<void> => {
    const projectsCollection = db.collection('projects');
    const { id } = req.params;
    
    try {
        await projectsCollection.doc(id).delete();
        res.status(204).send();
    } catch (error) {
        res.status(500).send('Failed to delete project.');
    }
};
