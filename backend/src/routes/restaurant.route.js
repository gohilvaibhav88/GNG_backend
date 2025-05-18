import express from 'express';
import {
  addRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} from '../controllers/restaurant.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';
import { restrictTo } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/', protectRoute, restrictTo('owner'), addRestaurant);
router.get('/', protectRoute, getAllRestaurants);
router.get('/:id', protectRoute, getRestaurantById);
router.put('/:id', protectRoute, restrictTo('owner'), updateRestaurant);
router.delete('/:id', protectRoute, restrictTo('owner'), deleteRestaurant);

export default router;
