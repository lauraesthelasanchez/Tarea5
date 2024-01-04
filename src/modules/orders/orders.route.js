import express from 'express';
import {
  createOrder,
  updateOrder,
  deleteOrder,
  findAllOrdersFromUser,
} from './orders.controller.js';
import { protectOrderOwner, validateExistOrder } from './orders.middleware.js';
import { protectRoutesWithToken } from '../users/users.middleware.js';

export const router = express.Router();

router.use(protectRoutesWithToken);

router.post('/', createOrder);

router.get('/me', findAllOrdersFromUser);

router
  .route('/:id')
  .patch(validateExistOrder, protectOrderOwner, updateOrder)
  .delete(validateExistOrder, protectOrderOwner, deleteOrder);
