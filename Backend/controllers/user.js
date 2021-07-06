const bcrypt = require('bcrypt'); //import de bcrypt
const jwt = require('jsonwebtoken'); //import token d'authentificationcon

const { JWT_SECRET } = require('../environment');
const { UserModel } = require('../models/User'); //import du model user

async function login(req, res) {
  const { email, password } = req.body; // exemple de body : { email: "patrick@free.fr", "password": "mot de passe crypté" }

  const user = await UserModel.findOne({ where: { email } }); // chercher 1'utilisateur par email

  if (!user) { // si on ne trouve pas l'utilisateur dans la base alors...
    res.status(401).json({ error: 'Utilisateur non trouvé !' }); // on retourne une erreur + statut http 401
    return;
  }

  // comparer le password de la req avec le hash dans le document user
  const bodyPasswordAndUserPasswordMatched = await bcrypt.compare(password, user.password);

  if (!bodyPasswordAndUserPasswordMatched) { // si mot de passe différent alors...
    res.status(401).json({ error: 'Mot de passe incorrect !' }); // on retourne une erreur + statut http 401
    return;
  }

  const token = jwt.sign( // fonction sign de jsonwebtoken
    { userId: user.id, email: user.email }, // les données qu'on veut encoder a l'interieur du token; objet avec le user de l'utilisateur
    JWT_SECRET, // la cle secrete de l'encodage
    { expiresIn: '24h' }, // expiration de 24 du token
  );

  res.status(200).json({ // si on trouve le user et le comparaison bonne alors on renvoie un objet avec un id et token
    userId: user.id, // l'identifiant de l'utilisateur dans la base
    token,
  });
}

async function signup(req, res) {
  const { email, password } = req.body // exemple de body : { "email": "patrick@free.fr", "password": "mot de passe en clair" }

  const passwordCrypted = await bcrypt.hash(password, 10); // fonction pour crypté un password, donne le password dans le corp de la req et hash 10 fois

  try {
    const user = await UserModel.create({ // on créer un nouveau dans la base de donnée
        email,
        password: passwordCrypted,
    });
  
    res.status(201).json({
        message: 'Utilisateur créé !',
        userId: user.id,
    }); // 201 pour création de ressource
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ error: 'Adresse email déjà utilisée' });
    } else {
        res.status(500).json({ error: err });
    }
  }
}

module.exports = {
  login,
  signup,
};
