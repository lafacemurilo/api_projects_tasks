import express from 'express';
import {ProjectController} from '../controllers/projectController';
const router = express.Router();

//objects
const project = new ProjectController();

//routes
router.get("/projects", project.getProjects);

export =  router;