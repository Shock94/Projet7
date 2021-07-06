const { Model, DataTypes } = require('sequelize');

const { ArticleModel } = require('./Article');
const { UserModel } = require('./User');

const COMMENTAIRE_MODEL_NAME = 'commentaire';

const COMMENTAIRE_MODEL_SCHEMA = {
  contenu: {  // colonne contenu de notre table commentaires
    type: DataTypes.STRING,
    require: true,
  },
};

class CommentaireModel extends Model {
  static configure(sequelize) {
    CommentaireModel.init(COMMENTAIRE_MODEL_SCHEMA, {
      sequelize,
      modelName: COMMENTAIRE_MODEL_NAME,
    });
  }

  static connectRelations() {
    CommentaireModel.belongsTo(ArticleModel);
    CommentaireModel.belongsTo(UserModel);
  }
}

module.exports = {
  COMMENTAIRE_MODEL_NAME,
  COMMENTAIRE_MODEL_SCHEMA,
  CommentaireModel,
};
