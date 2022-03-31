module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Commentaires', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PublicationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Publication',
          key: 'id'
        }
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'User',
          key: 'id'
        }
      },
      comment: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Commentaires');
  }
};