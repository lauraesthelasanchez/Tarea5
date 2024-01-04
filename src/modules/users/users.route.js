import express from 'express';
import {
  signup,
  login,
  updateUser,
  deleteUser,
  findAllOrders,
  findOneOrder,
} from './users.controller.js';
import {
  protectAccountOwner,
  protectRoutesWithToken,
  validateExistUser,
} from './users.middleware.js';

export const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.use(protectRoutesWithToken);

router.get('/orders', findAllOrders);
router.get('/orders/:id', findOneOrder);

router
  .route('/:id')
  .patch(validateExistUser, protectAccountOwner, updateUser)
  .delete(validateExistUser, protectAccountOwner, deleteUser);
