const { expect } = require('chai');
const { app } = require('../../');
const request = require('supertest').agent(app);
const { db } = require('../../db');

const user = { email: 'ryn@email.com', password: 'password' };

before(async () => {
  try {
    await db.sync({ force: true });
  } catch (err) {
    console.log(err);
  }
});

describe('auth routes', () => {
  it('should fail to login a user without an account', async () => {
    try {
      await request
        .post('/auth/login')
        .send(user)
        .expect(401);
    } catch (err) {
      console.log(err);
    }
  });

  it('should signup a user', async () => {
    try {
      await request
        .post('/auth/signup')
        .send(user)
        .expect(200)
        .then(res => expect(res.body.email).to.equal(user.email));
    } catch (err) {
      console.log(err);
    }
  });

  it('should logout a user', async () => {
    try {
      await request
        .del('/auth/logout')
        .send(user)
        .expect(204);
    } catch (err) {
      console.log(err);
    }
  });

  it('should not get a non logged in user', async () => {
    try {
      await request
        .get('/auth/me')
        .send(user)
        .expect(204);
    } catch (err) {
      console.log(err);
    }
  });

  it('should get a logged in user', async () => {
    try {
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
    } catch (err) {
      console.log(err);
    }
  });
});
