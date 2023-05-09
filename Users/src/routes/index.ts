import express from 'express';
import userController from '../controller/index';
const router = express.Router();

router.post('/signUp', userController.signUp);

export default router;
