const { expect } = require('chai');
const app = require('../../');
const request = require('supertest').agent(app);
const { db } = require('../../db');

const user = { email: 'ryn@email.com', password: 'password' };

describe('auth routes', () => {
  it('should fail to login a user without an account', async () => {
    await request
      .post('/auth/login')
      .send(user)
      .expect(401);
  });
  it('should signup a user', async () => {
    await request
      .post('/auth/signup')
      .send(user)
      .expect(200)
      .then(res => expect(res.body.email).to.equal(user.email));
  });
  it('should logout a user', async () => {
    await request
      .del('/auth/logout')
      .send(user)
      .expect(204);
  });
  it('should not get a non logged in user', async () => {
    await request
      .get('/auth/me')
      .send(user)
      .expect(204);
  });
  it('should get a logged in user', async () => {
    await request
      .post('/auth/login')
      .send(user)
      .expect(200);
    await request
      .get('/auth/me')
      .expect(200)
      .then(res => {
        expect(res.body.email).to.equal(user.email);
      });
  });
});
