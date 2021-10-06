import express from 'express';
import { ProjectController } from '../controllers/projectController';
const router = express.Router();

//objects
const project = new ProjectController();

//routes
router.get('/projects', project.getProjects);
router.post('/projects', project.setProjects);
router.post('/projects/:id/tasks', project.setTask);
router.put('/projects/:id', project.putProjects);
router.delete('/projects/:id', project.deleteProjects);

export = router;
