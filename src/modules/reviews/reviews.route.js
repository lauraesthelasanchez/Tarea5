import express from 'express';
import {
  createReview,
  deleteReview,
  updateReview,
} from './reviews.controller.js';
import { validateExistRestaurant } from '../restaurants/restaurants.middleware.js';
import {
  protectReviewOwner,
  validateExistReview,
} from './reviews.middleware.js';
import { protectRoutesWithToken } from '../users/users.middleware.js';

export const router = express.Router();

router.use(protectRoutesWithToken);

router
  .post('/:id', createReview)
  .patch(
    '/:restaurantId/:id',
    protectReviewOwner,
    validateExistRestaurant,
    validateExistReview,
    updateReview
  )
  .delete(
    '/:restaurantId/:id',
    protectReviewOwner,
    validateExistRestaurant,
    validateExistReview,
    deleteReview
  );
