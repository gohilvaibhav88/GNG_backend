import express from 'express';
import {
  addTiffin,
  getAllTiffins,
  getTiffinById,
  updateTiffin,
  deleteTiffin,
} from '../controllers/tiffin.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';
import { restrictTo } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/', protectRoute, restrictTo('owner'), addTiffin);
router.get('/', protectRoute, getAllTiffins);
router.get('/:id', protectRoute, getTiffinById);
router.put('/:id', protectRoute, restrictTo('owner'), updateTiffin);
router.delete('/:id', protectRoute, restrictTo('owner'), deleteTiffin);

export default router;
