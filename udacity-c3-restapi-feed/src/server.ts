import express from 'express';
import bodyParser from 'body-parser';

import { sequelize } from './sequelize';
import { IndexRouter } from './controllers/v0/index.router';
import { V0MODELS } from './controllers/v0/model.index';
import { config } from './config/config';

(async () => {
  try {
    await sequelize.authenticate();
    sequelize.addModels(V0MODELS)
    sequelize.sync();
    console.info('Connected to Postgres.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const app = express();
  const PORT = process.env.PORT || 8080; // default port to listen

  app.use(bodyParser.json());

  //CORS Should be restricted
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', config.frontUrl);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });

  app.use('/api/v0/', IndexRouter)

  // Root URI call
  app.get('/', async (req, res) => {
    res.send('/api/v0/');
  });

  // Start the Server
  app.listen(PORT, () => {
    console.info(`server running on http://localhost:${PORT}`);
    console.info(`press CTRL+C to stop server`);
  });
})();
