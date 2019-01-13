require('./secrets');
const { User, db } = require('./db');

const users = ['rynpowers@email.com', 'hillary@email.com', 'daisy@email.com'];

db.sync({ force: true })
  .then(() =>
    Promise.all(
      users.map(user => User.create({ email: user, password: 'password' }))
    )
  )
  .then(() => db.close())
  .catch(() => db.close());
