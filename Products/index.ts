import express from 'express';
import dotenv from 'dotenv';
import productRoute from './src/routes';
import mongoose from 'mongoose';
import logger from './src/shared/logger';

dotenv.config();

const app = express();
const port = process.env.PORT;

try {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      logger.info('Connected to Database ...');
    })
    .catch((err: any) => {
      logger.error(err.message);
    });

  app.use(express.json());
  app.use('/api/products', productRoute);
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(port, () => {
    logger.info(`Listening at http://localhost:${port}`);
  });
} catch (err: any) {
  logger.error(err.message || err);
}
