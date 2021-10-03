import app from '../bin/server';
import supertest from 'supertest';

beforeAll(() => {
  global.testRequest = supertest(app);
});
