'use strict';
const {
  Model
} = require('sequelize');
import { sequelize } from './'
import { DataTypes } from 'sequelize'

const AccessLevel = require('./accesslevel')(sequelize, DataTypes)
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    accessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: AccessLevel,
        key: 'permissionLevel'
      }
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    email_verified: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });

  User.belongsTo(AccessLevel, { foreignKey: 'accessId' });
  //User.sync({ alter: true })
  return User;
};