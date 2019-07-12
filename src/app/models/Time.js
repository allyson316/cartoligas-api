const { Model, Sequelize } = require('sequelize');

class Time extends Model {
  static init(sequelize) {
    super.init(
      {
        id_time_cartola: Sequelize.INTEGER,
        nome: Sequelize.STRING,
        nome_cartola: Sequelize.STRING,
        slug: Sequelize.STRING,
        facebook_id: Sequelize.STRING,
        url_escudo_svg: Sequelize.STRING,
        assinante: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

module.exports = Time;
