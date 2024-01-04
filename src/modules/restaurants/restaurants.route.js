import express from 'express';
import {
  createRestaurant,
  findAllRestaurants,
  findOneRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from './restaurants.controller.js';
import { validateExistRestaurant } from './restaurants.middleware.js';
import {
  hasPermission,
  protectRoutesWithToken,
} from '../users/users.middleware.js';
// import { protectOrderOwner, validateExistOrder } from './orders.middleware.js';

export const router = express.Router();

router.post(
  '/',
  protectRoutesWithToken,
  hasPermission('admin'),
  createRestaurant
);

router.get('/', findAllRestaurants);

router
  .route('/:id')
  .get(validateExistRestaurant, findOneRestaurant)
  .patch(
    protectRoutesWithToken,
    hasPermission('admin'),
    validateExistRestaurant,
    updateRestaurant
  )
  .delete(
    protectRoutesWithToken,
    hasPermission('admin'),
    validateExistRestaurant,
    deleteRestaurant
  );
