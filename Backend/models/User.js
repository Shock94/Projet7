const { Model, DataTypes } = require('sequelize');

const USER_MODEL_NAME = 'user';

const USER_MODEL_SCHEMA = {
  email: { // colonne email de notre table users
    type: DataTypes.STRING,
    require: true,
    unique: true,
    validate: { isEmail: true },
  },
  password: { // colonne password de notre table users
    type: DataTypes.STRING,
    require: true,
  },
};

class UserModel extends Model { // on declare un nouveau modèle (par héritage de la classe Model de sequilize)
  static configure(sequelize) {
    UserModel.init(USER_MODEL_SCHEMA, { // initialise le modèle sequelize avec le schéma
      sequelize,
      modelName: USER_MODEL_NAME, // nom du model qui détermine le nom de la table
    });
  }

  static connectRelations() {

  }
}

module.exports = {
  USER_MODEL_NAME,
  USER_MODEL_SCHEMA,
  UserModel,
};
