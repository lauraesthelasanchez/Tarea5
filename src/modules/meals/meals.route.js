import express from 'express';
import {
  createMeal,
  findOneMeal,
  updateMeal,
  deleteMeal,
  findAllMeals,
} from './meals.controller.js';
import {
  protectRoutesWithToken,
  hasPermission,
} from '../users/users.middleware.js';
import { validateExistRestaurant } from '../restaurants/restaurants.middleware.js';
import { validateExistMeal } from './meals.middleware.js';

export const router = express.Router();

router.post(
  '/:id',
  validateExistRestaurant,
  protectRoutesWithToken,
  hasPermission('admin'),
  createMeal
);

router.get('/', findAllMeals);

router
  .route('/:id')
  .get(validateExistMeal, findOneMeal)
  .patch(
    validateExistMeal,
    protectRoutesWithToken,
    hasPermission('admin'),
    updateMeal
  )
  .delete(
    validateExistMeal,
    protectRoutesWithToken,
    hasPermission('admin'),
    deleteMeal
  );
