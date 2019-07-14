const { Model, Sequelize } = require('sequelize');

class Rodada extends Model {
  static init(sequelize) {
    super.init(
      {
        id_rodada_cartola: Sequelize.INTEGER,
        inicio: Sequelize.DATE,
        fim: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Liga, { foreignKey: 'id_liga', as: 'liga' });
  }
}

module.exports = Rodada;
