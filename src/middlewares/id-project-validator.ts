import { ProjectsModel } from '../models/ProjectModels';
import { NextFunction, Request, Response } from 'express';

export async function searchProject(
  req: Partial<Request>,
  res: Partial<Response>,
  next: NextFunction
): Promise<void> {


  if (req.params?.id) {
    const response = await ProjectsModel.findOne({ id: req.params?.id });
    if (response) {
      next();
    } else {
      res.status?.(400).send({ Error: 'projects was not found' });
    }
  } else {
    res.status?.(400).send({ Error: 'params id is requered' });
  }
}
