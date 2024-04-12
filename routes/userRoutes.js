import express from 'express';
import { requireSignIn } from '../middlewares/authMiddleware.js';
import { userDetailsController } from '../controllers/userController.js';
const router = express.Router();

router.get('/details', requireSignIn, userDetailsController);


export default router;