// Liste des variables d'environnement obligatoires
const ENV_KEYS_REQUIRED = [
  'SEQUELIZE_DIALECT',
  'SEQUELIZE_HOST',
  'SEQUELIZE_PORT',
  'SEQUELIZE_USER',
  'SEQUELIZE_PASS',
  'SEQUELIZE_DATABASE',
  'JWT_SECRET',
];

// Liste des variables d'environnement manquantes
const ENV_KEYS_REQUIRED_MISSING = ENV_KEYS_REQUIRED.filter(key => typeof process.env[key] === 'undefined');

// Si la taille de la liste des variables d'environnement manquantes est différente de 0
if (ENV_KEYS_REQUIRED_MISSING.length) {
  // On log la liste des variables d'environnement manquantes
  console.error(`Variables d'environnement manquantes : ${ENV_KEYS_REQUIRED_MISSING.join(', ')}`);
  // On quitte le programme avec un code erreur (un code différent de 0 indique que le programme s'est terminé sur une erreur)
  process.exit(1);
}

const [
  SEQUELIZE_DIALECT,
  SEQUELIZE_HOST,
  SEQUELIZE_PORT,
  SEQUELIZE_USER,
  SEQUELIZE_PASS,
  SEQUELIZE_DATABASE,
  JWT_SECRET,
] = ENV_KEYS_REQUIRED.map(key => process.env[key]);

module.exports = {
  SEQUELIZE_DIALECT,
  SEQUELIZE_HOST,
  SEQUELIZE_PORT,
  SEQUELIZE_USER,
  SEQUELIZE_PASS,
  SEQUELIZE_DATABASE,
  JWT_SECRET,
};
