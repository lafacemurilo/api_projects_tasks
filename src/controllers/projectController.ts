import { Request, Response } from 'express';
import { ProjectsModel } from '../models/ProjectModels';

export interface Projects {
  id: string;
  title: string;
  tasks?: [];
}

export class ProjectController {
  //constructor() {}

  /**
   * endpoint: /projects
   * metodo: GET
   */
  public async getProjects(req: Request, res: Response): Promise<void> {
   try{
    const response = await ProjectsModel.find();
    res.status(201).send(response);
   } catch(err){
     console.log("Error mongoDB: ", err)
     res.status(500).send({Error : "Server Error"});
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
}
