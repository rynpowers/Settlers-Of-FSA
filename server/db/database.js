const Sequelize = require('sequelize');
const pkg = require('../../package.json');

const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/database-test',
  {
    logging: false,
  }
);

console.log('=====================');
console.log(pkg.name);
console.log('=====================');

module.exports = db;
