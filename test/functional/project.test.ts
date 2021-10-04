import { Projects } from '@src/controllers/projectController';

describe('Beach project functional tests', () => {
  it('should return a project with just a few times', async () => {
    const { body, status } = await global.testRequest.get('/projects');

    const response: Projects[] = [
      { id: '1', title: 'Novo projeto', tasks: [] },
      { id: '2', title: 'Novo projeto', tasks: [] },
    ];

    expect(body).toEqual(response);
    expect(status).toBe(201);
  });
});
