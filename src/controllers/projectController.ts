import { Request, Response } from 'express';

export interface Projects {
  id: string;
  title: string;
  tasks: [];
}

export class ProjectController {
  //constructor() {}

  /**
   * endpoint: /projects
   * metodo: GET
   */
  public getProjects(req: Request, res: Response): void {
    const response: Projects[] = [];

    res.status(201).send(response);
  }

  /**
   * endpoint /projects
   * metodo: POST
   */
  public setProjects(req: Request, res: Response): void {
    try {
      const project: Omit<Projects, 'tasks'> = req.body;
      //salvar na base

      const returnProject: Projects[] = [{id :"", tasks: [], title: ""}];

      res.status(201).send(returnProject);
    } catch (err) {
      res.status(400);
    }
  }
}
