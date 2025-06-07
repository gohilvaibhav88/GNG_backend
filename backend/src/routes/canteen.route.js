import express from 'express';
import {
  createCanteen,
  getAllCanteens,
  getMyCanteen,
  getCanteenById,
  updateCanteen,
  deleteCanteen
} from '../controllers/canteen.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';
import { restrictTo } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/', protectRoute, restrictTo('owner'), createCanteen);
router.get('/', getAllCanteens);
router.get('/my', protectRoute, restrictTo('owner'), getMyCanteen);
router.get('/:id', getCanteenById);
router.put('/:id', protectRoute, restrictTo('owner'), updateCanteen);
router.delete('/:id', protectRoute, restrictTo('owner'), deleteCanteen);

export default router;
