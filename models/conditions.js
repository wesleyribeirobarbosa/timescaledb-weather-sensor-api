'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class conditions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  conditions.init({
    time: DataTypes.DATE,
    device_id: DataTypes.STRING,
    temperature: DataTypes.DOUBLE,
    humidity: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'conditions',
  });
  return conditions;
};