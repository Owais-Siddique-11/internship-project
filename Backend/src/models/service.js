'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Service.init({
    title: {
      type:DataTypes.STRING,
      allowNull:false
    },
    description: {
      type:DataTypes.TEXT,
      allowNull:false
    },
    imageUrl: {
      type:DataTypes.STRING,
      allowNull:true
    }
  }, {
    sequelize,
    modelName: 'Service',
    tableName: 'Services',
    timestamps: true
  });
  return Service;
};