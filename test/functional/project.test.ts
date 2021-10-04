import { Projects } from '@src/controllers/projectController';

describe('Beach project functional tests', () => {
  it('should return a project with just a few times', async () => {
    const { body, status } = await global.testRequest.get('/projects');
    expect(status).toBe(201);
  });
});

describe('When creating a new project', () => {
  it('should successfully create a new project ', async () => {
    const newProject: Omit<Projects, 'tasks'> = {
      id: '1',
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
});
