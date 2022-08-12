const { setupDb, signUpUser } = require('./utils');
const request = require('supertest');
const app = require('../lib/app');

describe('/api/v1/auth', () => {
  beforeEach(setupDb);
  // before each test is ran, set up the database which is a util function created so we don't have to start our database using the command line everytime we want to run a test

  it('/signup', async () => {
    const { agent, user, credentials } = await signUpUser();
    // extracting agent, user, and credentials from what the signupUser function returns // signing the user up
    expect(user).toEqual({
      id: expect.any(String),
      email: credentials.email,
    });
    // expect the user to have an id of any string and an email which comes from the credentials object

    const { statusCode } = await agent.get('/api/v1/auth/verify');
    // from the verify path which verifies whether the user is authenticated, we grab the status code which SHOULD be 200 if the user is authenticated
    expect(statusCode).toBe(200);
  });

  it('/signin', async () => {
    const { credentials } = await signUpUser();
    // extracting the credentials from what the signUpUser function returns // effectively logging in
    const agent = request.agent(app);
    // holding onto that session/cookie from logging in
    const res = await agent.post('/api/v1/auth/signin').send(credentials);
    // sends the credentials of that user to the sign in route
    expect(res.body).toEqual({
      id: expect.any(String),
      email: credentials.email,
    });
    // expect the body of the response to be the credentials of that user

    const { statusCode } = await agent.get('/api/v1/auth/verify');
    expect(statusCode).toBe(200);
    // expecting a 200 status code if the user is verified
  });

  it('/logout', async () => {
    const { agent } = await signUpUser();
    // signing up the user and holding onto that session

    const { body } = await agent.delete('/api/v1/auth/logout');
    expect(body).toEqual({ success: true });
    // expect the agent body to be deleted with logout success = true

    const { statusCode } = await agent.get('/api/v1/auth/verify');
    expect(statusCode).toBe(401);
    // trying to get that same user again should result in a status code 401 meaning they are logged out and are not authenticated to be logged in
  });
});
