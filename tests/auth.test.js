const { setupDb, signUpUser } = require('./utils');
const request = require('supertest');
const app = require('../lib/app');

describe('/api/v1/auth', () => {
  beforeEach(setupDb);

  it('/signup', async () => {
    const { agent, user, credentials } = await signUpUser();
    expect(user).toEqual({
      id: expect.any(String),
      email: credentials.email,
    });

    const { statusCode } = await agent.get('/api/v1/auth/verify');
    expect(statusCode).toBe(200);
  });

  it('/signin', async () => {
    const { credentials } = await signUpUser();

    const agent = request.agent(app);
    const res = await agent.post('/api/v1/auth/signin').send(credentials);

    expect(res.body).toEqual({
      id: expect.any(String),
      email: credentials.email,
    });

    const { statusCode } = await agent.get('/api/v1/auth/verify');
    expect(statusCode).toBe(200);
  });

  it('/logout', async () => {
    const { agent } = await signUpUser();

    const { body } = await agent.delete('/api/v1/auth/logout');
    expect(body).toEqual({ success: true });

    const { statusCode } = await agent.get('/api/v1/auth/verify');
    expect(statusCode).toBe(401);
  });
});
