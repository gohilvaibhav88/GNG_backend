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

// Public routes - fetching restaurants
router.get('/getAllRestaurants', getAllRestaurants);
router.get('/getRestaurant/:id', getRestaurantById);

// Protected routes - owners only
router.post('/createRestaurant', protectRoute, restrictTo('owner'), addRestaurant);
router.put('/updateRestaurant/:id', protectRoute, restrictTo('owner'), updateRestaurant);
router.delete('/deleteRestaurant/:id', protectRoute, restrictTo('owner'), deleteRestaurant);

export default router;
