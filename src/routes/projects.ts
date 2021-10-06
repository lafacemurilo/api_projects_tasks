import express from 'express';
import { ProjectController } from '../controllers/projectController';
import {searchProject} from '../middlewares/id-project-validator';
const router = express.Router();

//objects
const project = new ProjectController();

//routes
router.get('/projects', project.getProjects);
router.post('/projects', project.setProjects);
router.post('/projects/:id/tasks', searchProject, project.setTask);
router.put('/projects/:id', searchProject, project.putProjects);
router.delete('/projects/:id',searchProject, project.deleteProjects);

export = router;   
