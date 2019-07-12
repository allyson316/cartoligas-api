const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');

const Time = require('../app/models/Time');

const models = [Time];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}

module.exports = new Database();
