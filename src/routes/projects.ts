import express from 'express';
import projects from '../controllers/projectController';
const router = express.Router();

//objects
const project = new projects();

//routes
router.get("/projects", project.getProjects);

export =  router;