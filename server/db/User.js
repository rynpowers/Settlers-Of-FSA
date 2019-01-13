const Sequelize = require('sequelize');
const db = require('./database');
const bcrypt = require('bcrypt');

const User = db.define('users', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
  },
});

User.prototype.sanitize = function() {
  const { email, id } = this;
  return { email, id };
};

User.beforeCreate(user =>
  bcrypt.hash(user.password, 10).then(hash => {
    user.password = hash;
  })
);

User.validate = (email, password) =>
  User.findOne({ where: { email } }).then(user =>
    bcrypt.compare(password, user.password).then(() => user)
  );

module.exports = User;
