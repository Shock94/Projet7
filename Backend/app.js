const fs = require('fs');
const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const { Sequelize } = require('sequelize');
const uuid = require('uuid');

const ENV = require('./environment');
const { authMiddleware } = require('./middleware/auth');
const { ArticleModel } = require('./models/Article');
const { CommentaireModel } = require('./models/Commentaire');
const { UserModel } = require('./models/User');
const userRouter = require('./routes/user'); // import des routes pour les users

const sequelize = new Sequelize({
  dialect: ENV.SEQUELIZE_DIALECT,
  host: ENV.SEQUELIZE_HOST,
  port: ENV.SEQUELIZE_PORT,
  username: ENV.SEQUELIZE_USER,
  password: ENV.SEQUELIZE_PASS,
  database: ENV.SEQUELIZE_DATABASE,
});

const MODELS = [ArticleModel, CommentaireModel, UserModel];
MODELS.forEach(modelClass => modelClass.configure(sequelize));
MODELS.forEach(modelClass => modelClass.connectRelations());

const app = express();

app.use(helmet()); //sécrurise les headers

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/articles', bodyParser.json({ limit: '11mb' }), authMiddleware, async (req, res, next) => {
  const { userId } = req['x-token'];
  const { titre, image, contenu } = req.body;

  const [imageType, imageBase64] = image.split(';base64,');
  const imageExt = imageType.split('/')[1];

  const imageName = uuid.v4() + '.' + imageExt;
  const imagePath = path.join(__dirname, 'images', imageName);

  await fs.promises.writeFile(imagePath, imageBase64, { encoding: 'base64' });

  const article = await ArticleModel.create({ // on créer un nouvelle article dans la base de donnée
    titre,
    image_url: imageName,
    contenu,
    userId,
  });

  res.status(201).json({
    message: 'Article créé !',
    articleId: article.id,
  }); // 201 pour création de ressource
});

app.use('/images', express.static(path.join(__dirname, 'images'))); //middleware pour repondre au demande /images 

app.use(bodyParser.json());

// monte les routes POST /api/auth/login et POST /api/auth/signup
app.use('/api', userRouter); //enregistrer les routes attendu par le frontend(la racine de la route user)

app.get('/articles', authMiddleware, async (req, res, next) => {
  const articles = await ArticleModel.findAll();
  res.status(200).json(articles);
});

app.get('/articles/:article_id', authMiddleware, async (req, res, next) => {
  const articleId = req.params.article_id;
  const article = await ArticleModel.findByPk(articleId);
  
  res.status(article ? 200 : 404).json(article);
});

app.delete('/articles/:article_id', authMiddleware, async (req, res, next) => {
  const { userId } = req['x-token'];
  const articleId = req.params.article_id;
  const article = await ArticleModel.findByPk(articleId);

  if (!article) {
    res.sendStatus(404);
    return;
  }

  if (userId !== article.userId) {
    res.sendStatus(403);
    return;
  }

  try {
    await fs.promises.unlink(path.join(__dirname, 'images', article.image_url));
  } catch (err) {
    console.error(`Error while remove image ${article.image_url}:`, err);
  }

  await CommentaireModel.destroy({ where: { articleId } });

  await article.destroy();

  res.status(200).json(article);
});

app.get('/articles/:article_id/commentaires', authMiddleware, async (req, res, next) => {
  const articleId = req.params.article_id;
  //veux rechercher tous les commentaires de cette article en particulier avec les auteurs (jointure)
  const commentaires = await CommentaireModel.findAll({
    where: { articleId: articleId },
    include: {
      model: UserModel,
      attributes: ['id', 'email'],
    },
  });
  
  res.status(200).json(commentaires);
});

app.post('/articles/:article_id/commentaires', authMiddleware, async (req, res, next) => {
  const articleId = req.params.article_id;
  const { contenu }  = req.body;
  const { userId } = req['x-token'];

  const commentaire = await CommentaireModel.create({
    contenu, 
    articleId,
    userId,
  });

  res.status(201).json({ // 201 pour création de ressource
    message: 'Commentaire créé !',
    commentaireId: commentaire.id,
  }); 
});

app.delete('/articles/:article_id/commentaires/:commentaire_id', authMiddleware, async (req, res, next) => {
  const { userId } = req['x-token'];
  const { commentaire_id: commentaireId } = req.params;
  const commentaire = await CommentaireModel.findByPk(commentaireId);

  if (!commentaire) {
    res.sendStatus(404);
    return;
  }

  if (userId !== commentaire.userId) {
    res.sendStatus(403);
    return;
  }

  await commentaire.destroy();

  res.status(200).json(commentaire);
});

module.exports = { app, sequelize };
