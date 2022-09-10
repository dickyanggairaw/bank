'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transaction.init({
    AccountId: DataTypes.INTEGER,
    TransactionDate: DataTypes.DATE,
    Description: DataTypes.STRING,
    Debit: DataTypes.INTEGER,
    Credit: DataTypes.INTEGER,
    Amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};