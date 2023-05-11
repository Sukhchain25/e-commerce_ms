import express from 'express';
import dotenv from 'dotenv';
import logger from './src/shared/logger';
import emailRoute from './src/routes';
dotenv.config();
const app = express();
const port = process.env.PORT;

try {
  app.use(express.json());
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  app.use('/api/user', emailRoute);
  app.listen(port, () => {
    logger.info(`Listening on port: ${port}`);
  });
} catch (err: any) {
  logger.error(err);
}

export default app;
