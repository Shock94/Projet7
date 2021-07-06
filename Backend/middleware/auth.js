const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../environment');

function authMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const { userId } = req.body;

  try { // pleins d'élément qui peuvent poser problèmes donc pour mieux les gérer try/catch
    const tokenEncoded = typeof authorization === 'string' // si le header authorization est bien une chaîne de caractères
      ? authorization.split(' ')[1] // retourne un tableau qu'on split et on recupère le 2eme élément qui est apres le bearer
      : null; // sinon token est null
    const token = jwt.verify(tokenEncoded, JWT_SECRET); // decoder le token

    if (userId && userId !== token.userId) { // si on a un userId dans la req ET si le userId est différent de celui du token alors...
      res.status(403).json({ message: 'Invalid user ID' });
      return;
    }

    req['x-token'] = token;

    next(); // ce middleware est appliqué avant les controllers de nos routes donc il faut faire un next
  } catch (error) {
    res.status(401) // erreur d'authentification 
      .json({ message: 'Invalid request!', error });
  }
}

module.exports = { authMiddleware };
