const { expect } = require('chai');
const app = require('../../');
const request = require('supertest');
const { db, User } = require('../../db');

const user = { email: 'ryn@email.com', password: 'password' };

before(async () => {
  await db.sync({ force: true });
});

describe('users', () => {
  it('should get all users', async () => {
    await request(app)
      .get('/api/users')
      .expect(200);
  });
});
