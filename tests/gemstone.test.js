// const request = require('supertest');
const { setupDb, signUpUser } = require('./utils.js');
// const app = require('../lib/app');

describe('/api/v1/gemstones', () => {
  beforeEach(setupDb);

  it('POST / creates a new gemstone with the current user', async () => {
    const { agent, user } = await signUpUser();

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

  it('GET / should return all items associated with the authenticated user', async () => {
    const { agent } = await signUpUser();
    const { body: user1gem } = await agent.post('/api/v1/gemstones').send({
      description: 'citrine',
      qty: 7,
    });

    const { agent: agent2 } = await signUpUser({
      email: 'user2@gmail.com',
      password: 'password',
    });

    const { body: user2gem } = await agent2.post('/api/v1/gemstones').send({
      description: 'Ruby',
      qty: 8,
    });

    const resp1 = await agent.get('/api/v1/gemstones');
    expect(resp1.status).toEqual(200);
    expect(resp1.body).toEqual([user1gem]);

    const resp2 = await agent2.get('/api/v1/gemstones');
    expect(resp2.status).toEqual(200);
    expect(resp2.body).toEqual([user2gem]);
  });

  it('GET /:id should return a single item associated with the authenticated user', async () => {
    const { agent } = await signUpUser();
    const { body: gem } = await agent.post('/api/v1/gemstones').send({
      description: 'citrine',
      qty: 5,
    });

    const { status, body } = await agent.get(`/api/v1/gemstones/${gem.id}`);

    expect(status).toEqual(200);
    expect(body).toEqual(gem);
  });

  it('UPDATE /:id should update a gemstone', async () => {
    const { agent } = await signUpUser();

    const { body: gem } = await agent.post('/api/v1/gemstones').send({
      description: 'Labradorite',
      qty: 3,
    });

    const { status, body: updated } = await agent
      .put(`/api/v1/gemstones/${gem.id}`)
      .send({ is_beautiful: false });

    expect(status).toBe(200);
    expect(updated).toEqual({ ...gem, is_beautiful: false });
  });

  it('DELETE /:id should delete items for a valid user', async () => {
    const { agent } = await signUpUser();

    const { body: gem } = await agent.post('/api/v1/gemstones').send({
      description: 'Citrine',
      qty: 5,
    });

    const { status, body } = await agent.delete(`/api/v1/gemstones/${gem.id}`);
    expect(status).toBe(200);
    expect(body).toEqual(gem);

    const { body: gems } = await agent.get('/api/v1/gemstones');
    expect(gems.length).toBe(0);
  });
});
