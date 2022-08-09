// const request = require('supertest');
const { setupDb, signUpUser } = require('./utils.js');
// const app = require('../lib/app');

describe('/api/v1/gemstones', () => {
  beforeEach(setupDb);

  it('POST / creates a new gemstone with the current user', async () => {
    const { agent, user } = await signUpUser();
    console.log('user.body', user);

    const newGem = { description: 'Amethyst', qty: 7 };
    const { status, body } = await agent.post('/api/v1/gemstones').send(newGem);

    expect(status).toEqual(200);
    expect(body).toEqual({
      ...newGem,
      id: expect.any(String),
      user_id: user.id,
      is_beautiful: true,
    });
  });
});
