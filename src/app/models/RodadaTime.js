const { Model, Sequelize } = require('sequelize');

class RodadaTime extends Model {
  static init(sequelize) {
    super.init(
      {
        pago: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Rodada, { foreignKey: 'id_rodada', as: 'rodada' });
    this.belongsTo(models.Time, { foreignKey: 'id_time', as: 'time' });
  }
}

module.exports = RodadaTime;
