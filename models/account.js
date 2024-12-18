'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Account.init({
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    provider: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    provider_account_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    refresh_token: DataTypes.STRING(255),
    access_token: DataTypes.STRING(255),
    expires_at: DataTypes.INTEGER(11),
    token_type: DataTypes.STRING(255),
    scope: DataTypes.STRING(255),
    id_token: DataTypes.TEXT,
    session_state: DataTypes.STRING(255),
    user_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Account',
    tableName: 'accounts'
  });

  //Account.sync({ alter: true })

  return Account;
};