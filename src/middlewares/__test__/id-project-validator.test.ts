/*import mongoose from 'mongoose';
import * as database from '../../database';
import { searchProject } from '../id-project-validator';
import { Request, Response, NextFunction } from 'express';


  jest.setTimeout(10000) 
  it('Should be a error status code 400', async () => {
    
    const reqFake: any = { params: { id: '1' } };
    const sendMock = jest.fn();
    const resFake: any = {
      status: jest.fn()
    };

    const nextFake = jest.fn();

    const result = await searchProject(reqFake, resFake, nextFake);
    console.log(result);
    expect(resFake.status).toEqual(400);
  });
});

*/