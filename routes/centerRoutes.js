import express from 'express';
import { addPlanController, categoryController ,centerDetailsController, centerDetailsEditController, planBuyController} from '../controllers/centerController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/:category', categoryController);
router.get('/:category/:id',centerDetailsController)
router.put('/:category/:id',centerDetailsEditController)
router.post('/:category/:id/plan',addPlanController)
router.post('/:category/:id/plan/:planId',requireSignIn,planBuyController)


export default router;