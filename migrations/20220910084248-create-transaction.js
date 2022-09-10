'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      AccountId: {
        type: Sequelize.INTEGER,
        references: {
          model: "customers",
          key: "AccountId"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      TransactionDate: {
        type: Sequelize.DATE
      },
      Description: {
        type: Sequelize.STRING
      },
      Credit: {
        type: Sequelize.INTEGER
      },
      Debit: {
        type: Sequelize.INTEGER
      },
      Amount: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('transactions');
  }
};