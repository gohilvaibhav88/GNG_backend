import express from 'express';
import { addMenuItem, updateMenuItem } from '../controllers/menu.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';
import { restrictTo } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Add a menu item to a specific category in a canteen
router.post('/:canteenId', protectRoute, restrictTo('owner'), addMenuItem);

// Update a menu item in a specific category by index
router.put('/:canteenId/:category/:itemIndex', protectRoute, restrictTo('owner'), updateMenuItem);

export default router;