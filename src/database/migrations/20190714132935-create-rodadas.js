module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('rodadas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_liga: {
        type: Sequelize.INTEGER,
        references: { model: 'ligas', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      id_rodada_cartola: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      inicio: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      fim: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('rodadas');
  },
};
