import express from 'express';
import { requireSignIn } from '../middlewares/authMiddleware.js';
import { registerController, loginController } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerController);

router.post('/login', loginController);

export default router;