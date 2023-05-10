import express from 'express';
import userController from '../controller/index';
import auth from '../middlewares/auth';
const router = express.Router();

router.post('/signUp', userController.signUp);
router.post('/signIn', userController.signIn);

export default router;
