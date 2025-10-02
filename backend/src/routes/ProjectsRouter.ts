// src/routes/ProjectsRouter.ts
// import { Router } from 'express';
// import { getProjects, createProject, updateProject, deleteProject } from '../controllers/ProjectsController';
// import { Firestore } from 'firebase-admin/firestore';
// import { authenticateToken } from '../middleware/authMiddleware';

const createProjectsRouter = (db: any) => {
  // const router = Router();

  // // CRUD Endpoints for Projects CMS (Base URL: /api/projects)

  // // READ all projects (Public access)
  // router.get('/', getProjects(db)); 

  // // Private endpoints (Require JWT Auth middleware to be added later)
  // router.post('/', authenticateToken, createProject(db)); 
  // router.put('/:id', authenticateToken, updateProject(db)); 
  // router.delete('/:id', authenticateToken, deleteProject(db)); 

  // return router;
  return {}; // Return an empty object for now
};

export default createProjectsRouter;
