import { Projects } from '@src/controllers/projectController';
import mongoose, { mongo } from 'mongoose';
import * as database from '../../src/database';

describe('Project', () => {
  let mongoClient: typeof mongoose;

  beforeAll(async () => {
    mongoClient = await database.connect();
  });

  afterAll(async () => {
    await mongoClient.connection.close();
  });

  afterEach(async () => {
    await mongoClient.connection.db.dropDatabase();
  });

  describe('Project functional tests', () => {
    it('should return a project with just a few times', async () => {
      const { body, status } = await global.testRequest.get('/projects');
      expect(status).toBe(201);
    });
  });

  describe('When creating a new project', () => {
    it('should successfully create a new project ', async () => {
      const newProject: Omit<Projects, 'tasks'> = {
        id: '19',
        title: 'Novo projeto',
      };

      const response = await global.testRequest
        .post('/projects')
        .send(newProject);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        expect.arrayContaining([
          {
            id: expect.any(String),
            title: expect.any(String),
            tasks: expect.any(Array),
          },
        ])
      );
    });

    it('should error 400 because same ID repeated', async () => {
      const newProject: Omit<Projects, 'tasks'> = {
        id: '19',
        title: 'Novo projeto',
      };
      //gravar um projeto
      await global.testRequest
        .post('/projects')
        .send(newProject);

      //gravar com o mesmo id
      const response = await global.testRequest
        .post('/projects')
        .send(newProject);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ ErrorSintaxe: 'Id registered' });
    });

    it('should error 400 invalid data', async () => {
      const newProject = {
        idade: '19',
        titles: 'Novo projeto',
      };

      //gravar com o mesmo id
      const response = await global.testRequest
        .post('/projects')
        .send(newProject);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ ErrorSintaxe: 'mandatory fields not informed' });
    });
  });
});
