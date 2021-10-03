describe('Beach project functional tests', () => {
  it('should return a project with just a few times', async () => {
    const { body, status } = await global.testRequest.get('/projects');

    expect(body).toEqual([
      { id: '1', title: 'Novo projeto', tasks: [] },
      { id: '2', title: 'Novo projeto', tasks: [] },
    ]);
  });
});
