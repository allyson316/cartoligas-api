const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');

const Time = require('../app/models/Time');
const Liga = require('../app/models/Liga');
const Rodada = require('../app/models/Rodada');
const RodadaTime = require('../app/models/RodadaTime');

const models = [Time, Liga, Rodada, RodadaTime];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

module.exports = new Database();
