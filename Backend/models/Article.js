const { Model, DataTypes } = require('sequelize');

const { UserModel } = require('./User');

const ARTICLE_MODEL_NAME = 'article';

const ARTICLE_SCHEMA = {
  // user_id: { // colonne user_id de notre table articles
  //     type: DataTypes.STRING,
  //     required : true,
  // },
  titre: { // colonne titre de notre table articles
    type: DataTypes.STRING,
    require : true,
  },
  image_url: { // colone image_url de notre table articles
    type: DataTypes.STRING,
    required : true,
  },
  contenu: { // colonne contenu de notre table articles
    type: DataTypes.STRING,
    required : true,
  },
};

class ArticleModel extends Model {
  static configure(sequelize) {
    ArticleModel.init(ARTICLE_SCHEMA, {
      sequelize,
      modelName: ARTICLE_MODEL_NAME,
    });
  }

  static connectRelations() {
    ArticleModel.belongsTo(UserModel);
  }
}

module.exports = {
  ARTICLE_MODEL_NAME,
  ARTICLE_SCHEMA,
  ArticleModel,
};
