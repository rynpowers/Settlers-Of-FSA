const express = require('express');
const router = express.Router();
const { User } = require('../../db');

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.validate(email, password);
    req.login(user, err => (err ? next(err) : res.json(user.sanitize())));
  } catch (err) {
    res.status(401).send('incorrect email or password');
  }
});

router.post('/signup', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    req.login(user, err => (err ? next(err) : res.json(user.sanitize())));
  } catch (err) {
    res.status(401).send('email is invalid or already in use');
  }
});

router.delete('/logout', async (req, res, next) => {
  await req.logout();
  await req.session.destroy();
  res.sendStatus(204);
});

router.get('/me', (req, res, next) => {
  res.json(req.user);
});

module.exports = router;
