import { Request, Response } from 'express';

export = class ProjectController {
  constructor() {}

  public async getProjects(req: Request, res: Response) {
    return res.send ([
      { id: '1', title: 'Novo projeto', tasks: [] },
      { id: '2', title: 'Novo projeto', tasks: [] },
    ]);
  }
};
