import express from 'express';
import dotenv from 'dotenv';
import logger from './src/shared/logger';
import mongoose from 'mongoose';
import userRoute from './src/routes';
const app = express();
dotenv.config();

try {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      logger.info('Connected to Database');
    })
    .catch((err) => {
      logger.error(`Error connecting to Database: ${err.message || err}`);
    });

  app.use(express.json());
  app.use('/api/user', userRoute);
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(process.env.PORT, () => {
    logger.info(`Express is listening at http://localhost:${process.env.PORT}`);
  });
} catch (err: any) {
  logger.error('Error: ', err.message || err);
}

export default app;
