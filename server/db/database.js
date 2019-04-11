const Sequelize = require('sequelize');
const chalk = require('chalk');
const DATABASE_URL =
  process.env.DATABASE_URL || 'postgres://localhost:5432/Settlers-Of-FSA-test';

const db = new Sequelize(DATABASE_URL, {
  logging: false,
  operatorsAliases: false,
});

if (process.env.NODE_ENV === 'test') {
  before(async () => {
    console.log(chalk.yellow('SETTING UP DATABASE FOR TESTING'));
    await db.sync({ force: true });
  });
  after(() => {
    console.log(chalk.yellow('SHUTTING DOWN DATABASE'));
    db.close();
  });
}

module.exports = db;
