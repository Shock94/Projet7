const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize({ 
  dialect: 'mysql',
  // operatorsAliases: false,
  host: 'localhost',
  username: 'root',
  password: 'Shock94260!',
  database: 'article',
});

class HelloWorldModel extends Model {} // on declare un nouveau model qui etend la class Model sequilize
HelloWorldModel.init({ // init model sequelize prends en 1er parametre value et 2
  value: DataTypes.STRING, // colonne value est de type STRING 
}, { sequelize, modelName: 'hello_world' }); // connexion a la base / premier

class UserModel extends Model {} // on declare un nouveau model de la class Model sequilize
UserModel.init({ // init model sequelize 
  nom: DataTypes.STRING, // colonne de notre table article
  prenom: DataTypes.STRING, // colonne de notre table article
}, { sequelize, modelName: 'user' }); // nom du model qui va déterminer le nom de la table

class ArticleModel extends Model {} // on declare un nouveau model de la class Model sequilize
ArticleModel.init({ // init model sequelize 
  nom: DataTypes.STRING, // colonne de notre table article
  contenu: DataTypes.STRING, // colonne de notre table article
}, { sequelize, modelName: 'article' }); // nom du model qui va déterminer le nom de la table
ArticleModel.belongsTo(UserModel); // lié mes tables avec userID


async function main() {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync(); // syncronise les model par rapport a la base de données (creation des tables/colonne/indexes/etc... 
        console.log("sequelize has synchronized")
        const lignesHellos = await ArticleModel.findAll();
        for (const ligneHello of lignesHellos) {
            console.log('CP', ligneHello.toJSON());
        }
       // const [results, metadata] = await sequelize.query("SELECT * FROM article")
       // console.log(results);
      //  const patrick = await UserModel.create({ nom: 'ROY', prenom: 'Patrick'});
      //  console.log(patrick)
      const toto = await UserModel.create({ nom: 'Salam', prenom: 'TIF'});
      console.log(toto)
}




main().catch(err => {
  console.log('FATAL ERROR:', err);
  process.exit(1);
});