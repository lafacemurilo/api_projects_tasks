import { Projects } from '@src/controllers/projectController';
import mongoose from 'mongoose';
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

  describe('Get a projects', () => {
    jest.setTimeout(10000);
    it('should return a project with just a few times', async () => {
      const { body, status } = await global.testRequest.get('/projects');
      expect(status).toBe(201);
    });
  });

  describe('Post a project', () => {
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
      //new project
      await global.testRequest.post('/projects').send(newProject);

      //new project the same ID
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
      expect(response.body).toEqual({
        ErrorSintaxe: 'mandatory fields not informed',
      });
    });
  });

  describe('Post a new task in a project existent', () => {
    it('should successfully create a new task', async () => {
      //setting a new project
      const newProject = { id: '1', title: 'Novo projeto' };
      await global.testRequest.post('/projects').send(newProject);

      //creating a new task
      const newTask = { title: 'Nova tarefa' };
      const { status, body } = await global.testRequest
        .post('/projects/1/tasks')
        .send(newTask);
      expect(status).toBe(201);
      expect(body).toEqual([
        {
          id: '1',
          title: 'Novo projeto',
          tasks: ['Nova tarefa'],
        },
      ]);
    });

    it('should return miss params in creating a new task and status 400', async () => {
      //creating a new task
      const newTask = { title: null };
      const { status, body } = await global.testRequest
        .post('/projects/1/tasks')
        .send(newTask);
      expect(status).toBe(400);
      expect(body).toEqual({ ErrorSintaxe: 'miss title' });
    });
  });

  describe('Put a title in project', () => {

    it('Should be a status 201', async () => {
      const newProject: Omit<Projects, 'tasks'> = {
        id: '1',
        title: 'Novo projeto',
      };

      await global.testRequest.post('/projects').send(newProject);

      const newTitle = { title: 'New title' };
      const { status, body } = await global.testRequest
        .put('/projects/1')
        .send(newTitle);

      expect(status).toBe(201);
      expect(body).toEqual([
        {
          id: '1',
          title: 'New title',
          tasks: [],
        },
      ]);
    });


    it('Should be a status 400', async () => {

      const newTitle = { title: null };
      const { status, body } = await global.testRequest
        .put('/projects/1')
        .send(newTitle);

      expect(status).toBe(400);
      expect(body).toEqual({ ErrorSintaxe: 'miss title' });
    });
  });
});
