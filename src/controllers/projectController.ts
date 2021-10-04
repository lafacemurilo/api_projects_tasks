import { Request, Response } from 'express';

export interface Projects {
  id: string;
  title: string;
  tasks: [];
}
export class ProjectController {
  constructor() {}

  public getProjects(req: Request, res: Response): void {

    const response: Projects[] = [
      { id: '1', title: 'Novo projeto', tasks: [] },
      { id: '2', title: 'Novo projeto', tasks: [] },
    ];

    res.status(201).send(response);
  }
}
