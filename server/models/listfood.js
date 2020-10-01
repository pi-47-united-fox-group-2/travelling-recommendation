'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListFood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ListFood.belongsTo(models.User,{
        targetKey:'id',
        foreignKey:'userId'
      })
    }
  };
  ListFood.init({
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    location: DataTypes.STRING,
    note:DataTypes.STRING,
    userId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ListFood',
  });
  return ListFood;
};