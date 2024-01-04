import express from 'express';
import { router as usersRouter } from '../modules/users/users.route.js';
import { router as ordersRouter } from '../modules/orders/orders.route.js';
import { router as mealsRouter } from '../modules/meals/meals.route.js';
import { router as restaurantsRouter } from '../modules/restaurants/restaurants.route.js';
import { router as reviewsRouter } from '../modules/reviews/reviews.route.js';

// import { protectRoutesWithToken } from '../modules/users/users.middleware.js';

export const router = express.Router();

router.use('/users', usersRouter);
// router.use(protectRoutesWithToken);
router.use('/orders', ordersRouter);
router.use('/meals', mealsRouter);
router.use('/restaurants', restaurantsRouter);
router.use('/restaurants/reviews', reviewsRouter);
