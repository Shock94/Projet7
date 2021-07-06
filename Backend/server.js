require('dotenv').config(); //import dotenv

const http = require('http');
const {app, sequelize} = require('./app');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
  return val;
  }
  if (port >= 0) {
  return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = (server, error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

async function main(){
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
  await sequelize.sync(); // syncronise les model par rapport a la base de données (creation des tables/colonne/indexes/etc... 
  console.log("sequelize has synchronized")


  const server = http.createServer(app);

  server.on('error', error => errorHandler(server, error));
  server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
  });

  server.listen(port);
}

main().catch(err => {
  console.log('FATAL ERROR:', err);
  process.exit(1);
});