const request = require('supertest');
const app = require('./server');

describe('API endpoint tests', () => {
  it('GET /api/hello should return Hello, world!', async () => {
    const res = await request(app).get('/api/hello');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Hello, world!');
  });

  it('POST /api/echo should return posted data', async () => {
    const payload = { name: 'Alice' };
    const res = await request(app).post('/api/echo').send(payload);
    expect(res.statusCode).toEqual(201);
    expect(res.body.echo).toEqual(payload);
  });
});