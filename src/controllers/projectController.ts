import { Request, Response } from 'express';
import { ProjectsModel } from '../models/ProjectModels';

export interface Projects {
  id: string;
  title: string;
  tasks?: [];
}

export interface Tasks {
  title: string;
}

export class ProjectController {
  //constructor() {}

  /**
   * endpoint: /projects
   * metodo: GET
   */
  public async getProjects(req: Request, res: Response): Promise<void> {
    try {
      const response = await ProjectsModel.find();
      res.status(201).send(response);
    } catch (err) {
      console.log('Error mongoDB: ', err);
      res.status(500).send({ Error: 'Server Error' });
    }
  }

  /**
   * endpoint /projects
   * metodo: POST
   */
  public async setProjects(req: Request, res: Response): Promise<void> {
    try {
      let project: Projects = req.body;
      project.tasks = [];

      if (project.id && project.title) {
        const response = await ProjectsModel.findOne({ id: project.id });
        if (!response) {
          const returnProject: Projects[] = [
            await ProjectsModel.create(project),
          ];
          res.status(201).send(returnProject);
        } else {
          res.status(400).send({ ErrorSintaxe: 'Id registered' });
        }
      } else {
        res.status(400).send({ ErrorSintaxe: 'mandatory fields not informed' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ FatalError: 'Internal error' });
    }
  }

  /**
   * endpoint /projects/:id/tasks
   * metodo: POST
   */
  public async setTask(req: Request, res: Response): Promise<void> {
    try {
      const task: Tasks = req.body;
      const id = req.params.id;
      if (task.title) {
        const query = { id: id.toString() };
        const update = { $push: { tasks: [task.title.toString()] } };
        const options = { new: true, upsert: true };

        const response: Projects = await ProjectsModel.findOneAndUpdate(
          query,
          update,
          options
        );
        res.status(201).send([response]);
      } else {
        res.status(400).send({ ErrorSintaxe: 'miss title' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ Error: 'Server Error' });
    }
  }

  /**
   * endpoint /projects/:id
   * metodo: PUT
   */
  public async putProjects(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const newTitleProject = req.body.title;

      if (newTitleProject) {
        const query = { id: id.toString() };
        const update = { title: newTitleProject };
        const options = { new: true, upsert: true };

        const response = await ProjectsModel.findOneAndUpdate(
          query,
          update,
          options
        );
        res.status(201).send([response]);
      } else {
        res.status(400).send({ ErrorSintaxe: 'miss title' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ Error: 'Server Error' });
    }
  }

  /**
   * endpoint /projects/:id
   * metodo: DELETE
   */
  public async deleteProjects(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      const query = { id: id.toString() };

      const response = await ProjectsModel.deleteOne(query);
      res.status(201).send([response]);
    } catch (err) {
      console.log(err);
      res.status(500).send({ Error: 'Server Error' });
    }
  }
}
