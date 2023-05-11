import express from 'express';
import controller from '../controller';
const router = express.Router();

router.post('/sendEmail', controller.sendEmail);

export default router;
